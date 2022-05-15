import React from 'react';

import styles from './MapChart.module.scss';
import {Chart} from 'react-google-charts';
import {useAppSelector} from '../../hooks/typedReduxHooks';

const MapChart: React.FC = () => {
	const selectedRegion = useAppSelector(state => state.map.selectedRegion);
	const data = [
		['Country', 'Popularity'],
		['Germany', 200],
		['United States', 300],
		['Brazil', 400],
		['Canada', 500],
		['France', 600],
		['RU', 700]
	];

	const options = {
		region: selectedRegion.code,
		colorAxis: {colors: ['#FFFFFF', '#00853F']},
		backgroundColor: '#6B6A6A',
		datalessRegionColor: '#F5DBE2',
		defaultColor: '#F5DBE2'
	};
	
	return(<div className={styles.container}>
		<Chart
			chartEvents={[
				{
					eventName: 'select',
					callback: ({ chartWrapper }) => {
						const chart = chartWrapper.getChart();
						const selection = chart.getSelection();
						if (selection.length === 0) return;
						const region = data[selection[0].row + 1];
						console.log('Selected : ' + region);
					}
				}
			]}
			options={options}
			chartType="GeoChart"
			width="100%"
			data={data}
		/>
	</div>);
};

export default MapChart;
