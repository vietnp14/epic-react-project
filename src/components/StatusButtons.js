/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { useCallback, useState } from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'
import { useListItem } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { addListItem, LIST_ITEMS_ACTIONS, removeListItem, updateListItem } from 'store/actions'
import { notification } from 'utils/notification'

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
  const [{ error, loading }, setBtnState] = useState({ loading: false, error: null });
  const isError = !!error;

  const handleClick = async () => {
    if (isError) {
      setBtnState({ loading: false, error: null });
      return;
    }

    setBtnState({ loading: true });
    const { error } = await onClick();

    if (!!error) {
      setBtnState({ loading: false, error });
      notification.error(LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_FAILURE, error.message);
    } else {
      setBtnState({ loading: false })
      notification.success(LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_SUCCESS, 'You have updated list item successfully!');
    }
  };

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: loading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={loading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {loading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
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
