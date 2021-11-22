import React from 'react'
import {FullPageSpinner} from './components/lib'
import { useAuthenticationState } from 'store/selectors'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./Unauthenticated-app'))

function App() {
  const { user } = useAuthenticationState();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
