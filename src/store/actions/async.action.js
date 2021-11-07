import { axiosClient } from "utils/api-client";
import { ACTION_PREFIXES } from ".";
import { ACTION_TYPES } from "./types.action";

const createRequestAction = (prefix, payload) => ({
  type: `${prefix} ${ACTION_TYPES.REQUEST}`,
  payload,
});

const createSuccessAction = (prefix, payload, data) => ({
  type: `${prefix} ${ACTION_TYPES.SUCCESS}`,
  payload,
  data,
});

const createFailureAction = (prefix, payload, err) => ({
  type: `${prefix} ${ACTION_TYPES.FAILURE}`,
  payload,
  err,
});

const createAsyncAction = (prefix, payload, request, ...args) => async (dispatch) => {
  dispatch(createRequestAction(prefix, payload));

  try {
    const result = await request(...args);
    return dispatch(createSuccessAction(prefix, payload, result));
  } catch (err) {
    dispatch(createFailureAction(prefix, payload, err));
    throw err;
  }
};

export const loadBootstrapData = () => async (dispatch) => {
  try {
    const { user, listItems } = await axiosClient('/bootstrap');
    dispatch(createSuccessAction(ACTION_PREFIXES.LOGIN, {}, user));
    dispatch(createSuccessAction(ACTION_PREFIXES.GET_LIST_ITEMS, {}, { listItems }));
  } catch (err) {
    throw err;
  }
};

export default createAsyncAction;
