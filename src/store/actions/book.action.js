import createAsyncAction from './async.action';
import { axiosClient } from 'utils/apiClient';
import { ACTION_PREFIXES } from './types.action';

const getBooks = (query = '') =>
  createAsyncAction(ACTION_PREFIXES.GET_BOOKS, {}, axiosClient.get, `books?query=${encodeURIComponent(query)}`);

const getBook = (bookId) => 
  createAsyncAction(ACTION_PREFIXES.GET_BOOK, { bookId }, axiosClient.get, `books/${bookId}`);

export {
  getBook,
  getBooks,
};
