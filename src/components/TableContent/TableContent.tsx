import React, {useCallback} from 'react';

import styles from './TableContent.module.scss';
import {ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {IndexValue} from '../../types/IndexValue';

type Props = {
	columnSetups: ColumnSetup[]
}

const TableContent: React.FC<Props> = ({columnSetups}) => {
	const indexValues = useAppSelector(state => state.table.indexValues);

	const getColumnWidth = useCallback((setup: ColumnSetup) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	return(<ul className={styles.container}>
		<li/>
		{indexValues.map(indexValue => <li key={indexValue.id} className={styles.element}>
			{columnSetups.map(columnSetup => <span key={columnSetup.title} className={styles.span} style={getColumnWidth(columnSetup)}>
				{indexValue[columnSetup.property as keyof IndexValue]}
			</span>)}
		</li>)}
	</ul>);
};

export default TableContent;
