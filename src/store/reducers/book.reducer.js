import produce from 'immer';
import { combineReducers } from 'redux';
import { BOOK_ACTIONS } from 'store/actions';

const initialBooks = {
  data: undefined,
  isLoading: false,
  message: undefined,
  error: undefined
};

const initialBook = {
  data: undefined,
  isLoading: false,
  isUpdating: false,
  error: undefined,
}

const booksReducer = produce((books, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.GET_BOOKS_REQUEST:
      books.isLoading = true;
      books.data = null;
      books.error = null;
      break;

    case BOOK_ACTIONS.GET_BOOKS_SUCCESS:
      const { books: data } = action.payload;
      books.data = data;
      books.isLoading = false;
      break;

    case BOOK_ACTIONS.GET_BOOKS_FAILURE:
      const { message } = action.payload;
      books.error = { message };
      books.isLoading = false;
      break;

    default:
      break;
  }
}, initialBooks);

const currentBook = produce((book, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.SET_CURRENT_BOOK:
      const { book: newBook } = action.payload;
      book.data = newBook;
      break;

    case BOOK_ACTIONS.GET_BOOK_REQUEST:
      book.data = null;
      book.isLoading = true;
      book.error = null;
      break;

    case BOOK_ACTIONS.GET_BOOK_SUCCESS:
      const { book: currentBook } = action.payload;
      book.data = currentBook;
      book.isLoading = false;
      break;

    case BOOK_ACTIONS.GET_BOOK_FAILURE:
      const { message } = action.payload;
      book.error = { message };
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
