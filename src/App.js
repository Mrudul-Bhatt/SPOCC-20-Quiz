import React from 'react';
import { Exam } from './components/exam';
import './App.css';
import { Navbar } from './components/navbar';

const App = () => {
	return (
		<div>
			<Navbar />
			<Exam />
		</div>
	);
};

export default App;
