import produce from 'immer';
import { AUTHENTICATION_ACTIONS } from "store/actions";
import { notification } from 'utils/notification';

const initialState = {
  user: undefined,
  token: undefined,
  isLoading: false,
};

const authenticationReducer = produce((state, action) => {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.LOGIN_REQUEST:
    case AUTHENTICATION_ACTIONS.REGISTER_REQUEST:
      state.isLoading = true;
      break;

    case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
      state.user = action.data.user ?? action.data;
      state.isLoading = false;
      notification.success(AUTHENTICATION_ACTIONS.LOGIN_SUCCESS, `Welcome ${state.user.username}. Have a nice day!`);
      break;

    case AUTHENTICATION_ACTIONS.REGISTER_SUCCESS:
      state.user = action.data;
      notification.success(AUTHENTICATION_ACTIONS.REGISTER_SUCCESS, `Welcome ${state.user.username}. Have a nice day!`);
      state.isLoading = false;
      break;

    case AUTHENTICATION_ACTIONS.LOGIN_FAILURE:
    case AUTHENTICATION_ACTIONS.REGISTER_FAILURE:
      const { message } = action.payload;
      notification.error('Authentication Failure', message);
      state.isLoading = false;
      break;

    default:
      break;
  }
}, initialState);

export default authenticationReducer;
