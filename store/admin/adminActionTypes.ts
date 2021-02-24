import { User } from '../user/userReducer';
import ProductModel from '../../models/product';

// GET USERS
export const ADMIN_GET_USERS_START = 'ADMIN_GET_USERS_START';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILED = 'ADMIN_GET_USERS_FAILED';

// GET ORDER
export const ADMIN_GET_ORDERS_START = 'ADMIN_GET_ORDERS_START';
export const ADMIN_GET_ORDERS_SUCCESS = 'ADMIN_GET_ORDERS_SUCCESS';
export const ADMIN_GET_ORDERS_FAILED = 'ADMIN_GET_ORDERS_FAILED';

// GET ORDER
export const ADMIN_GET_PRODUCTS_START = 'ADMIN_GET_PRODUCTS_START';
export const ADMIN_GET_PRODUCTS_SUCCESS = 'ADMIN_GET_PRODUCTS_SUCCESS';
export const ADMIN_GET_PRODUCTS_FAILED = 'ADMIN_GET_PRODUCTS_FAILED';

// DELETE USER
export const DELETE_USER_BY_ADMIN_START = 'DELETE_USER_BY_ADMIN_START';
export const DELETE_USER_BY_ADMIN_SUCCESS = 'DELETE_USER_BY_ADMIN_SUCCESS';
export const DELETE_USER_BY_ADMIN_FAILED = 'DELETE_USER_BY_ADMIN_FAILED';

// DELETE PRODUCT
export const DELETE_PRODUCT_BY_ADMIN_START = 'DELETE_PRODUCT_BY_ADMIN_START';
export const DELETE_PRODUCT_BY_ADMIN_SUCCESS = 'DELETE_PRODUCT_BY_ADMIN_SUCCESS';
export const DELETE_PRODUCT_BY_ADMIN_FAILED = 'DELETE_PRODUCT_BY_ADMIN_FAILED';

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

/* ============================
						GET PRODUCT
============================= */
interface GetProductsStart {
	type: typeof ADMIN_GET_PRODUCTS_START;
}

interface GetProductsSuccess {
	type: typeof ADMIN_GET_PRODUCTS_SUCCESS;
	payload: ProductModel[];
}

interface GetProductsFailed {
	type: typeof ADMIN_GET_PRODUCTS_FAILED;
	payload: string;
}

export type GetProductsDispatchType = GetProductsFailed | GetProductsStart | GetProductsSuccess;
/* ============================
						GET USERS
============================= */

/* ============================
					DELETE PRODUCT
============================= */
interface DeleteProductStart {
	type: typeof DELETE_PRODUCT_BY_ADMIN_START;
}

interface DeleteProductSuccess {
	type: typeof DELETE_PRODUCT_BY_ADMIN_SUCCESS;
	payload: string;
}

interface DeleteProductFailed {
	type: typeof DELETE_PRODUCT_BY_ADMIN_FAILED;
	payload: string;
}

export type DeleteProductDispatchType = DeleteProductFailed | DeleteProductStart | DeleteProductSuccess;
/* ============================
					DELETE PRODUCT
============================= */

export type AdminDispatchType =
	| GetUsersDispatchType
	| GetOrdersDispatchType
	| DeleteUserDispatchType
	| GetProductsDispatchType
	| DeleteProductDispatchType;
