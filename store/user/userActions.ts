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
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
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

export const logoutAction = () => async (dispatch: Dispatch<actionTypes.LogoutDispatchType>) => {
  dispatch({ type: actionTypes.LOGOUT });
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  Router.push('/login');
};

export const registerAction = (userDetails: { email: string; password: string; name: string }) => async (
  dispatch: Dispatch<actionTypes.RegisterDispatchType>
) => {
  dispatch({ type: actionTypes.REGISTER_START });
  try {
    const newUser: User = (await axios.post('/users/register', userDetails)).data;
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: newUser });
    localStorage.setItem('token', newUser.token);
    localStorage.setItem('user', JSON.stringify(newUser));
    Router.push('/');
  } catch (error) {
    let payload = '';
    if ((error.message as string).includes('400')) {
      payload = 'User already exist.';
    } else {
      payload = 'Something went wrong.';
    }
    dispatch({ type: actionTypes.REGISTER_FAILED, payload });
  }
};

export const editUserAction = (id: string) => async (dispatch: Dispatch<actionTypes.EditUserDispatchType>) => {
  dispatch({ type: actionTypes.EDIT_USER_START });
  try {
    const editedUser: User = (await axios.put(`/users/user/${id}`)).data;
    dispatch({ type: actionTypes.EDIT_USER_SUCCESS, payload: editedUser });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.setItem('user', JSON.stringify(editedUser));
    localStorage.setItem('token', editedUser.token);
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
