import {configureStore} from '@reduxjs/toolkit';
import testReducer from './slices/test';
import mapReducer from './slices/map';
import tableReducer from './slices/table';

const store = configureStore({
	reducer: {
		test: testReducer,
		map: mapReducer,
		table: tableReducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch