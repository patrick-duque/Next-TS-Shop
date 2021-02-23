import { User } from '../user/userReducer';

// GET USERS
export const ADMIN_GET_USERS_START = 'ADMIN_GET_USERS_START';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILED = 'ADMIN_GET_USERS_FAILED';

// GET ORDER
export const ADMIN_GET_ORDERS_START = 'ADMIN_GET_ORDERS_START';
export const ADMIN_GET_ORDERS_SUCCESS = 'ADMIN_GET_ORDERS_SUCCESS';
export const ADMIN_GET_ORDERS_FAILED = 'ADMIN_GET_ORDERS_FAILED';

// DELETE USER
export const DELETE_USER_BY_ADMIN_START = 'DELETE_USER_BY_ADMIN_START';
export const DELETE_USER_BY_ADMIN_SUCCESS = 'DELETE_USER_BY_ADMIN_SUCCESS';
export const DELETE_USER_BY_ADMIN_FAILED = 'DELETE_USER_BY_ADMIN_FAILED';

/* ============================
						GET USERS
============================= */
interface GetUsersStart {
	type: typeof ADMIN_GET_USERS_START;
}

interface GetUsersSuccess {
	type: typeof ADMIN_GET_USERS_SUCCESS;
	payload: User[];
}

interface GetUsersFailed {
	type: typeof ADMIN_GET_USERS_FAILED;
	payload: string;
}

export type GetUsersDispatchType = GetUsersFailed | GetUsersStart | GetUsersSuccess;
/* ============================
						GET USERS
============================= */

/* ============================
						GET ORDERS
============================= */
interface GetOrdersStart {
	type: typeof ADMIN_GET_ORDERS_START;
}

interface GetOrdersSuccess {
	type: typeof ADMIN_GET_ORDERS_SUCCESS;
	payload: User[];
}

interface GetOrdersFailed {
	type: typeof ADMIN_GET_ORDERS_FAILED;
	payload: string;
}

export type GetOrdersDispatchType = GetOrdersFailed | GetOrdersStart | GetOrdersSuccess;
/* ============================
						GET ORDERS
============================= */

/* ============================
						DELETE USER
============================= */
interface DeleteUserStart {
	type: typeof DELETE_USER_BY_ADMIN_START;
}

interface DeleteUserSuccess {
	type: typeof DELETE_USER_BY_ADMIN_SUCCESS;
	payload: string;
}

interface DeleteUserFailed {
	type: typeof DELETE_USER_BY_ADMIN_FAILED;
	payload: string;
}

export type DeleteUserDispatchType = DeleteUserFailed | DeleteUserStart | DeleteUserSuccess;
/* ============================
						DELETE USER
============================= */

export type AdminDispatchType = GetUsersDispatchType | GetOrdersDispatchType | DeleteUserDispatchType;
