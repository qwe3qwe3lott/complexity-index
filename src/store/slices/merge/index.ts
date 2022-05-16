import {MergeState} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IndexValue} from '../../../types/IndexValue';

const initialState: MergeState = {
	years: [],
	indexValuesThrowYears: {}
};

const mergeSlice = createSlice({
	name: 'merge',
	initialState,
	reducers: {
		setYears(state, action: PayloadAction<number[]>) {
			state.years = action.payload;
		},
		setIndexValues(state, action: PayloadAction<{year: number, indexValues: IndexValue[]}>) {
			state.indexValuesThrowYears[action.payload.year] = action.payload.indexValues;
		}
	}
});

export const {setYears, setIndexValues} = mergeSlice.actions;
export default mergeSlice.reducer;