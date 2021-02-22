import * as actionTypes from './adminActionTypes';

import { User } from '../user/userReducer';
import { OrdersFromDB } from '../order/orderActionTypes';

export interface AdminState {
	users: User[];
	loading: boolean;
	error: string;
	orders: OrdersFromDB[];
}

const initialState: AdminState = {
	loading: false,
	users: [],
	error: null,
	orders: []
};

const userReducer = (state: AdminState = initialState, action: actionTypes.AdminDispatchType): AdminState => {
	const newState = { ...state };

	switch (action.type) {
		case actionTypes.ADMIN_GET_USERS_START:
			newState.loading = true;
			break;
		case actionTypes.ADMIN_GET_USERS_SUCCESS:
			newState.error = null;
			newState.users = action.payload;
			newState.loading = false;
			break;
		case actionTypes.ADMIN_GET_USERS_FAILED:
			newState.error = action.payload;
			newState.loading = false;
			break;
	}

	return newState;
};

export default userReducer;
