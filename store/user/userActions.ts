import * as actionTypes from './userActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import { User } from './userReducer';
import Router from 'next/router';
import { CartItem } from '../cart/cartReducer';

// @desc Login User
// @route POST /api/users/login
// @access Public
export const loginAction = (credentials: { email: string; password: string }) => async (
	dispatch: Dispatch<actionTypes.LoginDispatchType>
) => {
	dispatch({ type: actionTypes.LOGIN_START });
	try {
		const user: User = (await axios.post('/users/login', credentials)).data;
		dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
		localStorage.setItem('token', user.token);
		localStorage.setItem(
			'user',
			JSON.stringify({ email: user.email, name: user.name, isAdmin: user.isAdmin, _id: user._id })
		);
		localStorage.setItem('cart', JSON.stringify(user.cart));
		localStorage.setItem('expiry', user.expiry.toString());
		Router.push('/');
	} catch (error) {
		let payload = '';
		if ((error.message as string).includes('401')) {
			payload = 'Invalid credentials.';
		} else {
			payload = 'Something went wrong.';
		}
		dispatch({ type: actionTypes.LOGIN_FAILED, payload });
	}
};

// @desc Logout User
// @route None
// @access Public
export const logoutAction = () => async (dispatch: Dispatch<actionTypes.LogoutDispatchType>) => {
	Router.push('/login');
	dispatch({ type: actionTypes.LOGOUT });
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('cart');
	localStorage.removeItem('expiry');
};

// @desc Register new User
// @route POST /api/users/register
// @access Public
export const registerAction = (userDetails: { email: string; password: string; name: string }) => async (
	dispatch: Dispatch<actionTypes.RegisterDispatchType>
) => {
	dispatch({ type: actionTypes.REGISTER_START });
	try {
		const newUser: User = (await axios.post('/users/register', userDetails)).data;
		dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: newUser });
		localStorage.setItem('token', newUser.token);
		localStorage.setItem(
			'user',
			JSON.stringify({ email: newUser.email, name: newUser.name, isAdmin: newUser.isAdmin, _id: newUser._id })
		);
		localStorage.setItem('cart', JSON.stringify(newUser.cart));
		localStorage.setItem('expiry', newUser.expiry.toString());
		Router.push('/');
	} catch (error) {
		let payload = 'User already exist.';
		if ((error.message as string).includes('400')) {
			payload = 'User already exist.';
		}
		dispatch({ type: actionTypes.REGISTER_FAILED, payload });
	}
};

// @desc Edit User
// @route PUT /api/users/editUser
// @access Private
export const editUserAction = (body: { name?: string; email?: string }) => async (
	dispatch: Dispatch<actionTypes.EditUserDispatchType>
) => {
	dispatch({ type: actionTypes.EDIT_USER_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const editedUser: User = (await axios.put(`/users/editUser`, body, config)).data;
		dispatch({ type: actionTypes.EDIT_USER_SUCCESS, payload: editedUser });
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.setItem(
			'user',
			JSON.stringify({
				email: editedUser.email,
				name: editedUser.name,
				isAdmin: editedUser.isAdmin,
				_id: editedUser._id
			})
		);
		localStorage.setItem('token', editedUser.token);
		localStorage.setItem('expiry', editedUser.expiry.toString());
	} catch (error) {
		let payload = '';
		if ((error.message as string).includes('404')) {
			payload = 'User not found.';
		} else {
			payload = 'Something went wrong.';
		}
		dispatch({ type: actionTypes.EDIT_USER_FAILED, payload });
	}
};

// @desc Add to User cart
// @route POST /api/users/cart
// @access Private
export const addToCartItem = (newProduct: CartItem) => async (
	dispatch: Dispatch<actionTypes.AddToCartDispatchType>
) => {
	dispatch({ type: actionTypes.ADD_TO_CART_START, payload: newProduct });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const newCart = (await axios.post(
			'/users/cart',
			{
				product: newProduct.product._id,
				quantity: newProduct.quantity
			},
			config
		)).data;
		localStorage.removeItem('cart');
		dispatch({ type: actionTypes.ADD_TO_CART_SUCCESS, payload: 'Added to cart' });
		localStorage.setItem('cart', JSON.stringify(newCart.cart));
		Router.push('/cart');
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.ADD_TO_CART_FAILED, payload, item: newProduct });
	}
};

// @desc Add to User cart
// @route GET /api/users/cart/:id
// @access Private
export const removeFromCart = (product: CartItem) => async (
	dispatch: Dispatch<actionTypes.RemoveFromCartDispatchType>
) => {
	dispatch({ type: actionTypes.REMOVE_FROM_CART_START, payload: product });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		const newCart = (await axios.get(`/users/cart/${product.product._id}`, config)).data;
		dispatch({ type: actionTypes.REMOVE_FROM_CART_SUCCESS, payload: 'Added to cart' });
		localStorage.setItem('cart', JSON.stringify(newCart.cart));
		Router.push('/cart');
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.REMOVE_FROM_CART_FAILED, payload, item: product });
	}
};

// @desc Delete User Account
// @route Delete /api/users/user/:id
// @access Private
export const deleteUserAccount = (id: string) => async (dispatch: Dispatch<actionTypes.DeleteUserDispatchType>) => {
	dispatch({ type: actionTypes.DELETE_USER_START });
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		};
		await axios.delete(`/users/user/${id}`, config);
		dispatch({ type: actionTypes.DELETE_USER_SUCCESS });
		dispatch({ type: actionTypes.LOGOUT });
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('cart');
		localStorage.removeItem('expiry');
		Router.push('/login');
	} catch (error) {
		let payload = 'Something went wrong';
		dispatch({ type: actionTypes.DELETE_USER_FAILED, payload });
	}
};
