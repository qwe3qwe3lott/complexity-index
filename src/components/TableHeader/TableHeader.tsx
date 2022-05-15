import React, {useCallback} from 'react';

import styles from './TableHeader.module.scss';
import {ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import notSorted from '../../assets/not-sorted.svg';
import sorted from '../../assets/sorted.svg';
import {useAppSelector} from '../../hooks/typedReduxHooks';

type Props = {
	columnSetups: ColumnSetup[]
}

const TableHeader: React.FC<Props> = ({columnSetups}) => {
	const sortSetup = useAppSelector(state => state.table.sortSetup);

	const getColumnWidth = useCallback((setup: ColumnSetup) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	return(<div className={styles.container}>
		{columnSetups.map(columnSetup => <button className={styles.column} key={columnSetup.title} style={getColumnWidth(columnSetup)}>
			<span className={styles.title}>{columnSetup.title}</span>
			{sortSetup.property === columnSetup.property ?
				<img
					alt="sort arrow"
					src={sorted}
					className={styles.sort}
					style={sortSetup.sortAtoZ ? { transform: 'rotate(180deg)' } : {}}
				/> :
				<img alt="sort mark" src={notSorted} className={styles.sort}/>}
		</button>)}
	</div>);
};

export default TableHeader;
