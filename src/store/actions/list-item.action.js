import doAsyncAction from './async.action';
import { axiosClient } from 'utils/api-client';
import { ACTION_PREFIXES } from './types.action';

const getListItems = () =>
  doAsyncAction(ACTION_PREFIXES.GET_LIST_ITEMS, {}, axiosClient.get, 'list-items');

const addListItem = (bookId) =>
  doAsyncAction(ACTION_PREFIXES.ADD_LIST_ITEM, { bookId }, axiosClient.post, 'list-items', { bookId });

const updateListItem = (updates) =>
  doAsyncAction(ACTION_PREFIXES.UPDATE_LIST_ITEM, updates, axiosClient.put, `list-items/${updates.id}`, updates);

const removeListItem = ({ id }) =>
  doAsyncAction(ACTION_PREFIXES.REMOVE_LIST_ITEM, { id }, axiosClient.delete, `list-items/${id}`);

export {
  getListItems,
  addListItem,
  updateListItem,
  removeListItem,
};
