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

const doAsyncAction = (prefix, payload, request, ...args) => async (dispatch) => {
  dispatch(createRequestAction(prefix, payload));

  try {
    const result = await request(...args);
    dispatch(createSuccessAction(prefix, result));
  } catch (err) {
    dispatch(createFailureAction(prefix, err))
  }
};

export default doAsyncAction;
