import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {IndexValue} from '../types/IndexValue';

export const iipdAPI = createApi({
	reducerPath: 'iipdAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BACKEND_BASE_URL
	}),
	endpoints: (build) => ({
		fetchYears: build.query<number[], undefined>({
			query: () => ({
				url: 'getIIPDYears'
			})
		}),
		fetchIndexValues: build.query<IndexValue[], number>({
			query: (year) => ({
				url: 'getIIPDIndexes',
				params: { year }
			})
		})
	})
});