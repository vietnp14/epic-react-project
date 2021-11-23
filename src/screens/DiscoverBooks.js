/** @jsx jsx */
import {jsx} from '@emotion/core'

import { useEffect, useState } from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import * as colors from 'styles/colors'
import BookRow from 'components/BookRow'
import {BookListUL, Spinner, Input} from 'components/lib'
import Profiler from 'components/Profiler'
import { useBooksState } from 'store/selectors'
import { getBooks } from 'store/actions'
import { useDispatch } from 'react-redux'
import { notification } from 'utils/notification'
import { BOOK_ACTIONS } from 'store/actions'
import { loadingBooks } from 'utils/loadingConstants'

function DiscoverBooks() {
  const dispatch = useDispatch();
  const [bookState, setBookState] = useState({ loading: false, data: null, error: null });
  const [query, setQuery] = useState('');
  const [queried, setQueried] = useState();
  const { data: books } = useBooksState();

  const isLoading = bookState.loading;
  const isSuccess = !!bookState.data;
  const isError = !!bookState.error;
  const error = bookState.error;
  const data = !books && isLoading ? loadingBooks : books;

  useEffect(() => {
    (async () => {
      setBookState({ loading: true, data: null, error: null });
      const { error, data } = await dispatch(getBooks(query));

      if (!!error) {
        setBookState({ loading: false, error });
        notification.error(BOOK_ACTIONS.GET_BOOKS_FAILURE, error.message);
      } else {
        setBookState({ loading: false, data });
      }
    })()
  }, [dispatch, query]);

  function handleSearchClick(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            css={{width: '100%'}}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
                }}
              >
                {isLoading ? (
                  <Spinner />
                ) : isError ? (
                  <FaTimes aria-label="error" css={{color: colors.danger}} />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </form>

        {isError ? (
          <div css={{color: colors.danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {queried ? null : (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : isSuccess && books.length ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && !books.length ? (
              <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
        {data?.length ? (
          <Profiler
            id="Discover Books Screen Book List"
            metadata={{query, bookCount: data.length}}
          >
            <BookListUL css={{marginTop: 20}}>
              {data.map(book => (
                <li key={book.id} aria-label={book.title}>
                  <BookRow key={book.id} book={book} />
                </li>
              ))}
            </BookListUL>
          </Profiler>
        ) : queried ? (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : (
              <p>
                Hmmm... I couldn't find any books with the query "{query}."
                Please try another.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DiscoverBooks;
