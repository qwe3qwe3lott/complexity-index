import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MapState} from './types';

const initialState: MapState = {
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
		{label: 'South America', code: '005'},
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
	selectedRegion: {label: 'World'}
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
	}
});


export const {setYear, setRegion} = mapSlice.actions;
export default mapSlice.reducer;