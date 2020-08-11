export const signinSuccess = (response) => {
	return {
		type: 'SIGNIN_SUCCESS',
		token: response.token,
		user: response.user,
		notify: response.message,
	};
};

export const signinFail = (error) => {
	return {
		type: 'SIGNIN_FAIL',
		notify: error,
	};
};

export const signinStart = () => {
	return {
		type: 'SIGNIN_START',
	};
};

export const signin = (email, password) => {
	return {
		type: 'SIGNIN',
		email: email,
		password: password,
	};
};

export const cleanup = () => {
	return {
		type: 'CLEANUP',
	};
};

export const signinClicked = () => {
	return {
		type: 'SIGNIN_CLICKED',
	};
};

export const logout = () => {
	return {
		type: 'LOGOUT',
	};
};

export const logoutSuccess = () => {
	return {
		type: 'LOGOUT_SUCCESS',
	};
};

export const checkAuth = () => {
	return {
		type: 'CHECK_AUTH',
	};
};

export const checkAuthSuccess = (response) => {
	return {
		type: 'CHECK_AUTH_SUCCESS',
		token: response.token,
		user: response.user,
	};
};
