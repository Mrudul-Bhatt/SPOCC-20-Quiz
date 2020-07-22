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
	Paper,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormControl,
	FormLabel,
	Divider,
	ButtonGroup,
	GridList,
	GridListTile,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { message } from 'antd';
// import * as actions from '../../store/actions/user';
import {
	RadioButtonUnchecked,
	RadioButtonChecked,
	ArrowBackIos,
	RotateLeft,
	Bookmark,
	ArrowForwardIos,
	AssignmentTurnedIn,
	Assignment,
} from '@material-ui/icons';
import { red, yellow, pink, green, deepOrange } from '@material-ui/core/colors';
import { baseUrl } from '../helper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	sections: {
		height: '100%', //590
		overflow: 'auto',
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		// maxWidth: 500,
		// maxHeight: 500,
		// maxHeight: '100%',
		// height: '100%',
		maxHeight: 590,
		overflow: 'auto',
	},
	rootButton: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	rootList: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 500,
	},
	defaultAvatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		// color: theme.palette.getContrastText(yellow[500]),
		// backgroundColor: yellow[500],
	},
	markAvatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		color: theme.palette.getContrastText(yellow[500]),
		backgroundColor: yellow[500],
	},
	unansweredAvatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		color: theme.palette.getContrastText(pink[500]),
		backgroundColor: pink[500],
	},
	answeredAvatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		color: theme.palette.getContrastText(green[500]),
		backgroundColor: green[500],
	},
}));

// var fetchedData = [];

// var count = 0;
// var items = 0;

// fetchedData.map((item) => {
// 	if (item.section === 1) {
// 		count++;
// 	}
// 	items++;
// });

// var sec = items / count;
// var arr = [];
// var answer = [];
// for (var i = 1; i <= sec; i++) {
// 	arr.push(i);
// 	answer.push(0);
// }

