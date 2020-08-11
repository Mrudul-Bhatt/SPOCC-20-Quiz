export const initialState = {
	user: null,
	token: null,
	data: [],
	path: '/signin',
	toggle: false,
	loading: false,
	notifyM: null,
	notifyE: null,
	click: false,
};

//pass server error as message on backend in catch block

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGNIN_START':
			return {
				...state,
				loading: true,
				notifyE: null,
				notifyM: null,
			};
		case 'SIGNIN_SUCCESS':
			return {
				...state,
				token: action.token,
				user: action.user,
				loading: false,
				notifyM: action.notify,
				notifyE: null,
				path: '/',
			};

		case 'SIGNIN_FAIL':
			return {
				...state,
				loading: false,
				notifyE: action.notify,
				notifyM: null,
			};
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				token: null,
				user: null,
				data: [],
				path: '/signin',
			};

		case 'SIGNIN_CLICKED':
			return {
				...state,
				click: !state.click,
			};
		case 'CLEANUP':
			return {
				...state,
				notifyE: null,
				notifyM: null,
			};

		case 'CHECK_AUTH_SUCCESS':
			return {
				...state,
				token: action.token,
				user: action.user,
				path: '/',
			};
		default:
			return state;
	}
};
