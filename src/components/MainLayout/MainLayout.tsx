import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from './MainLayout.module.scss';
import Header from '../Header';

const MainLayout: React.FC = () => {
	return (<>
		<Header/>
		<main className={styles.main}>
			<Outlet/>
		</main>
	</>);
};

export default MainLayout;
