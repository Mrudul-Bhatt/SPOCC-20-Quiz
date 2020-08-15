import React, { useState, useEffect } from 'react';
import {
	Avatar,
	TextField,
	Link,
	Grid,
	Box,
	Typography,
	Button,
	Container,
	LinearProgress,
} from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/user';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='#'>
				Cloud Computing Cell
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Signin() {
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const signin = (email, password) => dispatch(actions.signin(email, password));
	const notifyE = useSelector((state) => state.notifyE);
	const notifyM = useSelector((state) => state.notifyM);
	const loading = useSelector((state) => state.loading);
	const click = useSelector((state) => state.click);
	const cleanup = () => dispatch(actions.cleanup());

	useEffect(() => {
		if (notifyE) {
			// addToast(notifyE, { appearance: 'error' });
			message.error(notifyE);
			cleanup();
		}
		if (notifyM) {
			// addToast(notifyE, { appearance: 'success' });
			// message.success(notifyM);
			cleanup();
		}
		//console.log(click);
	}, [click]);

	const signinHandler = () => {
		//console.log('signin start');

		if (!email || !password) {
			// addToast('Please fill all details', { appearance: 'error' });
			message.error('Please enter all fields!');
			return;
		}

		signin(email, password);
	};

	return (
		<div>
			{loading ? <LinearProgress /> : null}
			<Container component='main' maxWidth='xs'>
				{/* <CssBaseline /> */}
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Log In
					</Typography>
					<div className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							onClick={() => signinHandler()}
							//disabled={loading}
							disabled={true}
						>
							Log In
						</Button>
						{/* <Grid container>
							<Grid item>
								<Link variant='body2' onClick={() => history.push('/signup')}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid> */}
					</div>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
}
