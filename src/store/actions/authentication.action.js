import { login as authLogin, register as authRegister } from 'auth-provider';
import { client } from 'utils/api-client';
import creatAsyncAction from './async.action';
import { ACTION_PREFIXES } from './types.action';

const loginByToken = (token) =>
  creatAsyncAction(ACTION_PREFIXES.LOGIN, {}, client, 'me', { token });

const login = ({ username, password }) => 
  creatAsyncAction(ACTION_PREFIXES.LOGIN, { username, password }, authLogin, { username, password });

const register = ({ username, password }) =>
  creatAsyncAction(ACTION_PREFIXES.REGISTER, { username, password }, authRegister, { username, password });

export {
  login,
  register,
  loginByToken,
};
