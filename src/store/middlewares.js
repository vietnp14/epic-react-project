import { notification } from 'utils/notification';
import { AUTHENTICATION_ACTIONS, logout } from './actions';
import { ACTION_PREFIXES, ACTION_TYPES } from './actions';
import * as storage from 'utils/storage';

const UNAUTHORIZED_CODE = 401;
const NOTIFICATION_TYPES = [ACTION_TYPES.SUCCESS, ACTION_TYPES.FAILURE];
const AUTHENTICATION_PREFIXES = [ACTION_PREFIXES.LOGIN, ACTION_PREFIXES.LOGOUT, ACTION_PREFIXES.REGISTER];
const BOOK_PREFIXES = [ACTION_PREFIXES.LOGIN, ACTION_PREFIXES.LOGOUT, ACTION_PREFIXES.REGISTER];
const LIST_ITEMS_PREFIXES = [ACTION_PREFIXES.GET_LIST_ITEMS];

const getNotificationTitle = (type) => {
  if (type.startsWith()) {
  }
  
};

const getNotificationFunc = (type) => {
  if (type.includes(NOTIFICATION_TYPES[0])) {
    return notification.success;
  }

  return notification.error;
}

const pushNotification = (action) => {
  const notifyFn = getNotificationFunc(action.type);

  if (action.success) {
  }
}

const notificationMiddleware = _ => next => action => {
  if (NOTIFICATION_TYPES.includes(action.type)) {
    pushNotification(action);
  }

  return next(action);
};

const authMiddleware = ({ dispatch }) => next => action => {
  if (action?.error?.errorCode === UNAUTHORIZED_CODE) {
    dispatch(logout());
    window.location.assign(window.location);
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
  notificationMiddleware,
};
