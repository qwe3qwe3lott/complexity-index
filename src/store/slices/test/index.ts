import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

type TestState = {
	test: number
	loading: boolean
	error: string | null
};

const initialState: TestState = {
	test: 0,
	loading: false,
	error: null
};

export const fetchTest = createAsyncThunk<number, undefined, {rejectValue: string}>(
	'test/fetchTest',
	async function (_, { rejectWithValue }) {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

		if (!response.ok) {
			return rejectWithValue('error');
		}

		const data = await response.json();

		return data.length;
	}
);

const testSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		inc(state, action: PayloadAction<number>) {
			state.test += action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTest.fulfilled, (state, action) => {
				state.loading = false;
				state.test += action.payload;
			});

		builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		});
	}
});

const isError = (action: AnyAction) => action.type.endsWith('rejected');

export const {inc} = testSlice.actions;
export default testSlice.reducer;