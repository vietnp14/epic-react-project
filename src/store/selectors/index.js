import { useSelector } from 'react-redux';

const useAuthenticationState = () => useSelector((state) => state.authentication);
const useListItemsState = () => useSelector((state) => state.listItem);
const useBookState = () => useSelector((state) => state.book);
const useListItem = (bookId) => useSelector((state) => state.listItem.listItems.find((l) => l.bookId === bookId));

export {
  useListItem,
  useBookState,
  useListItemsState,
  useAuthenticationState,
};
