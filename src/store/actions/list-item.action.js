import doAsyncAction from './async.action';
import { axiosClient } from 'utils/api-client';
import { ACTION_PREFIXES } from './types.action';

const getListItems = () =>
  doAsyncAction(ACTION_PREFIXES.GET_LIST_ITEMS, {}, axiosClient.get, 'list-items');

export {
  getListItems,
};
