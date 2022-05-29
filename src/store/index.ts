import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mapReducer from './slices/map';
import tableReducer from './slices/table';
import {iipdAPI} from '../services/IIPDService';

const rootReducer = combineReducers({
	map: mapReducer,
	table: tableReducer,
	[iipdAPI.reducerPath]: iipdAPI.reducer
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(iipdAPI.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch