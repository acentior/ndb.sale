import * as types from './../actionTypes';

export const dataReducer = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_DATA:
      state = action.payload;
      return { ...state };
    case types.UPDATE_DATUM:
      return { ...state, [action.payload.id]: action.payload };
    case types.DELETE_DATUM:
      delete state[action.payload];
      return { ...state };
    default:
      return state;
  }
};
