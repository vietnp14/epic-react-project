/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import debounceFn from 'debounce-fn'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useParams} from 'react-router-dom'
import {formatDate} from 'utils/misc'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
import {Spinner, Textarea} from 'components/lib'
import Rating from 'components/Rating'
import Profiler from 'components/Profiler'
import StatusButtons from 'components/Status-buttons'
import { useCurrentBook, useListItem } from 'store/selectors'
import { BOOK_ACTIONS, LIST_ITEMS_ACTIONS, getBook, updateListItem } from 'store/actions'
import { useDispatch } from 'react-redux'
import { notification } from 'utils/notification'
import { loadingBook } from 'utils/loading-constant'

function BookScreen() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { data: book } = useCurrentBook();
  const listItem = useListItem(bookId);
  const [isLoading, setIsLoading] = useState(true);
  const data = !book && isLoading ? loadingBook : book;
  
  const { title, author, coverImageUrl, publisher, synopsis } = data;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { error } = await dispatch(getBook(bookId));
      if (!!error) {
        notification.error(BOOK_ACTIONS.GET_BOOKS_FAILURE, error.message);
      }
      setIsLoading(false);
    })()
  }, [bookId, dispatch]);

  return (
    <Profiler id="Book Screen" metadata={{bookId, listItemId: listItem?.id}}>
      <div>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gridGap: '2em',
            marginBottom: '1em',
            [mq.small]: {
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{width: '100%', maxWidth: '14rem'}}
          />
          <div>
            <div css={{display: 'flex', position: 'relative'}}>
              <div css={{flex: 1, justifyContent: 'space-between'}}>
                <h1>{title}</h1>
                <div>
                  <i>{author}</i>
                  <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                  <i>{publisher}</i>
                </div>
              </div>
              <div
                css={{
                  right: 0,
                  color: colors.gray80,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  minHeight: 100,
                }}
              >
                {isLoading ? null : <StatusButtons book={book} />}
              </div>
            </div>
            <div css={{marginTop: 10, minHeight: 46}}>
              {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
              {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
            </div>
            <br />
            <p css={{whiteSpace: 'break-spaces', display: 'block'}}>
              {synopsis}
            </p>
          </div>
        </div>
        {!isLoading && listItem ? (
          <NotesTextarea listItem={listItem} />
        ) : null}
      </div>
    </Profiler>
  );
}

function ListItemTimeframe({listItem}) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{marginTop: 6}}>
        <FaRegCalendarAlt css={{marginTop: -2, marginRight: 5}} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({ listItem }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const updateListItemNotes = useCallback(async (updates) => {
    setIsLoading(true);
    const { error } = await dispatch(updateListItem(updates));
    if (!!error) {
      notification.error(LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_FAILURE, error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  const debouncedMutate = useMemo(
    () => debounceFn(updateListItemNotes, {wait: 300}),
    [updateListItemNotes],
  );

  function handleNotesChange(e) {
    debouncedMutate({id: listItem.id, notes: e.target.value})
  };

  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        css={{width: '100%', minHeight: 300}}
      />
    </React.Fragment>
  )
}

export default BookScreen;
