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
    dispatch(createSuccessAction(prefix, payload, result));
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    dispatch(createFailureAction(prefix, payload, err));
    return {
      success: false,
      error: err,
    };
  }
};

export const loadBootstrapData = () => async (dispatch) => {
  try {
    const { user, listItems } = await axiosClient('/bootstrap');
    dispatch(createSuccessAction(ACTION_PREFIXES.LOGIN, {}, user));
    dispatch(createSuccessAction(ACTION_PREFIXES.GET_LIST_ITEMS, {}, { listItems }));

    return {
      success: true
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export default createAsyncAction;
