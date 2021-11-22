import produce from 'immer';
import { combineReducers } from 'redux';
import { BOOK_ACTIONS } from 'store/actions';

const initialBooks = {
  data: null,
};

const initialBook = {
  data: null,
}

const booksReducer = produce((books, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.GET_BOOKS_REQUEST:
      books.data = null;
      break;

    case BOOK_ACTIONS.GET_BOOKS_SUCCESS:
      const { books: data } = action.data;
      books.data = data;
      break;

    default:
      break;
  }
}, initialBooks);

const currentBook = produce((book, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.GET_BOOK_REQUEST:
      book.data = null;
      break;

    case BOOK_ACTIONS.GET_BOOK_SUCCESS:
      const { book: currentBook } = action.data;
      book.data = currentBook;
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
