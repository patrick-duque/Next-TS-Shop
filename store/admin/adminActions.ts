import * as actionTypes from './adminActionTypes';
import { Dispatch } from 'redux';
import axios from '../../helpers/api/axios';
import { User } from '../user/userReducer';

// @desc GET Users
// @route POST /api/users/users/admin
// @access Private/Admin
export const getAllUsers = () => async (dispatch: Dispatch<actionTypes.GetUsersDispatchType>) => {
	dispatch({ type: actionTypes.ADMIN_GET_USERS_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const users: User[] = (await axios.get('/users/users/admin', config)).data;
		dispatch({ type: actionTypes.ADMIN_GET_USERS_SUCCESS, payload: users });
	} catch (error) {
		let payload = '';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		} else {
			payload = 'Something went wrong.';
		}
		dispatch({ type: actionTypes.ADMIN_GET_USERS_FAILED, payload });
	}
};
