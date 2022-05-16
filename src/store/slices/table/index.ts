import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RowsPerPage, TableState} from './types';
import {delay} from '../../../util/delay';
import {RootState} from '../../index';
import {setYears} from '../merge';

const initialState: TableState = {
	years: [],
	selectedYear: 0,
	indexValues: [
		{id:1, index:1, country: 'a', dynamic: 1},
		{id:2, index:2, country: 'b', dynamic: 0},
		{id:3, index:3, country: 'c', dynamic: -1},
		{id:4, index:3, country: 'c', dynamic: -1},
		{id:5, index:3, country: 'c', dynamic: -1},
		{id:6, index:3, country: 'c', dynamic: -1},
		{id:7, index:3, country: 'c', dynamic: -1},
		{id:8, index:3, country: 'c', dynamic: -1},
		{id:9, index:3, country: 'c', dynamic: -1},
		{id:10, index:3, country: 'c', dynamic: -1},
		{id:11, index:3, country: 'c', dynamic: -1},
		{id:12, index:3, country: 'c', dynamic: -1},
		{id:13, index:3, country: 'c', dynamic: -1},
		{id:14, index:3, country: 'c', dynamic: -1},
		{id:15, index:3, country: 'c', dynamic: -1}
	],
	currentPage: 1,
	rowsPerPage: RowsPerPage.few,
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
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchYears.fulfilled, (state, action) => {
				state.years = action.payload;
			});
	}
});

export const fetchYears = createAsyncThunk<number[], undefined, {state: RootState, }>(
	'table/fetchYears',
	async function (_, {getState, dispatch}) {
		if (getState().merge.years.length !== 0) return getState().merge.years;
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			await delay(300);
			const years = [2022, 2021, 2020];
			dispatch(setYears(years));
			return years;
		}
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getYears`);
		if (!response.ok) return [];
		const years = await response.json() as number[];
		dispatch(setYears(years));
		return years;
	},
	{
		condition: (_, {getState}): boolean => getState().table.years.length === 0
	}
);

export const {setYear, setRowsPerPage, setCurrentPage} = tableSlice.actions;
export default tableSlice.reducer;