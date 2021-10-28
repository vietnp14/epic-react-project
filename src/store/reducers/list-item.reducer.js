import produce from 'immer';
import { LIST_ITEMS_ACTIONS } from 'store/actions';

const initialState = {
  listItems: [],
  isLoading: false,
  isUpdating: false,
  error: undefined,
};

const listItemReducer = produce((state, action) => {
  switch(action.type) {
    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_REQUEST:
      state.isLoading = true;
      break;

    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_SUCCESS:
      const { listItems } = action.payload;
      state.listItems = listItems;
      state.isLoading = false;
      break;

    case LIST_ITEMS_ACTIONS.GET_LIST_ITEMS_FAILURE:
      state.error = { message: action.payload.message };
      state.isLoading = false;
      break;

    default:
      break;
  }
}, initialState);

export default listItemReducer;
