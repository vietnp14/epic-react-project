/** @jsx jsx */
import {jsx} from '@emotion/core'

import { useEffect, useState } from 'react';
import {BookListUL, Spinner} from './lib'
import BookRow from './BookRow'
import Profiler from './Profiler'
import { useListItemsState } from 'store/selectors'
import { getListItems, LIST_ITEMS_ACTIONS } from 'store/actions';
import { useDispatch } from 'react-redux';
import { notification } from 'utils/notification';

function ListItemList({ filterListItems, noListItems, noFilteredListItems }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { listItems } = useListItemsState();

  const filteredListItems = listItems.filter(filterListItems);

  useEffect(() => {
    (async () => {
      const { error } = await dispatch(getListItems());

      if (!!error) {
        notification.error(LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_FAILURE, error.message);
      }
      setIsLoading(false);
    })();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div css={{width: '100%', margin: 'auto', textAlign: 'center'}}>
        <Spinner />
      </div>
    );
  }

  if (!listItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
    );
  };

  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
    <Profiler
      id="List Item List"
      metadata={{listItemCount: filteredListItems.length}}
    >
      <BookListUL>
        {filteredListItems.map(listItem => (
          <li key={listItem.id} aria-label={listItem.book.title}>
            <BookRow book={listItem.book} />
          </li>
        ))}
      </BookListUL>
    </Profiler>
  )
}

export default ListItemList;
