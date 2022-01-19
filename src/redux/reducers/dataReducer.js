import { FETCH_DATA, UPDATE_DATUM } from './../actionTypes';

export const dataReducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return { ...state, ...action.payload };
    case UPDATE_DATUM:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
