import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const loggerMiddleware = (store) => (next) => (action) => {
  console.info('Prev store : ', store.getState());
  console.info('Action : ', action);
  console.info('Next middleware : ', next);
  return next(action);
};

const asyncMiddleware = (_) => (next) => (action) => {
  if (typeof action === 'function') return action(next);
  return next(action);
};

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(
      loggerMiddleware,
      asyncMiddleware
    )
  )
);

export default store;
