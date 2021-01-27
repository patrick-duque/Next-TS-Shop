import * as actionTypes from './userActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import { User } from './userReducer';

export const loginAction = (action: { username: string; password: string }) => async (
  dispatch: Dispatch<actionTypes.LoginDispatchType>
) => {
  dispatch({ type: actionTypes.LOGIN_START });
  try {
    const user: User = (await axios.post('/login', action)).data;
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILED, payload: (error as Error).message });
  }
};
