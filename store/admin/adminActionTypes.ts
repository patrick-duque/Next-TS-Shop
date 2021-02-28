import { User } from '../user/userReducer';
import Product from '../../models/product';
import { OrdersFromDB } from '../order/orderActionTypes';

// GET USERS
export const ADMIN_GET_USERS_START = 'ADMIN_GET_USERS_START';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILED = 'ADMIN_GET_USERS_FAILED';

// DELETE USER
export const DELETE_USER_BY_ADMIN_START = 'DELETE_USER_BY_ADMIN_START';
export const DELETE_USER_BY_ADMIN_SUCCESS = 'DELETE_USER_BY_ADMIN_SUCCESS';
export const DELETE_USER_BY_ADMIN_FAILED = 'DELETE_USER_BY_ADMIN_FAILED';

// GET ORDER
export const ADMIN_GET_ORDERS_START = 'ADMIN_GET_ORDERS_START';
export const ADMIN_GET_ORDERS_SUCCESS = 'ADMIN_GET_ORDERS_SUCCESS';
export const ADMIN_GET_ORDERS_FAILED = 'ADMIN_GET_ORDERS_FAILED';

// UPDATE ORDER
export const ADMIN_UPDATE_ORDER_DELIVER_START = 'ADMIN_UPDATE_ORDER_DELIVER_START';
export const ADMIN_UPDATE_ORDER_DELIVER_SUCCESS = 'ADMIN_UPDATE_ORDER_DELIVER_SUCCESS';
export const ADMIN_UPDATE_ORDER_DELIVER_FAILED = 'ADMIN_UPDATE_ORDER_DELIVER_FAILED';

// GET PRODUCTS
export const ADMIN_GET_PRODUCTS_START = 'ADMIN_GET_PRODUCTS_START';
export const ADMIN_GET_PRODUCTS_SUCCESS = 'ADMIN_GET_PRODUCTS_SUCCESS';
export const ADMIN_GET_PRODUCTS_FAILED = 'ADMIN_GET_PRODUCTS_FAILED';

// EDIT PRODUCT
export const EDIT_PRODUCT_BY_ADMIN_START = 'EDIT_PRODUCT_BY_ADMIN_START';
export const EDIT_PRODUCT_BY_ADMIN_SUCCESS = 'EDIT_PRODUCT_BY_ADMIN_SUCCESS';
export const EDIT_PRODUCT_BY_ADMIN_FAILED = 'EDIT_PRODUCT_BY_ADMIN_FAILED';

// CREATE PRODUCT
export const CREATE_PRODUCT_BY_ADMIN_START = 'CREATE_PRODUCT_BY_ADMIN_START';
export const CREATE_PRODUCT_BY_ADMIN_SUCCESS = 'CREATE_PRODUCT_BY_ADMIN_SUCCESS';
export const CREATE_PRODUCT_BY_ADMIN_FAILED = 'CREATE_PRODUCT_BY_ADMIN_FAILED';

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
	payload: OrdersFromDB[];
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
					DELIVER ORDER
============================= */
interface DeliverOrderStart {
	type: typeof ADMIN_UPDATE_ORDER_DELIVER_START;
}

interface DeliverOrderSuccess {
	type: typeof ADMIN_UPDATE_ORDER_DELIVER_SUCCESS;
	payload: OrdersFromDB;
}

interface DeliverOrderFailed {
	type: typeof ADMIN_UPDATE_ORDER_DELIVER_FAILED;
	payload: string;
}

export type DeliverOrderDispatchType = DeliverOrderFailed | DeliverOrderStart | DeliverOrderSuccess;
/* ============================
					DELIVER ORDER
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
	payload: Product[];
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

/* ============================
					EDIT PRODUCT
============================= */
interface EditProductStart {
	type: typeof EDIT_PRODUCT_BY_ADMIN_START;
}

interface EditProductSuccess {
	type: typeof EDIT_PRODUCT_BY_ADMIN_SUCCESS;
}

interface EditProductFailed {
	type: typeof EDIT_PRODUCT_BY_ADMIN_FAILED;
	payload: string;
}

export type EditProductDispatchType = EditProductFailed | EditProductStart | EditProductSuccess;
/* ============================
					EDIT PRODUCT
============================= */

/* ============================
				CREATE PRODUCT
============================= */
interface CreateProductStart {
	type: typeof CREATE_PRODUCT_BY_ADMIN_START;
}

interface CreateProductSuccess {
	type: typeof CREATE_PRODUCT_BY_ADMIN_SUCCESS;
	payload: Product;
}

interface CreateProductFailed {
	type: typeof CREATE_PRODUCT_BY_ADMIN_FAILED;
	payload: string;
}

export type CreateProductDispatchType = CreateProductFailed | CreateProductStart | CreateProductSuccess;
/* ============================
				CREATE PRODUCT
============================= */

export type AdminDispatchType =
	| GetUsersDispatchType
	| GetOrdersDispatchType
	| DeleteUserDispatchType
	| GetProductsDispatchType
	| DeleteProductDispatchType
	| EditProductDispatchType
	| CreateProductDispatchType
	| DeliverOrderDispatchType;
