import React, { useEffect } from 'react';
import store from './configureStore';
import { Provider } from 'react-redux';
import * as storage from 'utils/storage';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAsync } from 'utils/hooks';
import { FullPageSpinner } from 'components/lib';
import { loadBootstrapData } from './actions/async.action';

const AppProviders = ({ children }) => {
  const { isLoading, run } = useAsync();

  useEffect(() => {
    (async () => {
      const token = await storage.getToken();
      if (token) {
        run(store.dispatch(loadBootstrapData()));
      }
    })();
  }, [run]);

  if (isLoading) {
    return (<FullPageSpinner />);
  }

  return (
    <Router>
      <Provider store={store}>
        {children}
      </Provider>
    </Router>
  );
}

export default AppProviders;
