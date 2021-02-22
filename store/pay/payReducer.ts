import * as actionTypes from './payActionTypes';

export interface PayState {
	success: boolean;
	loading: boolean;
	error: string;
}

const initialState: PayState = {
	loading: false,
	error: null,
	success: false
};

const payReducer = (state = initialState, action: actionTypes.PayDispatchType): PayState => {
	const newState = { ...state };

	switch (action.type) {
		case actionTypes.PAY_ORDER_START:
			newState.error = null;
			newState.loading = true;
			break;
		case actionTypes.PAY_ORDER_SUCCESS:
			newState.error = null;
			newState.loading = false;
			newState.success = true;
			break;
		case actionTypes.PAY_ORDER_FAILED:
			newState.success = false;
			newState.error = action.payload;
			newState.loading = false;
			break;
		case actionTypes.PAY_ORDER_RESET:
			newState.error = null;
			newState.loading = false;
			newState.success = false;
			break;
	}

	return newState;
};

export default payReducer;
