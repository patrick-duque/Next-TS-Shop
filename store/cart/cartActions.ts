import * as actionTypes from './cartActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import { CartItem } from './cartReducer';

export const addToCart = (product: CartItem) => async (
  dispatch: Dispatch<actionTypes.CartDispatchType>
) => {
	dispatch({type: actionTypes.CART_ADD_ITEM, payload: product});
	try {
		await axios.patch(`/products/${product._id}`)
	} catch (error) {
		console.log(error)
	}
};
