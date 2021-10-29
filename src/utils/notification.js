import { NotificationManager } from 'react-notifications';

const timeOut = 2500;

const notification = {
  info: (title, message) => NotificationManager.info(message, title, timeOut),
  success: (title, message) => NotificationManager.success(message, title, timeOut),
  warning: (title, message) => NotificationManager.warning(message, title, timeOut),
  error: (title, message) => NotificationManager.error(`${message}. Try again later.`, title, timeOut),
};

export { notification };
