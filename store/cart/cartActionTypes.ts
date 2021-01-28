/* ============================
							CART
============================= */

import { CartItem } from './cartReducer';

// LOGIN
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

export interface CartAddItem {
  type: typeof CART_ADD_ITEM;
  payload: CartItem;
}

export interface CartRemoveItem {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export type CartDispatchType = CartAddItem | CartRemoveItem;

/* ============================
							CART
============================= */
