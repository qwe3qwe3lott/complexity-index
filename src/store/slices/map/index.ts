import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MapState} from './types';
import {RootState} from '../../index';
import {setIndexValues, setYears} from '../merge';
import {IndexValue} from '../../../types/IndexValue';

const initialState: MapState = {
	years: [],
	selectedYear: 0,
	regions: [
		{label: 'World'},
		{label: 'Africa', code: '002'},
		{label: 'Europe', code: '150'},
		{label: 'Americas', code: '019'},
		{label: 'Asia', code: '142'},
		{label: 'Oceania', code: '009'},
		{label: 'Northern Africa', code: '015'},
		{label: 'Western Africa', code: '011'},
		{label: 'Middle Africa', code: '017'},
		{label: 'Eastern Africa', code: '014'},
		{label: 'Southern Africa', code: '018'},
		{label: 'Northern Europe', code: '154'},
		{label: 'Western Europe', code: '155'},
		{label: 'Eastern Europe', code: '151'},
		{label: 'Southern Europe', code: '039'},
		{label: 'Northern America', code: '021'},
		{label: 'Caribbean', code: '029'},
		{label: 'Central America', code: '013'},
		{label: 'South America', code: '015'},
		{label: 'Central Asia', code: '143'},
		{label: 'Eastern Asia', code: '030'},
		{label: 'Southern Asia', code: '034'},
		{label: 'South-Eastern Asia', code: '035'},
		{label: 'Western Asia', code: '145'},
		{label: 'Australia and New Zealand', code: '053'},
		{label: 'Melanesia', code: '054'},
		{label: 'Micronesia', code: '057'},
		{label: 'Polynesia', code: '061'}
	],
	selectedRegion: {label: 'World'},
	indexValues: []
};

const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setYear(state, action: PayloadAction<number>) {
			state.selectedYear = action.payload;
		},
		setRegion(state, action: PayloadAction<string>) {
			const region = state.regions.find(region => region.label === action.payload);
			if (!region) return;
			state.selectedRegion = region;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchYears.fulfilled, (state, action) => {
				state.years = action.payload;
			})
			.addCase(fetchIndexValues.fulfilled, ((state, action) => {
				state.indexValues = action.payload;
			}));
	}
});

export const fetchYears = createAsyncThunk<number[], undefined, {state: RootState}>(
	'map/fetchYears',
	async function (_, {getState, dispatch}) {
		if (getState().merge.years.length !== 0) return getState().merge.years;
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getYears`);
		if (!response.ok) return [];
		const years = await response.json() as number[];
		dispatch(setYears(years));
		return years;
	},
	{
		condition: (_, {getState}): boolean => getState().map.years.length === 0
	}
);

export const fetchIndexValues = createAsyncThunk<IndexValue[], number, {state: RootState}>(
	'map/fetchIndexValues',
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

export const {setYear, setRegion} = mapSlice.actions;
export default mapSlice.reducer;