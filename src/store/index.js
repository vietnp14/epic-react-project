import React, { useEffect } from 'react';
import store from './configureStore';
import { Provider } from 'react-redux';
import { loginByToken } from './actions';
import * as auth from 'auth-provider';

const AppStoreProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      if (token) {
        store.dispatch(loginByToken(token));
      }
    })();
  }, []);

  return (<Provider store={store}>{children}</Provider>);
}

export default AppStoreProvider;
