import * as actionTypes from './adminActionTypes';

import { User } from '../user/userReducer';
import { OrdersFromDB } from '../order/orderActionTypes';
import Product from '../../models/product';

export interface AdminState {
	users: User[];
	loading: boolean;
	error: string;
	orders: OrdersFromDB[];
	success: boolean;
	products: Product[];
}

const initialState: AdminState = {
	loading: false,
	users: [],
	error: null,
	orders: [],
	success: false,
	products: []
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
		case actionTypes.DELETE_USER_BY_ADMIN_START:
			newState.error = null;
			newState.loading = true;
			break;
		case actionTypes.DELETE_USER_BY_ADMIN_SUCCESS:
			newState.error = null;
			newState.users = newState.users.filter(user => user._id !== action.payload);
			newState.loading = false;
			break;
		case actionTypes.DELETE_USER_BY_ADMIN_FAILED:
			newState.error = action.payload;
			newState.loading = false;
			break;
		case actionTypes.ADMIN_GET_PRODUCTS_START:
			newState.error = null;
			newState.loading = true;
			break;
		case actionTypes.ADMIN_GET_PRODUCTS_SUCCESS:
			newState.error = null;
			newState.products = action.payload;
			newState.loading = false;
			break;
		case actionTypes.ADMIN_GET_PRODUCTS_FAILED:
			newState.error = action.payload;
			newState.loading = false;
			break;
		case actionTypes.DELETE_PRODUCT_BY_ADMIN_START:
			newState.loading = true;
			newState.error = null;
			break;
		case actionTypes.DELETE_PRODUCT_BY_ADMIN_SUCCESS:
			newState.error = null;
			newState.products = newState.products.filter(product => product._id !== action.payload);
			newState.loading = false;
			break;
		case actionTypes.DELETE_PRODUCT_BY_ADMIN_FAILED:
			newState.error = action.payload;
			newState.loading = false;
			break;
	}

	return newState;
};

export default userReducer;
