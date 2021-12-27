const initialState = {};

export const errorsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ERROR':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};