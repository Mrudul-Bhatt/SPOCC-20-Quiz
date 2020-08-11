import React from 'react';
import { useHistory } from 'react-router';
import {
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Button,
} from '@material-ui/core';
import { Assignment } from '@material-ui/icons';

const Home = () => {
	const history = useHistory();
	return (
		<div>
			<Container maxWidth='md' style={{ marginTop: 20 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} xl={12} lg={12}>
						<h1 style={{ textAlign: 'center' }}>Instructions</h1>
						<Divider />
						<List>
							<ListItem>
								<ListItemText
									primary={
										<h2>
											1.There are 5 sections (Aptitude, Html, Css, Cloud
											Computing Basics, C Programming) in the quiz, each section
											has 10 questions
										</h2>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={
										<h2>
											2.Each correct answer awards 2 points and each wrong
											answer gives -1, no points for unattempted question
										</h2>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={
										<h2>
											3.Submission after 11:00 a.m. will deduct 1 mark for every
											1 minute delay in submission
										</h2>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary={
										<h2>
											4.After starting quiz do not refresh page , or your
											success will be lost and have to start again
										</h2>
									}
								/>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} xl={12} lg={12}>
						{/* <button onClick={() => history.push('/exam')}>Start</button> */}
						<Button
							fullWidth
							disableElevation
							variant='contained'
							color='primary'
							onClick={() => history.push('/exam')}
							startIcon={<Assignment />}
						>
							Start Quiz
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Home;
