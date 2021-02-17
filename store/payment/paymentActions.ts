import * as actionTypes from './paymentActionTypes';

export const changePaymentMethod = (method: string) => {
	localStorage.setItem('paymentMethod', method);
	return { type: actionTypes.CHANGE_PAYMENT_METHOD, payload: method };
};
