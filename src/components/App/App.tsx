import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from '../MainLayout';
import AboutPage from '../../pages/AboutPage';
import MapPage from '../../pages/MapPage';
import TablePage from '../../pages/TablePage';
import AuthorsPage from '../../pages/AuthorsPage';

const App: React.FC = () => {
	return(<Routes>
		<Route path={'/'} element={<MainLayout/>}>
			<Route index element={<AboutPage/>}/>
			<Route path={'map'} element={<MapPage/>}/>
			<Route path={'table'} element={<TablePage/>}/>
			<Route path={'authors'} element={<AuthorsPage/>}/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Route>
	</Routes>);
};

export default App;
