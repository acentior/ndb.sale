import * as types from './../actionTypes';

const initialState = {
  page: 1,
  limit: 5,
  total: 0
};

export const paginationReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.PAGINATION_SET_LIMIT:
      return { ...state, limit: action.payload, page: 1 };
    case types.PAGINATION_SET_PAGE:
      return { ...state, ...action.payload };
    case types.FETCH_DATA:
      return { ...state, total: Object.keys(action.payload).length };
    case types.DELETE_DATUM:
      state.total -= 1;
      return { ...state };
    default:
      return state;
  }
};