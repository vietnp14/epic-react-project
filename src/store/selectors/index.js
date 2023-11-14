import { useSelector } from 'react-redux';

const useBooksState = () => useSelector((state) => state.book.books);

const useCurrentBook = () => useSelector((state) => state.book.book);

const useListItem = (bookId) =>
  useSelector((state) => state.listItem?.listItems.find((l) => l.bookId === bookId));

const useListItemsState = () => useSelector((state) => state.listItem);

const useAuthenticationState = () => useSelector((state) => state.authentication);

export {
  useCurrentBook,
  useListItem,
  useBooksState,
  useListItemsState,
  useAuthenticationState,
};
