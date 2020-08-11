import { takeEvery, all } from 'redux-saga/effects';

import { sagaSignin, sagaLogout, sagaCheckAuth } from './user';

export function* watchSaga() {
	yield all([
		takeEvery('SIGNIN', sagaSignin),
		takeEvery('LOGOUT', sagaLogout),
		takeEvery('CHECK_AUTH', sagaCheckAuth),
	]);
}
