import React, {useEffect} from 'react';

import styles from './MapFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {fetchYears, setRegion, setYear} from '../../store/slices/map';

const MapFilter: React.FC = () => {
	const years = useAppSelector(state => state.map.years);
	const selectedYear = useAppSelector(state => state.map.selectedYear);
	const regions = useAppSelector(state => state.map.regions);
	const selectedRegion = useAppSelector(state => state.map.selectedRegion);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchYears());
	}, []);

	return(<div className={styles.container}>
		<h2 className={styles.title}>Index on the map</h2>
		<div className={styles.filters}>
			<select className={styles.select} value={selectedRegion.label} onChange={(event) => dispatch(setRegion(event.target.value))}>
				{regions.map(region => <option key={region.label}>
					{region.label}
				</option>)}
			</select>
			<select className={styles.select} value={selectedYear} onChange={(event) => dispatch(setYear(+event.target.value))}>
				<option value="0" disabled hidden>Choose year</option>
				{years.map(year => <option key={year}>
					{year}
				</option>)}
			</select>
		</div>
	</div>);
};

export default MapFilter;
