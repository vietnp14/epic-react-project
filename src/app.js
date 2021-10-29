import React from 'react'
import {FullPageSpinner} from './components/lib'
import { useAuthenticationState } from 'store/selectors'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const { user, isLoading } = useAuthenticationState();

  if (isLoading) {
    return (<FullPageSpinner />);
  };

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
