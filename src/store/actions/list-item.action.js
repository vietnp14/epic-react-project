import creatAsyncAction from './async.action';
import { axiosClient } from 'utils/api-client';
import { ACTION_PREFIXES } from './types.action';

const resetListItemError = () => ({
  type: ACTION_PREFIXES.RESET_LIST_ITEM_ERROR,
});

const getListItems = () =>
  creatAsyncAction(ACTION_PREFIXES.GET_LIST_ITEMS, {}, axiosClient.get, 'list-items');

const addListItem = (bookId) =>
  creatAsyncAction(ACTION_PREFIXES.ADD_LIST_ITEM, { bookId }, axiosClient.post, 'list-items', { bookId });

const updateListItem = (updates) =>
  creatAsyncAction(ACTION_PREFIXES.UPDATE_LIST_ITEM, updates, axiosClient.put, `list-items/${updates.id}`, updates);

const removeListItem = ({ id }) =>
  creatAsyncAction(ACTION_PREFIXES.REMOVE_LIST_ITEM, { id }, axiosClient.delete, `list-items/${id}`);

export {
  getListItems,
  addListItem,
  updateListItem,
  removeListItem,
  resetListItemError,
};
