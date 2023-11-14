import createAsyncAction from './async.action';
import { axiosClient } from 'utils/apiClient';
import { ACTION_PREFIXES } from './types.action';

const resetListItemError = () => ({
  type: ACTION_PREFIXES.RESET_LIST_ITEM_ERROR,
});

const getListItems = () =>
  createAsyncAction(ACTION_PREFIXES.GET_LIST_ITEMS, {}, axiosClient.get, 'list-items');

const addListItem = (bookId) =>
  createAsyncAction(ACTION_PREFIXES.ADD_LIST_ITEM, { bookId }, axiosClient.post, 'list-items', { bookId });

const updateListItem = (updates) =>
  createAsyncAction(ACTION_PREFIXES.UPDATE_LIST_ITEM, updates, axiosClient.put, `list-items/${updates.id}`, updates);

const removeListItem = ({ id }) =>
  createAsyncAction(ACTION_PREFIXES.REMOVE_LIST_ITEM, { id }, axiosClient.delete, `list-items/${id}`);

export {
  getListItems,
  addListItem,
  updateListItem,
  removeListItem,
  resetListItemError,
};
