import * as actionTypes from './cartActionTypes';
import { CartItem } from './cartReducer';

export const addToCart = (product: CartItem): actionTypes.CartDispatchType => {
  return { type: actionTypes.CART_ADD_ITEM, payload: product };
};
