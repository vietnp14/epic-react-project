/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { useCallback } from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from './lib'
import { useListItem } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { addListItem, removeListItem, updateListItem } from 'store/actions'

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
  const {isLoading, isError, error, run, reset} = useAsync();

  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
}

function StatusButtons({ book }) {
  const dispatch = useDispatch();
  const listItem = useListItem(book.id);

  const handleUpdateClick = useCallback((updates) => dispatch(updateListItem(updates)), [dispatch]);

  const handleRemoveClick = useCallback((item) => dispatch(removeListItem(item)), [dispatch]);

  const handleAddClick = useCallback(({ bookId }) => dispatch(addListItem(bookId)), [dispatch]);

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Mark as unread"
            highlight={colors.yellow}
            onClick={() => handleUpdateClick({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => handleUpdateClick({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => handleRemoveClick({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => handleAddClick({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  );
}

export default StatusButtons;
