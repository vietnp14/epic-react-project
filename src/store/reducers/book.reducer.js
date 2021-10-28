import produce from 'immer';
const initialState = {
  currentBook: undefined,
  books: [],
  isLoading: false,
  isUpdating: false,
  errMessage: undefined,
};

const bookReducer = produce((state, action) => {
  switch (action.type) {
    case '1':
      return state;
    default:
      return state
  }
}, initialState);

export default bookReducer;
