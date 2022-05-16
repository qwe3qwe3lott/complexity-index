import React, {useEffect} from 'react';

import styles from './TableFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {fetchIndexValues, fetchYears} from '../../store/slices/table';

const TableFilter: React.FC = () => {
	const years = useAppSelector(state => state.table.years);
	const selectedYear = useAppSelector(state => state.table.selectedYear);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchYears());
	}, []);

	return(<div className={styles.container}>
		<h2 className={styles.title}>Index in the table</h2>
		<select className={styles.select} value={selectedYear} onChange={(event) => dispatch(fetchIndexValues(+event.target.value))}>
			<option value="0" disabled hidden>Choose year</option>
			{years.map(year => <option key={year}>
				{year}
			</option>)}
		</select>
	</div>);
};

export default TableFilter;
