import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {IndexValue} from '../types/IndexValue';

export const iipcAPI = createApi({
	reducerPath: 'iipcAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BACKEND_BASE_URL
	}),
	endpoints: (build) => ({
		fetchYears: build.query<number[], undefined>({
			query: () => ({
				url: 'getIIPCYears'
			})
		}),
		fetchIndexValues: build.query<IndexValue[], number>({
			query: (year) => ({
				url: 'getIIPCIndexes',
				params: { year }
			})
		})
	})
});