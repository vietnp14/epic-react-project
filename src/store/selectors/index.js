import { useSelector } from 'react-redux';

const useAuthenticationState = () => useSelector((state) => state.authentication);
const useListItemsState = () => useSelector((state) => state.listItems);

export {
  useAuthenticationState,
  useListItemsState,
};
