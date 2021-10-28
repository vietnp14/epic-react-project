import produce from 'immer';
const initialState = {
};

const listItemReducer = produce((state, action) => {
  switch(action.type) {
    case '1':
      return state;
    default:
      return state;
  }
}, initialState);

export default listItemReducer;
