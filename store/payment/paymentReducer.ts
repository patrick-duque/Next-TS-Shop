import * as actionTypes from './paymentActionTypes';

export interface PaymentState {
	paymentMethod?: string;
}

const initialState: PaymentState = {};

const paymentMethodReducer = (
	state: PaymentState = initialState,
	action: actionTypes.PaymentDispatchType
): PaymentState => {
	const newState = { ...state };

	switch (action.type) {
		case actionTypes.CHANGE_PAYMENT_METHOD:
			newState.paymentMethod = action.payload;
			break;
	}

	return newState;
};

export default paymentMethodReducer;
