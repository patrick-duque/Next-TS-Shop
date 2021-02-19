import * as actionTypes from './userActionTypes';

import { CartItem } from '../cart/cartReducer';

export interface User {
	_id: string;
	isAdmin: boolean;
	email: string;
	name: string;
	cart: CartItem[];
	token?: string;
	expiry?: number;
}

export interface UserState {
	user?: User;
	loading: boolean;
	error?: string;
}

const initialState: UserState = {
	loading: false,
	user: null,
	error: null
};

const userReducer = (state: UserState = initialState, action: actionTypes.UserDispatchType): UserState => {
	const newState = { ...state };

	switch (action.type) {
		case actionTypes.LOGIN_START:
			newState.loading = true;
			newState.error = null;
			break;
		case actionTypes.LOGIN_SUCCESS:
			newState.error = null;
			newState.user = action.payload;
			newState.loading = false;
			break;
		case actionTypes.LOGIN_FAILED:
			newState.user = null;
			newState.error = action.payload;
			newState.loading = false;
			break;
		case actionTypes.LOGOUT:
			newState.error = null;
			newState.user = null;
			newState.loading = false;
			break;
		case actionTypes.REGISTER_START:
			newState.loading = true;
			break;
		case actionTypes.REGISTER_SUCCESS:
			newState.error = null;
			newState.user = action.payload;
			newState.loading = false;
			break;
		case actionTypes.REGISTER_FAILED:
			newState.error = action.payload;
			newState.loading = false;
			break;
		case actionTypes.EDIT_USER_START:
			newState.error = null;
			newState.loading = true;
			break;
		case actionTypes.EDIT_USER_SUCCESS:
			newState.error = null;
			newState.user = action.payload;
			newState.loading = false;
			break;
		case actionTypes.EDIT_USER_FAILED:
			newState.error = action.payload;
			newState.loading = false;
			break;
		case actionTypes.ADD_TO_CART_START:
			newState.error = null;
			const product = newState.user.cart.find(item => item.product._id === action.payload.product._id);
			if (product) {
				product.quantity += action.payload.quantity;
				newState.user.cart = newState.user.cart.map(
					item => (item.product._id === product.product._id ? product : item)
				);
			} else {
				newState.user.cart.push(action.payload);
			}
			break;
		case actionTypes.ADD_TO_CART_FAILED:
			const productIndex = newState.user.cart.findIndex(item => item.product._id === action.item.product._id);
			const removeProduct = newState.user.cart[productIndex];
			removeProduct.quantity -= action.item.quantity;
			if (removeProduct.quantity <= 0) {
				newState.user.cart.splice(productIndex, 1);
			}
			newState.error = action.payload;
			break;
		case actionTypes.REMOVE_FROM_CART_START:
			newState.error = null;
			newState.user.cart = newState.user.cart.filter(item => item.product._id !== action.payload.product._id);
			break;
		case actionTypes.REMOVE_FROM_CART_FAILED:
			newState.error = action.payload;
			newState.user.cart.push(action.item);
			break;
		case actionTypes.CLEAR_CART:
			newState.user.cart = [];
			break;
	}

	return newState;
};

export default userReducer;
