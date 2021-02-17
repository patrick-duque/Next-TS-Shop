import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user/userReducer';
import cart from './cart/cartReducer';
import address from './address/addressReducer';
import payment from './payment/paymentReducer';
import { AddressType } from './address/addressActionTypes';

const reducer = combineReducers({ user, cart, address, payment });

const server = typeof window === 'undefined';

let userFromStorage = null;
let cartFromStorage = null;
let addressFromStorage: AddressType = null;
let localUser = null;
let paymentMethodFromStorage = null;
if (!server) {
	addressFromStorage = localStorage.getItem('address') && JSON.parse(localStorage.getItem('address'));
	if (+localStorage.getItem('expiry') >= Date.now()) {
		userFromStorage = JSON.parse(localStorage.getItem('user'));
		cartFromStorage = JSON.parse(localStorage.getItem('cart'));
		paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : 'PayPal';
		localUser = (userFromStorage || cartFromStorage) && { ...userFromStorage, cart: cartFromStorage };
	} else {
		localStorage.removeItem('user');
		localStorage.removeItem('cart');
		localStorage.removeItem('token');
		localStorage.removeItem('expiry');
	}
}

const initialState = {
	user: { user: localUser, loading: false },
	address: addressFromStorage && {
		loading: false,
		address: addressFromStorage.address,
		city: addressFromStorage.city,
		postalCode: addressFromStorage.postalCode
	},
	payment: {
		paymentMethod: paymentMethodFromStorage
	}
};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export type RootStore = ReturnType<typeof reducer>;

export default store;
