import * as actionTypes from './orderActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';

export const addOrder = (order: actionTypes.OrderType) => async (dispatch: Dispatch<actionTypes.OrderDispatchType>) => {
	dispatch({ type: actionTypes.ADD_ORDER_START });
	try {
		axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
		const newOrder = (await axios.post(`/orders/`, order)).data;
		dispatch({ type: actionTypes.ADD_ORDER_SUCCESS, payload: newOrder });
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.ADD_ORDER_FAILED, payload });
	}
};
