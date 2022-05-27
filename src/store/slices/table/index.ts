import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TableState} from './types';
import {SortSetup} from '../../../types/SortSetup';
import {IndexValue} from '../../../types/IndexValue';
import {RowsPerPage} from '../../../enums/RowsPerPage';

const initialState: TableState = {
	selectedYear: 0,
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
		}
	}
});

export const {setYear, setRowsPerPage, setCurrentPage, setSortSetup} = tableSlice.actions;
export default tableSlice.reducer;