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
import { Assignment, ExitToApp } from '@material-ui/icons';
import * as actions from '../store/actions/user';
import { useDispatch } from 'react-redux';

const Submission = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const logout = () => dispatch(actions.logout());
	return (
		<div>
			<Container maxWidth='md' style={{ marginTop: 20 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} xl={12} lg={12}>
						<h1 style={{ textAlign: 'center' }}>Thank You!</h1>
						<Divider />
						<List>
							<ListItem>
								<ListItemText
									primary={
										<h2 style={{ textAlign: 'center' }}>
											Your quiz has been submitted, you may logout of the portal
											now.
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
							color='secondary'
							onClick={() => logout()}
							startIcon={<ExitToApp />}
						>
							Log Out
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Submission;
