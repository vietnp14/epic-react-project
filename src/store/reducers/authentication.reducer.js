import produce from 'immer';
import { AUTHENTICATION_ACTIONS } from "store/actions";

const initialState = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

const authenticationReducer = produce((state, action) => {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.LOGIN_REQUEST:
      state.error = null;
      state.isLoading = true;
      break;

    case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
      state.user = action.payload.user;
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
      state.user = action.payload.user;
      state.isLoading = false;
      break;

    case AUTHENTICATION_ACTIONS.REGISTER_FAILURE:
      state.error = { message: action.payload.message };
      state.isLoading = false;
      break;

    case AUTHENTICATION_ACTIONS.RESET_AUTH_ERROR_MESSAGE:
      state.error = null;
      break;

    default:
      break;
  }
}, initialState);

export default authenticationReducer;
