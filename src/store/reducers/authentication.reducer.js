import produce from 'immer';
import { AUTHENTICATION_ACTIONS } from "store/actions";

const initialState = {
  user: null,
};

const authenticationReducer = produce((state, action) => {
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
      state.user = action.data.user ?? action.data;
      break;

    case AUTHENTICATION_ACTIONS.REGISTER_SUCCESS:
      state.user = action.data;
      break;
    
    case AUTHENTICATION_ACTIONS.LOGOUT:
      state.user = null;
      break;

    default:
      break;
  }
}, initialState);

export default authenticationReducer;
