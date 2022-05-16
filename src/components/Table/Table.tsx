import React from 'react';

import styles from './Table.module.scss';
import TableHeader from '../TableHeader';
import TableContent from '../TableContent';
import TableFooter from '../TableFooter';
import {ColumnModes, ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';

const Table: React.FC = () => {
	const columnSetups: ColumnSetup[] = [
		{ title: 'country', property: 'country'},
		{ title: 'index', property: 'index', width: {value: 6, metric: ColumnWidthMetrics.em} },
		{ title: 'dynamic', property: 'dynamic', width: {value: 7, metric: ColumnWidthMetrics.em}, mode: ColumnModes.PERCENT }
	];

	return(<div className={styles.container}>
		<TableHeader columnSetups={columnSetups}/>
		<TableContent columnSetups={columnSetups}/>
		<TableFooter/>
	</div>);
};

export default Table;
