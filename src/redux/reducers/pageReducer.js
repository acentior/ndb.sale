import { PAGINATION_SET_PAGE, PAGINATION_SET_LIMIT, FETCH_DATA } from './../actionTypes';

const initialState = {
  page: 1,
  limit: 5,
  total: 0
};

export const paginationReducer = (state = initialState, action) => {
  switch(action.type) {
    case PAGINATION_SET_LIMIT:
      return { ...state, limit: action.payload, page: 1 };
    case PAGINATION_SET_PAGE:
      return { ...state, ...action.payload };
    case FETCH_DATA:
      return { ...state, total: Object.keys(action.payload).length };
    default:
      return state;
  }
};