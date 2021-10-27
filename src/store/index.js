import store from './configureStore';
import { Provider } from 'react-redux';

const AppStoreProvider = () => (
  <Provider store={store} />
);

export default AppStoreProvider;