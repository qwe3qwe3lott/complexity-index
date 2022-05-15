import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MapState} from './types';
import {delay} from '../../../util/delay';
import {RootState} from '../../index';

const initialState: MapState = {
	years: [],
	selectedYear: 0,
	regions: [
		{label: 'World'},
		{label: 'Africa', code: '002'},
		{label: 'Europe', code: '150'},
		{label: 'Americas', code: '019'},
		{label: 'Asia', code: '142'},
		{label: 'Oceania', code: '009'}
	],
	selectedRegion: {label: 'World'},
	indexValues: []
};

const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		selectYear(state, action: PayloadAction<number>) {
			state.selectedYear = action.payload;
		},
		selectRegion(state, action: PayloadAction<string>) {
			const region = state.regions.find(region => region.label === action.payload);
			if (!region) return;
			state.selectedRegion = region;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchYears.fulfilled, (state, action) => {
				state.years = action.payload;
			});
	}
});

export const fetchYears = createAsyncThunk<number[], undefined, {state: RootState}>(
	'map/fetchYears',
	async function () {
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			await delay(300);
			return [2022, 2021, 2020];
		}
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getYears`);
		if (!response.ok) return [];
		return await response.json() as number[];
	},
	{
		condition: (_, {getState}): boolean => getState().map.years.length === 0
	}
);

export const {selectYear, selectRegion} = mapSlice.actions;
export default mapSlice.reducer;