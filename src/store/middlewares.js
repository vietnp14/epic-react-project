import { AUTHENTICATION_ACTIONS, logout } from './actions';
import * as storage from 'utils/storage';

const UNAUTHORIZED_CODE = 401;

const authMiddleware = ({ dispatch }) => next => action => {
  if (action?.error?.errorCode === UNAUTHORIZED_CODE) {
    dispatch(logout());
  }

  switch (action.type) {
    case AUTHENTICATION_ACTIONS.LOGOUT:
      storage.removeStorageKey();
      break;

    case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
      storage.handleUserResponse({ user: action.data });
      break;

    default:
      break;
  }

  return next(action);
};

const loggerMiddleware = store => next => {
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

const asyncMiddleware = _ => next => action => {
  if (typeof action === 'function') return action(next);
  return next(action);
};

export {
  asyncMiddleware,
  loggerMiddleware,
  authMiddleware,
};
