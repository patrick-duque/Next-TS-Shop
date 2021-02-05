import * as actionTypes from './userActionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import { User } from './userReducer';
import Router from 'next/router';

export const loginAction = (credentials: { email: string; password: string }) => async (
  dispatch: Dispatch<actionTypes.LoginDispatchType>
) => {
  dispatch({ type: actionTypes.LOGIN_START });
  try {
    const user: User = (await axios.post('/users/login', credentials)).data;
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
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
