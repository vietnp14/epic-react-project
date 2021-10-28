import produce from 'immer';
import { BOOK_ACTIONS } from 'store/actions';
const initialState = {
  currentBook: undefined,
  books: [],
  isLoading: false,
  isUpdating: false,
  errMessage: undefined,
};

const bookReducer = produce((state, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.GET_BOOKS_REQUEST:
      state.isLoading = true;
      break;

    case BOOK_ACTIONS.GET_BOOKS_SUCCESS:
      state.isLoading = false;
      state.books = action.payload.books;
      break;

    case BOOK_ACTIONS.GET_BOOKS_FAILURE:
      state.isLoading = false;
      state.errMessage = action.payload.message;
      break;

    case BOOK_ACTIONS.SET_CURRENT_BOOK:
      const { bookId } = action.payload;
      state.currentBook = state.books.find((b) => b.id === bookId);
      break;

    default:
      break;
  }
}, initialState);

export default bookReducer;
