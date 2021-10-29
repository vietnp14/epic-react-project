import produce from 'immer';
import { combineReducers } from 'redux';
import { BOOK_ACTIONS } from 'store/actions';
import { notification } from 'utils/notification';

const initialBooks = {
  data: undefined,
  isLoading: false,
};

const initialBook = {
  data: undefined,
  isLoading: false,
  isUpdating: false,
}

const booksReducer = produce((books, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.GET_BOOKS_REQUEST:
      books.isLoading = true;
      books.data = null;
      books.error = null;
      break;

    case BOOK_ACTIONS.GET_BOOKS_SUCCESS:
      const { books: data } = action.data;
      books.data = data;
      books.isLoading = false;
      break;

    case BOOK_ACTIONS.GET_BOOKS_FAILURE:
      const { message } = action.payload;
      notification.error(BOOK_ACTIONS.GET_BOOKS_FAILURE, message);
      books.isLoading = false;
      break;

    default:
      break;
  }
}, initialBooks);

const currentBook = produce((book, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.GET_BOOK_REQUEST:
      book.data = null;
      book.isLoading = true;
      break;

    case BOOK_ACTIONS.GET_BOOK_SUCCESS:
      const { book: currentBook } = action.data;
      book.data = currentBook;
      book.isLoading = false;
      break;

    case BOOK_ACTIONS.GET_BOOK_FAILURE:
      const { message } = action.payload;
      notification.error(BOOK_ACTIONS.GET_BOOK_FAILURE, message);
      book.isLoading = false;
      break;

    default:
      break;
  }
}, initialBook);

const bookReducer = combineReducers({
  book: currentBook,
  books: booksReducer,
});

export default bookReducer;
