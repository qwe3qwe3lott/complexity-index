import React from 'react';

import styles from './TableFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {iipdAPI} from '../../services/IIPDService';
import {setYear} from '../../store/slices/table';

const TableFilter: React.FC = () => {
	const {data: years, isLoading: isYearsLoading} = iipdAPI.useFetchYearsQuery(undefined);
	const selectedYear = useAppSelector(state => state.table.selectedYear);
	const { isFetching: isLoading } = iipdAPI.useFetchIndexValuesQuery(selectedYear, { skip: !selectedYear });
	const dispatch = useAppDispatch();

	return(<div className={styles.container}>
		<h2 className={styles.title}>Index in the table</h2>
		<select
			className={styles.select}
			value={selectedYear}
			onChange={(event) => dispatch(setYear(+event.target.value))}
			disabled={isYearsLoading || isLoading}
		>
			<option value="0" disabled hidden>Choose year</option>
			{years && years.map(year => <option key={year}>
				{year}
			</option>)}
		</select>
	</div>);
};

export default TableFilter;
