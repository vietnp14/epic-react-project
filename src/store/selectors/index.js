import { useSelector } from 'react-redux';
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const useBooksState = () => useSelector((state) =>
  ({ ...state.book.books, ...(!state.book.books.data && { data: loadingBooks }) })
);

const useBook = (bookId) => useSelector((state) =>
  state.book.books.data?.find((b) => b.id === bookId) || loadingBook
);

const useCurrentBook = () => useSelector((state) =>
  ({ ...state.book.book, ...(!state.book.book.data && { data: loadingBook }) })
);

const useListItem = (bookId) =>
  useSelector((state) => state.listItem.listItems.find((l) => l.bookId === bookId));

const useListItemsState = () => useSelector((state) => state.listItem);

const useAuthenticationState = () => useSelector((state) => state.authentication);

export {
  useBook,
  useCurrentBook,
  useListItem,
  useBooksState,
  useListItemsState,
  useAuthenticationState,
};
