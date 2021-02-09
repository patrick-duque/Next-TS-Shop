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

// ADD TO CART
export const ADD_TO_CART_START = 'ADD_TO_CART_START';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';

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
/* ============================
							LOGIN
============================= */

/* ============================
							LOGOUT
============================= */

export interface Logout {
  type: typeof LOGOUT;
}
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
/* ============================
					EDIT USER
============================= */

/* ============================
							LOGIN
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
/* ============================
							LOGIN
============================= */

export type LoginDispatchType = LoginFailed | LoginStart | LoginSuccess;
export type LogoutDispatchType = Logout;
export type RegisterDispatchType = RegisterStart | RegisterFailed | RegisterSuccess;
export type EditUserDispatchType = EditUserStart | EditUserSuccess | EditUserFailed;
export type AddToCartDispatchType = AddToCartStart | AddToCartSuccess | AddToCartFailed;

export type UserDispatchType =
  | LoginDispatchType
  | LogoutDispatchType
  | RegisterDispatchType
  | EditUserDispatchType
  | AddToCartDispatchType;
