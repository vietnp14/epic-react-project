import produce from 'immer';
import { AUTHENTICATION_ACTIONS } from "store/actions";

const initialState = {
  user: undefined,
  token: undefined,
  isLoading: false,
};

const authenticationReducer = produce((state, action) => {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.LOGIN_REQUEST:
      state.error = null;
      state.isLoading = true;
      break;

    case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
      state.user = action.data.user;
      state.isLoading = false;
      break;

    case AUTHENTICATION_ACTIONS.LOGIN_FAILURE:
      state.error = { message: action.payload.message };
      state.isLoading = false;
      break;

    case AUTHENTICATION_ACTIONS.REGISTER_REQUEST:
      state.error = null;
      state.isLoading = true;
      break;

    case AUTHENTICATION_ACTIONS.REGISTER_SUCCESS:
      state.user = action.data;
      state.isLoading = false;
      break;

    case AUTHENTICATION_ACTIONS.REGISTER_FAILURE:
      state.error = { message: action.payload.message };
      state.isLoading = false;
      break;

    default:
      break;
  }
}, initialState);

export default authenticationReducer;
