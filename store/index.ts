import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user/userReducer';
import cart from './cart/cartReducer';

const reducer = combineReducers({ user, cart });

const server = typeof window === 'undefined';

let userFromStorage = null;
if (!server) {
  userFromStorage = JSON.parse(localStorage.getItem('user'));
}

const initialState = {
  user: { user: userFromStorage, loading: false }
};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export type RootStore = ReturnType<typeof reducer>;

export default store;
