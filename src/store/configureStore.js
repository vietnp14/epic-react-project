import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const asyncMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') return action(next);
  return next(action);
}

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(asyncMiddleware)
  )
);

export default store;
