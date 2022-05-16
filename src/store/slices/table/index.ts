import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RowsPerPage, TableState} from './types';
import {RootState} from '../../index';
import {setIndexValues} from '../merge';
import {SortSetup} from '../../../types/SortSetup';
import {IndexValue} from '../../../types/IndexValue';

const initialState: TableState = {
	selectedYear: 0,
	indexValues: [],
	currentPage: 1,
	rowsPerPage: RowsPerPage.FEW,
	sortSetup: { property: 'index', sortAtoZ: false }
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setYear(state, action: PayloadAction<number>) {
			state.selectedYear = action.payload;
		},
		setRowsPerPage(state, action: PayloadAction<RowsPerPage>) {
			state.rowsPerPage = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSortSetup(state, action: PayloadAction<SortSetup<IndexValue>>) {
			state.sortSetup = action.payload;
			switch (action.payload.property) {
			case 'country':
				state.indexValues = state.indexValues.sort((a, b) => {
					if (a.country < b.country) return action.payload.sortAtoZ ? -1 : 1;
					if (a.country > b.country) return action.payload.sortAtoZ ? 1 : -1;
					return 0;
				});
				break;
			case 'index':
				state.indexValues = state.indexValues.sort((a, b) => action.payload.sortAtoZ ? a.index - b.index : b.index - a.index);
				break;
			case 'dynamic':
				state.indexValues = state.indexValues.sort((a, b) => {
					if (a.dynamic === null) {
						if (b.dynamic == null) return 0;
						else return 1;
					}
					if (b.dynamic === null) return -1;
					return action.payload.sortAtoZ ? a.dynamic - b.dynamic : b.dynamic - a.dynamic;
				});
				break;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIndexValues.fulfilled, ((state, action) => {
				state.indexValues = action.payload;
				state.sortSetup = { property: 'index', sortAtoZ: false };
				state.currentPage = 1;
			}));
	}
});

export const fetchIndexValues = createAsyncThunk<IndexValue[], number, {state: RootState}>(
	'table/fetchIndexValues',
	async function (year,{getState, dispatch}) {
		dispatch(setYear(year));
		let indexValues = getState().merge.indexValuesThrowYears[year];
		if (indexValues) return indexValues;
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getComplexityIndexes?year=${year}`);
		if (!response.ok) return [];
		indexValues = await response.json() as IndexValue[];
		dispatch(setIndexValues({year, indexValues}));
		return indexValues;
	}
);

export const {setYear, setRowsPerPage, setCurrentPage, setSortSetup} = tableSlice.actions;
export default tableSlice.reducer;