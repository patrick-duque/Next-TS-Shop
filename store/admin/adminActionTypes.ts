import { User } from '../user/userReducer';

// GET USERS
export const ADMIN_GET_USERS_START = 'ADMIN_GET_USERS_START';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILED = 'ADMIN_GET_USERS_FAILED';

// GET ORDERS
export const ADMIN_GET_ORDERS_START = 'ADMIN_GET_ORDERS_START';
export const ADMIN_GET_ORDERS_SUCCESS = 'ADMIN_GET_ORDERS_SUCCESS';
export const ADMIN_GET_ORDERS_FAILED = 'ADMIN_GET_ORDERS_FAILED';

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

export type AdminDispatchType = GetUsersDispatchType | GetOrdersDispatchType;
