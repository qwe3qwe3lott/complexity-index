import React, {useMemo} from 'react';

import styles from './MapChart.module.scss';
import {Chart} from 'react-google-charts';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {iipdAPI} from '../../services/IIPDService';

const MapChart: React.FC = () => {
	const selectedYear = useAppSelector(state => state.map.selectedYear);
	const selectedRegion = useAppSelector(state => state.map.selectedRegion);
	const { data: indexValues } = iipdAPI.useFetchIndexValuesQuery(selectedYear, { skip: !selectedYear });

	const data = useMemo(() => {
		const data: (string | number)[][] = [['County', 'Index'], ['Min', -10], ['Max', 10]];
		for (const indexValue of indexValues ?? []) {
			data.push([indexValue.country, indexValue.index]);
		}
		return data;
	}, [indexValues]);

	const options = {
		region: selectedRegion.code,
		colorAxis: {colors: ['#000e8b', '#FFFFFF', '#00853F']},
		backgroundColor: '#6B6A6A',
		datalessRegionColor: '#F5DBE2',
		defaultColor: '#F5DBE2'
	};
	
	return(<div className={styles.container}>
		<Chart
			options={options}
			chartType="GeoChart"
			width="100%"
			data={data}
		/>
	</div>);
};

export default MapChart;
