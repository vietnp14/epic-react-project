/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { useEffect } from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { client } from 'utils/api-client'
import { useAsync } from 'utils/hooks'
import * as colors from 'styles/colors'
import { FullPageSpinner } from 'components/lib'

const getUser = async () => {
  const token = await auth.getToken();
  if (token) {
    const { user } = await client('me', { token });
    return user;
  }

  return null;
};

function App() {
  const { data: user, error, isLoading, isIdle, isError, isSuccess, run, setData } = useAsync()

  useEffect(() => {
    run(getUser());
  }, [run]);

  const login = form => auth.login(form).then(user => setData(user));

  const register = form => auth.register(form).then(user => setData(user));

  const logout = () => {
    auth.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    );
  }
}

export { App };
