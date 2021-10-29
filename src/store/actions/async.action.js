import { ACTION_TYPES } from "./types.action";

const createRequestAction = (prefix, payload) => ({
  type: `${prefix} ${ACTION_TYPES.REQUEST}`,
  payload,
});

const createSuccessAction = (prefix, payload) => ({
  type: `${prefix} ${ACTION_TYPES.SUCCESS}`,
  payload,
});

const createFailureAction = (prefix, { message }) => ({
  type: `${prefix} ${ACTION_TYPES.FAILURE}`,
  payload: {
    message,
  },
});

const creatAsyncAction = (prefix, payload, request, ...args) => async (dispatch) => {
  dispatch(createRequestAction(prefix, payload));

  try {
    const result = await request(...args);
    return dispatch(createSuccessAction(prefix, result));
  } catch (err) {
    return dispatch(createFailureAction(prefix, err))
  }
};

export default creatAsyncAction;
