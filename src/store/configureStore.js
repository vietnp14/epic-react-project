import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';

const isDevEnvironment = process.env.NODE_ENV === 'development';
const composeEnhancers = (isDevEnvironment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const loggerMiddleware = (store) => (next) =>{
  if (!console.group) {
    return next;
  };

  return (action) => {
    console.group(action.type);
    console.log('%c Prev state', 'color: red', store.getState());
    console.log('%c Action', 'color: blue', action);
    const returnValue = next(action);

    console.log('%c Next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};

const asyncMiddleware = (_) => (next) => (action) => {
  if (typeof action === 'function') return action(next);
  return next(action);
};

const middlewares = [
  asyncMiddleware,
  ...(isDevEnvironment && [loggerMiddleware]),
] ;

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(...middlewares),
  )
);

export default store;
