import creatAsyncAction from './async.action';
import { axiosClient } from 'utils/api-client';
import { ACTION_PREFIXES } from './types.action';

const getBooks = (query = '') =>
  creatAsyncAction(ACTION_PREFIXES.GET_BOOKS, {}, axiosClient.get, `books?query=${encodeURIComponent(query)}`);

const getBook = (bookId) => 
  creatAsyncAction(ACTION_PREFIXES.GET_BOOK, { bookId }, axiosClient.get, `books/${bookId}`);

export {
  getBook,
  getBooks,
};
