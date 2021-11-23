import { login as authLogin, register as authRegister } from 'utils/authClient';
import { client } from 'utils/apiClient';
import { AUTHENTICATION_ACTIONS } from '.';
import createAsyncAction from './async.action';
import { ACTION_PREFIXES } from './types.action';

const loginByToken = (token) =>
  createAsyncAction(ACTION_PREFIXES.LOGIN, {}, client, 'me', { token });

const login = ({ username, password }) => 
  createAsyncAction(ACTION_PREFIXES.LOGIN, { username, password }, authLogin, { username, password });

const register = ({ username, password }) =>
  createAsyncAction(ACTION_PREFIXES.REGISTER, { username, password }, authRegister, { username, password });

const logout = () => ({
  type: AUTHENTICATION_ACTIONS.LOGOUT,
});

export {
  login,
  logout,
  register,
  loginByToken,
};
