/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { useEffect } from 'react';
import {BookListUL} from './lib'
import {BookRow} from './book-row'
import {Profiler} from './profiler'
import { useListItemsState } from 'store/selectors'
import { useDispatch } from 'react-redux';
import { getListItems } from 'store/actions';

function ListItemList({filterListItems, noListItems, noFilteredListItems}) {
  const dispatch = useDispatch();
  const { listItems, isLoading } = useListItemsState();

  const filteredListItems = listItems.filter(filterListItems)

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
