import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mapReducer from './slices/map';
import tableReducer from './slices/table';
import {iipcAPI} from '../services/IIPCService';

const rootReducer = combineReducers({
	map: mapReducer,
	table: tableReducer,
	[iipcAPI.reducerPath]: iipcAPI.reducer
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(iipcAPI.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch