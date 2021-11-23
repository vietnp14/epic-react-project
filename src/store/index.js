import React, { useEffect, useState } from 'react';
import store from './configureStore';
import { Provider } from 'react-redux';
import * as storage from 'utils/storage';
import { BrowserRouter as Router } from 'react-router-dom';
import { FullPageSpinner } from 'components/lib';
import { loadBootstrapData } from './actions/async.action';
import { notification } from 'utils/notification';

const AppProviders = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const token = await storage.getToken();
      if (token) {
        const { error } = await store.dispatch(loadBootstrapData());
        if (!!error) {
          notification.error('Get Bootstrap Data', 'Loading bootstrap data failed!');
        }
      }
      setIsLoading(false);
    })();
  }, []);

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
