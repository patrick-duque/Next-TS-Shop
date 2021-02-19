import * as actionTypes from './cartActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import { CartItem } from './cartReducer';

export const addToCart = (product: CartItem) => async (dispatch: Dispatch<actionTypes.CartDispatchType>) => {
	dispatch({ type: actionTypes.CART_ADD_ITEM, payload: product });
	try {
		await axios.patch(`/products/${product.product._id}`);
	} catch (error) {
		console.log(error);
	}
};

export const removeToCart = (id: string) => async (dispatch: Dispatch<actionTypes.CartDispatchType>) => {
	console.log(id);
	dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: id });
	try {
		await axios.delete(`/products/${id}`);
	} catch (error) {
		console.log(error);
	}
};
