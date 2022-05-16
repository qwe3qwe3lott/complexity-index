import {MergeState} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: MergeState = {
	years: []
};

const mergeSlice = createSlice({
	name: 'merge',
	initialState,
	reducers: {
		setYears(state, action: PayloadAction<number[]>) {
			state.years = action.payload;
		}
	}
});

export const {setYears} = mergeSlice.actions;
export default mergeSlice.reducer;