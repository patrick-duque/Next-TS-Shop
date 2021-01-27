import * as actionTypes from '../actionTypes';
import axios from '../../helpers/api/axios';
import { Dispatch } from 'redux';
import { LoginDispatchType } from '../actionTypes';
import { User } from '../reducers/user';

export const loginAction = (action: { username: string; password: string }) => async (
  dispatch: Dispatch<LoginDispatchType>
) => {
  dispatch({ type: actionTypes.LOGIN_START });
  try {
    const user = (await axios.post('/login', action)) as User;
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILED, payload: error as Error });
  }
};
