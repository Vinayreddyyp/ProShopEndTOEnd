import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAIL_REQUEST,
	USER_DETAIL_SUCCESS,
	USER_DETAIL_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAIL
} from '../constants/userConstants';
export const login = (email, password) => async dispatch => {
	console.log('email and password', email, password);
	try {
		dispatch({
			type: USER_LOGIN_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(
			'api/users/login',
			{ email, password },
			config
		);
		console.log('data', data);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const logout = () => dispatch => {
	localStorage.removeItem('useInfo');
	dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async dispatch => {
	console.log('email and password', name, email, password);
	try {
		dispatch({
			type: USER_REGISTER_REQUEST
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post(
			'api/users',
			{ name, email, password },
			config
		);
		console.log('register data', data);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const getUserDetails = id => async (dispatch, getState) => {
	console.log('profile', id);
	try {
		dispatch({
			type: USER_DETAIL_REQUEST
		});

		const {
			userLogin: { userInfo }
		} = getState();

		console.log('token', userInfo.token);
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		const { data } = await axios.get(`api/users/${id}`, config);
		console.log('profile data', data);

		dispatch({
			type: USER_DETAIL_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: USER_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
export const updateUserProfile = user => async (dispatch, getState) => {
	console.log('user', user);
	try {
		dispatch({
			type: USER_PROFILE_UPDATE_REQUEST
		});

		const {
			userLogin: { userInfo }
		} = getState();
		console.log('userINfo', userInfo.token);

		console.log('token', userInfo.token);
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		const { data } = await axios.put(`api/users/profile`, user, config);
		console.log('profile data', data);

		dispatch({
			type: USER_PROFILE_UPDATE_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: USER_PROFILE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};
