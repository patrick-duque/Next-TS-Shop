import { AddressType } from '../address/addressActionTypes';
import { CartItem } from '../cart/cartReducer';
import { ClearCart } from '../user/userActionTypes';

export const ADD_ORDER_START = 'ADD_ORDER_START';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export const GET_ORDER_START = 'GET_ORDER_START';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export interface OrderType {
	orderItems: CartItem[];
	shippingAddress: AddressType;
	shippingPrice: number;
	paymentMethod: string;
	totalPrice: number;
}

export interface OrdersFromDB extends OrderType {
	createdAt: string;
	isDelivered: boolean;
	isPaid: boolean;
	updatedAt: string;
	_id: string;
}

interface AddOrderStart {
	type: typeof ADD_ORDER_START;
}

interface AddOrderSuccess {
	type: typeof ADD_ORDER_SUCCESS;
	payload: OrderType;
}

interface AddOrderFailed {
	type: typeof ADD_ORDER_FAILED;
	payload: string;
}

interface GetOrderStart {
	type: typeof GET_ORDER_START;
}

interface GetOrderSuccess {
	type: typeof GET_ORDER_SUCCESS;
	payload: OrdersFromDB[];
}

interface GetOrderFailed {
	type: typeof GET_ORDER_FAILED;
	payload: string;
}

export type CreateOrderDispatchType = AddOrderFailed | AddOrderStart | AddOrderSuccess | ClearCart;
export type GetOrderDispatchType = GetOrderStart | GetOrderSuccess | GetOrderFailed;
export type OrderDispatchType = CreateOrderDispatchType | GetOrderDispatchType;
