import * as actionTypes from './userActionTypes';

import { CartItem } from '../cart/cartReducer';

export interface User {
  _id: string;
  isAdmin: boolean;
  email: string;
  name: string;
  cart: CartItem[];
  token: string;
}

export interface UserState {
  user?: User;
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  loading: false,
  user: null,
  error: null
};

const userReducer = (state: UserState = initialState, action: actionTypes.LoginDispatchType): UserState => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.LOGIN_START:
      newState.loading = true;
      newState.error = null;
      break;
    case actionTypes.LOGIN_SUCCESS:
      newState.user = action.payload;
      newState.loading = false;
      newState.error = null;
      break;
    case actionTypes.LOGIN_FAILED:
      newState.error = action.payload;
      newState.loading = false;
      newState.user = null;
      break;
  }

  return newState;
};

export default userReducer;
