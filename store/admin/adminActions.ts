import * as actionTypes from './adminActionTypes';
import { Dispatch } from 'redux';
import axios from '../../helpers/api/axios';
import { User } from '../user/userReducer';
import Product from '../../models/product';
import Router from 'next/router';

// @desc GET Users
// @route POST /api/users/users/admin
// @access Private/Admin
export const getAllUsers = () => async (dispatch: Dispatch<actionTypes.GetUsersDispatchType>) => {
	dispatch({ type: actionTypes.ADMIN_GET_USERS_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const users: User[] = (await axios.get('/users/users/admin', config)).data;
		dispatch({ type: actionTypes.ADMIN_GET_USERS_SUCCESS, payload: users });
	} catch (error) {
		let payload = 'Something went wrong.';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		}
		dispatch({ type: actionTypes.ADMIN_GET_USERS_FAILED, payload });
	}
};

// @desc Delete User
// @route DELETE /api/users/user/:id
// @access Private
export const deleteUserByAdmin = (id: string) => async (dispatch: Dispatch<actionTypes.DeleteUserDispatchType>) => {
	dispatch({ type: actionTypes.DELETE_USER_BY_ADMIN_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		await axios.delete(`/users/user/${id}`, config);
		dispatch({ type: actionTypes.DELETE_USER_BY_ADMIN_SUCCESS, payload: id });
	} catch (error) {
		let payload = 'Something went wrong.';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		}
		dispatch({ type: actionTypes.DELETE_USER_BY_ADMIN_FAILED, payload });
	}
};

// @desc Get Products
// @route GET /api/products
// @access Public
export const getProductsByAdmin = () => async (dispatch: Dispatch<actionTypes.GetProductsDispatchType>) => {
	dispatch({ type: actionTypes.ADMIN_GET_PRODUCTS_START });
	try {
		const products = (await axios.get('/products')).data;
		dispatch({ type: actionTypes.ADMIN_GET_PRODUCTS_SUCCESS, payload: products });
	} catch (error) {
		let payload = 'Something went wrong.';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		}
		dispatch({ type: actionTypes.ADMIN_GET_PRODUCTS_FAILED, payload });
	}
};

// @desc Delete Product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProductByAdmin = (id: string) => async (
	dispatch: Dispatch<actionTypes.DeleteProductDispatchType>
) => {
	dispatch({ type: actionTypes.DELETE_PRODUCT_BY_ADMIN_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		await axios.delete(`/products/${id}`, config);
		dispatch({ type: actionTypes.DELETE_PRODUCT_BY_ADMIN_SUCCESS, payload: id });
	} catch (error) {
		let payload = 'Something went wrong.';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		}
		dispatch({ type: actionTypes.DELETE_PRODUCT_BY_ADMIN_FAILED, payload });
	}
};

// @desc Edit Product
// @route PUT /api/products/:id
// @access Private/Admin
export const editProductByAdmin = (id: string, product: Product) => async (
	dispatch: Dispatch<actionTypes.EditProductDispatchType>
) => {
	dispatch({ type: actionTypes.EDIT_PRODUCT_BY_ADMIN_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		await axios.put(`/products/${id}`, product, config);
		dispatch({ type: actionTypes.EDIT_PRODUCT_BY_ADMIN_SUCCESS });
		Router.push('/admin/products');
	} catch (error) {
		let payload = 'Something went wrong.';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		}
		dispatch({ type: actionTypes.EDIT_PRODUCT_BY_ADMIN_FAILED, payload });
	}
};

// @desc Create Single Products
// @route POST /api/products
// @access Private/Admin
export const createProductByAdmin = (product: Product) => async (
	dispatch: Dispatch<actionTypes.CreateProductDispatchType>
) => {
	dispatch({ type: actionTypes.CREATE_PRODUCT_BY_ADMIN_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const newProduct = (await axios.post(`/products/`, product, config)).data;
		dispatch({ type: actionTypes.CREATE_PRODUCT_BY_ADMIN_SUCCESS, payload: newProduct });
		Router.push('/admin/products');
	} catch (error) {
		let payload = 'Something went wrong.';
		if ((error.message as string).includes('401')) {
			payload = 'Unauthorized user.';
		}
		dispatch({ type: actionTypes.CREATE_PRODUCT_BY_ADMIN_FAILED, payload });
	}
};
