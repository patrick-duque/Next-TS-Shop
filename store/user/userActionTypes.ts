import { CartItem } from '../cart/cartReducer';
import { User } from './userReducer';

// LOGIN
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

// LOGOUT
export const LOGOUT = 'LOGOUT';

// REGISTER
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

// EDIT USER
export const EDIT_USER_START = 'EDIT_USER_START';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

// DELETE USER
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';

// ADD TO CART
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';

// REMOVE FROM CART
export const REMOVE_FROM_CART_START = 'REMOVE_FROM_CART_START';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILED = 'REMOVE_FROM_CART_FAILED';

export const CLEAR_CART = 'CLEAR_CART';

/* ============================
							LOGIN
============================= */
export interface LoginFailed {
	type: typeof LOGIN_FAILED;
	payload: string;
}

export interface LoginSuccess {
	type: typeof LOGIN_SUCCESS;
	payload: User;
}

export interface LoginStart {
	type: typeof LOGIN_START;
}

export type LoginDispatchType = LoginFailed | LoginStart | LoginSuccess;
/* ============================
							LOGIN
============================= */

/* ============================
							LOGOUT
============================= */

export interface Logout {
	type: typeof LOGOUT;
}

export type LogoutDispatchType = Logout;
/* ============================
							LOGOUT
============================= */

/* ============================
						REGISTER
============================= */
export interface RegisterStart {
	type: typeof REGISTER_START;
}

export interface RegisterSuccess {
	type: typeof REGISTER_SUCCESS;
	payload: User;
}

export interface RegisterFailed {
	type: typeof REGISTER_FAILED;
	payload: string;
}

export type RegisterDispatchType = RegisterStart | RegisterFailed | RegisterSuccess;
/* ============================
						REGISTER
============================= */

/* ============================
					EDIT USER
============================= */
export interface EditUserStart {
	type: typeof EDIT_USER_START;
}

export interface EditUserSuccess {
	type: typeof EDIT_USER_SUCCESS;
	payload: User;
}

export interface EditUserFailed {
	type: typeof EDIT_USER_FAILED;
	payload: string;
}

export type EditUserDispatchType = EditUserStart | EditUserSuccess | EditUserFailed;
/* ============================
					EDIT USER
============================= */

/* ============================
					ADD TO CART
============================= */
export interface AddToCartStart {
	type: typeof ADD_TO_CART_START;
	payload: CartItem;
}

export interface AddToCartSuccess {
	type: typeof ADD_TO_CART_SUCCESS;
	payload: string;
}

export interface AddToCartFailed {
	type: typeof ADD_TO_CART_FAILED;
	payload: string;
	item: CartItem;
}

export type AddToCartDispatchType = AddToCartStart | AddToCartSuccess | AddToCartFailed;
/* ============================
					ADD TO CART
============================= */

/* ============================
				REMOVE FROM CART
============================= */
export interface RemoveFromCartStart {
	type: typeof REMOVE_FROM_CART_START;
	payload: CartItem;
}

export interface RemoveFromCartSuccess {
	type: typeof REMOVE_FROM_CART_SUCCESS;
}

export interface RemoveFromCartFailed {
	type: typeof REMOVE_FROM_CART_FAILED;
	payload: string;
	item: CartItem;
}

export interface ClearCart {
	type: typeof CLEAR_CART;
}

export type RemoveFromCartDispatchType = RemoveFromCartStart | RemoveFromCartSuccess | RemoveFromCartFailed;
/* ============================
				REMOVE FROM CART
============================= */

/* ============================
				DELETE ACCOUNT
============================= */
export interface DeleteAccountStart {
	type: typeof DELETE_USER_START;
}

export interface DeleteAccountSuccess {
	type: typeof DELETE_USER_SUCCESS;
}

export interface DeleteAccountFailed {
	type: typeof DELETE_USER_FAILED;
	payload: string;
}

export type DeleteUserDispatchType = DeleteAccountFailed | DeleteAccountStart | DeleteAccountSuccess | Logout;
/* ============================
				DELETE ACCOUNT
============================= */
export type UserDispatchType =
	| LoginDispatchType
	| LogoutDispatchType
	| RegisterDispatchType
	| EditUserDispatchType
	| AddToCartDispatchType
	| RemoveFromCartDispatchType
	| ClearCart
	| DeleteUserDispatchType;
