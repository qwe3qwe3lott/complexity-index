import {delay} from '../../../util/delay';
import {setYears} from './index';
import {AppDispatch, RootState} from '../../index';

export async function fetchYearsPayloadCreator(_: undefined, {getState, dispatch }: {getState: () => RootState, dispatch: AppDispatch }): Promise<number[]> {
	if (getState().merge.years.length !== 0) return getState().merge.years;
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		await delay(300);
		const years = [2022, 2021, 2020];
		dispatch(setYears(years));
		return years;
	}
	const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getYears`);
	if (!response.ok) return [];
	const years = await response.json() as number[];
	dispatch(setYears(years));
	return years;
}