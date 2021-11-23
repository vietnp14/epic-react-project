import produce from 'immer';
import { LIST_ITEMS_ACTIONS } from 'store/actions';

const initialState = {
  listItems: null,
};

const listItemReducer = produce((state, action) => {
  switch(action.type) {
    // Get list items
    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_SUCCESS:
      const { listItems } = action.data;
      state.listItems = listItems;
      break;

    // Add list item
    case LIST_ITEMS_ACTIONS.ADD_LIST_ITEM_SUCCESS:
      state.listItems.push(action.data.listItem);
      break;

    // Update list item
    case LIST_ITEMS_ACTIONS.UPDATE_LIST_ITEM_SUCCESS:
      const { listItem } = action.data;
      state.listItems = state.listItems.map((li) => {
        if (listItem.id === li.id) {
          return { ...li, ...listItem };
        };

        return li;
      });
      break;

    // Remove list item
    case LIST_ITEMS_ACTIONS.REMOVE_LIST_ITEM_SUCCESS:
      const { id } = action.payload;
      state.listItems = state.listItems.filter((li) => li.id !== id);
      break;

    default:
      break;
  }
}, initialState);

export default listItemReducer;
