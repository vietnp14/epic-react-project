import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import bookReducer from './book.reducer';
import listItemReducer from './listItem.reducer';

const rootReducers = combineReducers({
  authentication: authenticationReducer,
  book: bookReducer,
  listItem: listItemReducer,
});

export default rootReducers;
