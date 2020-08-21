import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/user';
import Signup from './components/signup';
import Signin from './components/signin';
import Navbar from './components/navbar';
import Exam from './components/exam';
import Home from './components/home';
import Submission from './components/submission';

const App = () => {
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('user'));
	const path = useSelector((state) => state.path);
	const dispatch = useDispatch();
	const checkAuth = () => dispatch(actions.checkAuth());

	useEffect(() => {
		//console.log('check auth');
		checkAuth();

		history.push(path);
	}, [path]);

	let routes = (
		<Switch>
			<Route path='/signin' component={Signin} />
			<Route path='/signup' component={Signup} />
		</Switch>
	);

	if (user) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/exam' exact component={Exam} />
				<Route path='/submission' exact component={Submission} />
			</Switch>
		);
	}

	return (
		<div>
			<Navbar />
			{routes}
		</div>
	);
};

export default App;

// import React from 'react';
// import { Exam } from './components/exam';
// import './App.css';
// import { Navbar } from './components/navbar';

// const App = () => {
// 	return (
// 		<div>
// 			<Navbar />
// 			<Exam />
// 		</div>
// 	);
// };

// export default App;
