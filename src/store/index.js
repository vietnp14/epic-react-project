import React, { useEffect } from 'react';
import store from './configureStore';
import { Provider } from 'react-redux';
import * as auth from 'auth-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { useAsync } from 'utils/hooks';
import { FullPageSpinner } from 'components/lib';
import { loadBootstrapData } from './actions/async.action';

const AppProviders = ({ children }) => {
  const { isLoading, run } = useAsync();

  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
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
        <NotificationContainer />
      </Provider>
    </Router>
  );
}

export default AppProviders;
