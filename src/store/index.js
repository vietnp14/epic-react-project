import React, { useEffect } from 'react';
import store from './configureStore';
import { Provider } from 'react-redux';
import { loginByToken } from './actions';
import * as auth from 'auth-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

const AppProviders = ({ children }) => {
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      if (token) {
        store.dispatch(loginByToken(token));
      }
    })();
  }, []);

  return (
    <Router>
      <Provider store={store}>
        {children}
        <NotificationContainer />
      </Provider>
    </Router>
  );
}

export default AppProviders;
