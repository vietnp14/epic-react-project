import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import bookReducer from './book.reducer';
import listItemReducer from './list-item.reducer';

const rootReducers = combineReducers({
  authentication: authenticationReducer,
  listItem: listItemReducer,
  book: bookReducer,
});

export default rootReducers;
