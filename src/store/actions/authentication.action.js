import { login as authLogin, register as authRegister } from 'auth-provider';
import { client } from 'utils/api-client';
import doAsyncAction from './async.action';
import { ACTION_PREFIXES } from './types.action';

// const resetErrorMessage = () => (dispatch) => dispatch({
//   type: ACTION_PREFIXES.RESET_AUTH_ERROR_MESSAGE,
// });

const loginByToken = (token) =>
  doAsyncAction(ACTION_PREFIXES.LOGIN, {}, client, 'me', { token });

const login = ({ username, password }) => 
  doAsyncAction(ACTION_PREFIXES.LOGIN, { username, password }, authLogin, { username, password });

const register = ({ username, password }) =>
  doAsyncAction(ACTION_PREFIXES.REGISTER, { username, password }, authRegister, { username, password });

const logout = () => {}

export {
  login,
  logout,
  register,
  loginByToken,
  // resetErrorMessage,
};
