import { AddressType } from '../address/addressActionTypes';
import { CartItem } from '../cart/cartReducer';
import { ClearCart } from '../user/userActionTypes';

export const ADD_ORDER_START = 'ADD_ORDER_START';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export interface OrderType {
	orderItems: CartItem[];
	shippingAddress: AddressType;
	shippingPrice: number;
	paymentMethod: string;
	totalPrice: number;
}

export interface AddOrderStart {
	type: typeof ADD_ORDER_START;
}

export interface AddOrderSuccess {
	type: typeof ADD_ORDER_SUCCESS;
	payload: OrderType;
}

export interface AddOrderFailed {
	type: typeof ADD_ORDER_FAILED;
	payload: string;
}

export type CreateOrderDispatchType = AddOrderFailed | AddOrderStart | AddOrderSuccess | ClearCart;
export type OrderDispatchType = CreateOrderDispatchType;
