/** @jsx jsx */
import {jsx} from '@emotion/core'

import { useEffect, useMemo } from 'react';
import {BookListUL} from './lib'
import {BookRow} from './book-row'
import {Profiler} from './profiler'
import { useListItemsState } from 'store/selectors'
import { getListItems } from 'store/actions';
import { useDispatch } from 'react-redux';

function ListItemList({ filterListItems, noListItems, noFilteredListItems }) {
  const dispatch = useDispatch();
  const { listItems, isLoading } = useListItemsState();

  const filteredListItems = useMemo(() => listItems.filter(filterListItems), [filterListItems, listItems]);

  useEffect(() => {
    dispatch(getListItems());
  }, [dispatch]);

  /** TODO: Add loading for list items*/
  if (isLoading) {
    return null;
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

export {ListItemList}
