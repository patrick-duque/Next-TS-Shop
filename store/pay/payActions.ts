import * as actionTypes from './payActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import Router from 'next/router';

export interface PaymentResult {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

// @desc Pay Order
// @route PUT /api/orders/:id/pay
// @access Private
export const payOrder = (id: string, paymentResult: PaymentResult) => async (
	dispatch: Dispatch<actionTypes.PayDispatchType>
) => {
	dispatch({ type: actionTypes.PAY_ORDER_START });
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		await axios.put(`/orders/${id}/pay`, paymentResult, config);
		dispatch({ type: actionTypes.PAY_ORDER_SUCCESS, payload: true });
		Router.push('/orders');
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.PAY_ORDER_FAILED, payload });
	}
};
