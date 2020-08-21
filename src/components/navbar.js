import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	DialogActions,
	DialogTitle,
	Dialog,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import * as actions from '../store/actions/user';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Navbar = () => {
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('user'));

	const [logoutDialog, setLogoutDialog] = useState(false);
	const dispatch = useDispatch();
	const logout = () => dispatch(actions.logout());

	const LogoutDialog = () => {
		return (
			<Dialog
				fullWidth
				open={logoutDialog}
				onClose={() => setLogoutDialog(false)}
			>
				<DialogTitle>{'Logout from Quiz ?'}</DialogTitle>
				{/* <DialogContent>
			  <DialogContentText>
				
			  </DialogContentText>
			</DialogContent> */}
				<DialogActions>
					<Button onClick={() => setLogoutDialog(false)} color='primary'>
						Cancel
					</Button>
					<Button
						onClick={() => {
							setLogoutDialog(false);
							logout();
						}}
						color='primary'
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<div className={classes.root}>
			<LogoutDialog />
			<AppBar position='static'>
				<Toolbar>
					<Typography color='inherit' variant='h6' className={classes.title}>
						SPOCC'20-Quiz
					</Typography>
					{/* {user && (
						<Typography color='inherit' variant='h6' className={classes.title}>
							10:00-11:00 a.m.
						</Typography>
					)} */}
					{user && (
						<IconButton color='inherit' onClick={() => setLogoutDialog(true)}>
							<ExitToApp />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
