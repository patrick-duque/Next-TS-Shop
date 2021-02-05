import { User } from './userReducer';

/* ============================
							AUTH
============================= */

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

export type LoginDispatchType = LoginFailed | LoginStart | LoginSuccess;
export type LogoutDispatchType = Logout;
export type RegisterDispatchType = RegisterStart | RegisterFailed | RegisterSuccess;

export type UserDispatchType = LoginDispatchType | LogoutDispatchType | RegisterDispatchType;

/* ============================
							AUTH
============================= */
