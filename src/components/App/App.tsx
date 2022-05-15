import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import MainLayout from '../MainLayout';
import AboutPage from '../../pages/AboutPage';
import MapPage from '../../pages/MapPage';
import TablePage from '../../pages/TablePage';

const App: React.FC = () => {
	return(<Routes>
		<Route path={'/'} element={<MainLayout/>}>
			<Route index element={<AboutPage/>}/>
			<Route path={'map'} element={<MapPage/>}/>
			<Route path={'table'} element={<TablePage/>}/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Route>
	</Routes>);
	/*const {test, loading, error} = useAppSelector(state => state.test);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTest());
	}, [dispatch]);

	return (
		<div>
			{!loading && <button onClick={() => dispatch(fetchTest())}>
				{test}
			</button>}
			{loading && <p>Ждите</p>}
			{error && <p>{error}</p>}
		</div>
	);*/
};

export default App;
