import { User } from './reducers/user';

/* ============================
							AUTH
============================= */

// LOGIN
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

// LOGOUT
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

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

export interface LogoutStart {
  type: typeof LOGOUT_START;
}

export interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

export interface LogoutFailed {
  type: typeof LOGOUT_FAILED;
}

export type LoginDispatchType = LoginFailed | LoginStart | LoginSuccess;
export type LogoutDispatchType = LogoutStart | LogoutSuccess | LogoutFailed;

/* ============================
							AUTH
============================= */
