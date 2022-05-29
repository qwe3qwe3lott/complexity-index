import React from 'react';

import styles from './MapFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {setRegion, setYear} from '../../store/slices/map';
import {iipdAPI} from '../../services/IIPDService';

const MapFilter: React.FC = () => {
	const {data: years, isLoading: isYearsLoading} = iipdAPI.useFetchYearsQuery(undefined);
	const selectedYear = useAppSelector(state => state.map.selectedYear);
	const { isFetching: isLoading } = iipdAPI.useFetchIndexValuesQuery(selectedYear, { skip: !selectedYear });
	const regions = useAppSelector(state => state.map.regions);
	const selectedRegion = useAppSelector(state => state.map.selectedRegion);
	const dispatch = useAppDispatch();

	return(<div className={styles.container}>
		<h2 className={styles.title}>{!isLoading ? 'Index on the map' : 'Data loading...'}</h2>
		<div className={styles.filters}>
			<select className={styles.select} value={selectedRegion.label} onChange={(event) => dispatch(setRegion(event.target.value))}>
				{regions.map(region => <option key={region.label}>
					{region.label}
				</option>)}
			</select>
			<select
				className={styles.select}
				value={selectedYear}
				onChange={(event) => dispatch(setYear(+event.target.value))}
				disabled={isLoading || isYearsLoading}
			>
				<option value="0" disabled hidden>Choose year</option>
				{years && years.map(year => <option key={year}>
					{year}
				</option>)}
			</select>
		</div>
	</div>);
};

export default MapFilter;
