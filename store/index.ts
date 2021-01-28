import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user/userReducer';
import cart from './cart/cartReducer';

const reducer = combineReducers({ user, cart });

const middleware = [ thunk ];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export type RootStore = ReturnType<typeof reducer>;

export default store;
