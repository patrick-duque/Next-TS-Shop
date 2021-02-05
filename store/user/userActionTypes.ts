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
export const REGISTER = 'REGISTER';

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

export interface Logout {
  type: typeof LOGOUT;
}

export type LoginDispatchType = LoginFailed | LoginStart | LoginSuccess;
export type LogoutDispatchType = Logout;

export type UserDispatchType = LoginDispatchType | LogoutDispatchType

/* ============================
							AUTH
============================= */