export const Exam = () => {
	const classes = useStyles();

	const [res, setRes] = useState(0);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [answer, setAnswer] = useState([]);
	const [arr, setArr] = useState([]);

	const len = data.length;
	const [currentPage, setCurrentPage] = useState(0);
	const [section, setSection] = useState(1);
	const [dialog, setDialog] = useState(false);
	const [val, setVal] = useState(null);
	const [loader, setLoader] = useState(false);
	const [restart, setRestart] = useState(false);

	useEffect(() => {
		setLoader(true);
		fetch(`${baseUrl}/allques`)
			.then((res) => res.json())
			.then((response) => {
				// console.log(response.myques);
				var counter = 0;
				var items = 0;
				var sec = 0;
				var arrr = [];
				var answerr = [];
				response.myques.map((item) => {
					if (item.section === 1) {
						counter++;
					}
					items++;
				});
				setCount(counter);
				sec = items / counter;

				for (var i = 1; i <= sec; i++) {
					arrr.push(i);
					answerr.push(0);
				}
				setArr(arrr);
				setAnswer(answerr);
				// console.log(arrr, answerr, sec, items);
				setData(response.myques);
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
	}, [restart]);

	const SubmitDialog = () => {
		return (
			<Dialog fullWidth open={dialog} onClose={() => setDialog(false)}>
				<DialogTitle style={{ textAlign: 'center', fontSize: 100 }}>
					{'You Scored'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ textAlign: 'center', fontSize: 50 }}>
						{res}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setDialog(false);
							setRestart(!restart);
							setVal(null);
							setCurrentPage(0);
							setSection(1);
						}}
						color='primary'
						autoFocus
					>
						Restart
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	useEffect(() => {
		if (data.length !== 0) {
			data[currentPage].choice = val;
		}
	}, [val]);

	useEffect(() => {
		if (data.length !== 0) {
			setVal(data[currentPage].choice);
			data[currentPage].visited = true;

			// console.log(data[currentPage].color);
		}
	}, [currentPage]);

	const setColor = () => {
		if (data[currentPage].mark) {
			data[currentPage].color = 'marked';
		} else if (data[currentPage].choice === null && data[currentPage].visited) {
			data[currentPage].color = 'unanswered';
		} else {
			data[currentPage].color = 'answered';
		}
	};

	const reset = (page) => {
		setVal(null);
	};

	const submit = () => {
		var result = 0;

		data.map((item) => {
			item.choice === item.correct && result++;
		});
		setRes(result);
		setDialog(true);
	};

	return (
		<div>
			{loader && <LinearProgress />}

			<Container maxWidth='xl' style={{ marginTop: 20 }}>
				{data.length !== 0 && (
					<div>
						<SubmitDialog />
						<Grid container spacing={3}>
							<Grid item xs={12} sm={3}>
								<h1 style={{ textAlign: 'center' }}>Sections</h1>
								<Divider />
								<List className={classes.sections}>
									{arr &&
										arr.map((item) => (
											<ListItem button selected={section === item}>
												<ListItemIcon>
													<Assignment fontSize='large' />
												</ListItemIcon>
												<ListItemText
													onClick={() => {
														setCurrentPage((item - 1) * count);
														setSection(item);
													}}
													primary={<h3>Section {item}</h3>}
												/>
											</ListItem>
										))}
								</List>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Paper variant='outlined' className={classes.paper}>
									<h1>
										{`${
											(currentPage + 1) % count !== 0
												? (currentPage + 1) % count
												: count
										}` +
											'.' +
											data[currentPage].question}
									</h1>
									<Divider />
									<List>
										<ListItem button>
											<ListItemIcon>
												{val === 1 ? (
													<RadioButtonChecked fontSize='large' />
												) : (
													<RadioButtonUnchecked fontSize='large' />
												)}
											</ListItemIcon>
											<ListItemText
												primary={<h2>{data[currentPage].options[0]}</h2>}
												onClick={() => setVal(1)}
											/>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												{val === 2 ? (
													<RadioButtonChecked fontSize='large' />
												) : (
													<RadioButtonUnchecked fontSize='large' />
												)}
											</ListItemIcon>
											<ListItemText
												primary={<h2>{data[currentPage].options[1]}</h2>}
												onClick={() => setVal(2)}
											/>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												{val === 3 ? (
													<RadioButtonChecked fontSize='large' />
												) : (
													<RadioButtonUnchecked fontSize='large' />
												)}
											</ListItemIcon>
											<ListItemText
												primary={<h2>{data[currentPage].options[2]}</h2>}
												onClick={() => setVal(3)}
											/>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												{val === 4 ? (
													<RadioButtonChecked fontSize='large' />
												) : (
													<RadioButtonUnchecked fontSize='large' />
												)}
											</ListItemIcon>
											<ListItemText
												primary={<h2>{data[currentPage].options[3]}</h2>}
												onClick={() => setVal(4)}
											/>
										</ListItem>
									</List>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={3}>
								<h1 style={{ textAlign: 'center' }}>Overview</h1>
								<Divider />
								<div className={classes.rootList}>
									<GridList
										cellHeight='100%'
										className={classes.gridList}
										cols={5}
										style={{ marginTop: '10px' }}
									>
										{data.map((tile, index) => {
											if (tile.section === section) {
												if (tile.choice !== null) {
													answer[section - 1]++;
												}
												return (
													<GridListTile key={tile.question} cols={1}>
														{tile.color === 'marked' ? (
															<Avatar
																className={classes.markAvatar}
																onClick={() => {
																	setColor();
																	setCurrentPage(index);
																}}
															>
																{(index + 1) % count !== 0
																	? (index + 1) % count
																	: count}
															</Avatar>
														) : tile.color === 'unanswered' ? (
															<Avatar
																className={classes.unansweredAvatar}
																onClick={() => {
																	setColor();
																	setCurrentPage(index);
																}}
															>
																{(index + 1) % count !== 0
																	? (index + 1) % count
																	: count}
															</Avatar>
														) : tile.color === 'answered' ? (
															<Avatar
																className={classes.answeredAvatar}
																onClick={() => {
																	setColor();
																	setCurrentPage(index);
																}}
															>
																{(index + 1) % count !== 0
																	? (index + 1) % count
																	: count}
															</Avatar>
														) : (
															<Avatar
																className={classes.defaultAvatar}
																onClick={() => {
																	setColor();
																	setCurrentPage(index);
																}}
															>
																{(index + 1) % count !== 0
																	? (index + 1) % count
																	: count}
															</Avatar>
														)}
													</GridListTile>
												);
											}
										})}
									</GridList>
								</div>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Paper variant='outlined'>
									<Grid container>
										<Grid item xs={12} sm={3}>
											<Button
												disableElevation
												variant='contained'
												color='secondary'
												size='large'
												startIcon={<RotateLeft />}
												onClick={() => reset()}
												style={{ width: '100%' }}
											>
												Reset
											</Button>
										</Grid>
										<Grid item xs={6} sm={3}>
											<Button
												startIcon={<ArrowBackIos />}
												disabled={currentPage === 0 && true}
												onClick={() => {
													setColor();

													if ((currentPage + 1) % count === 1) {
														setSection(section - 1);
													}
													setCurrentPage(currentPage - 1);
												}}
												style={{ width: '100%' }}
											>
												Prev
											</Button>
										</Grid>
										<Grid item xs={6} sm={3}>
											<Button
												endIcon={<ArrowForwardIos />}
												disabled={currentPage === len - 1 && true}
												onClick={() => {
													setColor();
													if ((currentPage + 1) % count === 0) {
														setSection(section + 1);
													}
													setCurrentPage(currentPage + 1);
												}}
												style={{ width: '100%' }}
											>
												Next
											</Button>
										</Grid>
										<Grid item xs={12} sm={3}>
											<Button
												disableElevation
												startIcon={<AssignmentTurnedIn />}
												variant='contained'
												size='large'
												color='primary'
												onClick={() => submit()}
												style={{ width: '100%' }}
											>
												Submit Test
											</Button>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
					</div>
				)}
			</Container>
		</div>
	);
};
