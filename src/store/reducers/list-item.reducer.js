import produce from 'immer';
import { LIST_ITEMS_ACTIONS } from 'store/actions';
import { notification } from 'utils/notification';

const initialState = {
  listItems: undefined,
  isLoading: false,
  isUpdating: false,
};

const listItemReducer = produce((state, action) => {
  switch(action.type) {
    // Get list items
    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_REQUEST:
      state.isLoading = true;
      break;

    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_SUCCESS:
      const { listItems } = action.data;
      state.listItems = listItems;
      state.isLoading = false;
      break;

    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_FAILURE:
      state.error = { message: action.payload.message };
      state.isLoading = false;
      break;

    // Add list item
    case LIST_ITEMS_ACTIONS.ADD_LIST_ITEM_REQUEST:
      state.isUpdating = true;
      break;

    case LIST_ITEMS_ACTIONS.ADD_LIST_ITEM_SUCCESS:
      state.isUpdating = false;
      state.listItems.push(action.data.listItem);
      break;

    case LIST_ITEMS_ACTIONS.ADD_LIST_ITEM_FAILURE:
      notification.error(LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_FAILURE, action.payload.message);
      state.isUpdate = false;
      break;

    // Update list item
    case LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_REQUEST:
      state.isUpdating = true;
      break;

    case LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_SUCCESS:
      const { listItem } = action.data;
      state.listItems = state.listItems.map((li) => {
        if (listItem.id === li.id) {
          return { ...li, ...listItem };
        };

        return li;
      });
      state.isUpdating = false;
      break;

    case LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_FAILURE:
      notification.error(LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_FAILURE, action.payload.message);
      state.isUpdating = false;
      break;

    // Remove list item
    case LIST_ITEMS_ACTIONS.REMOVE_LIST_ITEM_REQUEST:
      state.isUpdating = true;
      break;

    case LIST_ITEMS_ACTIONS.REMOVE_LIST_ITEM_SUCCESS:
      const { id } = action.payload;
      state.listItems = state.listItems.filter((li) => li.id !== id);
      state.isUpdating = false;
      break;

    case LIST_ITEMS_ACTIONS.REMOVE_LIST_ITEM_FAILURE:
      notification.error(LIST_ITEMS_ACTIONS.REMOVE_LIST_ITEM_FAILURE, action.payload.message);
      state.isUpdating = false;
      break;

    default:
      break;
  }
}, initialState);

export default listItemReducer;
