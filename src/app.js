import React from 'react'
import {FullPageSpinner} from './components/lib'
import { useAuthenticationState } from 'store/selectors'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const { token, isLoading, user } = useAuthenticationState();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {token && !isLoading && user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
