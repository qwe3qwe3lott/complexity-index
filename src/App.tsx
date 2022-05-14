import React, {useEffect} from 'react';
import {fetchTest} from './store/slices/map';
import {useAppDispatch, useAppSelector} from './hooks/typedReduxHooks';

const App: React.FC = () => {
	const {test, loading, error} = useAppSelector(state => state.map);
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
	);
};

export default App;
