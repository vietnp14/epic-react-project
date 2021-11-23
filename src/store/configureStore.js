import { createStore, applyMiddleware, compose } from 'redux';
import { asyncMiddleware, loggerMiddleware, authMiddleware } from './middlewares';
import rootReducers from './reducers';

const isDevEnvironment = process.env.NODE_ENV === 'development';
const composeEnhancers = (isDevEnvironment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [
  asyncMiddleware,
  authMiddleware,
  ...(isDevEnvironment && [loggerMiddleware]),
];

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(...middlewares),
  )
);

export default store;
