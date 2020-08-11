import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/user';
import { baseUrl } from '../../helper';

export function* sagaLogout(action) {
	yield call([localStorage, 'removeItem'], 'jwt');
	yield call([localStorage, 'removeItem'], 'user');
	yield put(actions.logoutSuccess());
}

export function* sagaCheckAuth(action) {
	const token = yield localStorage.getItem('jwt');
	if (!token) {
		yield put(actions.logoutSuccess());
	} else {
		const user = yield JSON.parse(localStorage.getItem('user'));
		const response = { user: user, token: token };
		yield put(actions.checkAuthSuccess(response));
	}
}

const signin = (data) => {
	//console.log('signin start');
	return fetch(`${baseUrl}/signin`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: data.email,
			password: data.password,
		}),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaSignin(action) {
	//console.log('start');
	yield put(actions.signinStart());

	const signinData = { email: action.email, password: action.password };

	const { response, error } = yield call(signin, signinData);

	if (response.error) {
		yield put(actions.signinFail(response.error));
		yield put(actions.signinClicked());
	} else if (error) {
		yield put(actions.signinFail('Server is down!'));
		yield put(actions.signinClicked());
	} else {
		//console.log('set item');
		yield localStorage.setItem('jwt', response.token);
		yield localStorage.setItem('user', JSON.stringify(response.user));
		yield put(actions.signinSuccess(response));
		yield put(actions.signinClicked());
	}
}
