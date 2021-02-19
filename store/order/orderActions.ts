import * as actionTypes from './orderActionTypes';
import { CLEAR_CART } from '../user/userActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import Router from 'next/router';

export const addOrder = (order: actionTypes.OrderType) => async (
	dispatch: Dispatch<actionTypes.CreateOrderDispatchType>
) => {
	dispatch({ type: actionTypes.ADD_ORDER_START });
	try {
		axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
		const newOrder = (await axios.post(`/orders/`, order)).data;
		dispatch({ type: actionTypes.ADD_ORDER_SUCCESS, payload: newOrder });
		dispatch({ type: CLEAR_CART });
		localStorage.removeItem('cart');
		Router.push('/');
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.ADD_ORDER_FAILED, payload });
	}
};
