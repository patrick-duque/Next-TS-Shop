import * as actionTypes from './orderActionTypes';
import { CLEAR_CART } from '../user/userActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import Router from 'next/router';

// @desc Create new Order
// @route POST /api/orders
// @access Private
export const addOrder = (order: actionTypes.OrderType) => async (
	dispatch: Dispatch<actionTypes.CreateOrderDispatchType>
) => {
	dispatch({ type: actionTypes.ADD_ORDER_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const newOrder = (await axios.post(`/orders/`, order, config)).data;
		dispatch({ type: actionTypes.ADD_ORDER_SUCCESS, payload: newOrder });
		dispatch({ type: CLEAR_CART });
		localStorage.removeItem('cart');
		Router.push('/');
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.ADD_ORDER_FAILED, payload });
	}
};

// @desc Get Orders by User
// @route GET /api/orders/user
// @access Private
export const getOrder = () => async (dispatch: Dispatch<actionTypes.GetOrderDispatchType>) => {
	dispatch({ type: actionTypes.GET_ORDER_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const orders = (await axios.get('/orders/user', config)).data;
		dispatch({ type: actionTypes.GET_ORDER_SUCCESS, payload: orders });
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.GET_ORDER_FAILED, payload });
	}
};
