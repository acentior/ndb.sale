const initialState = {
  page: 1,
  limit: 10,
  total: 0
};

export const paginationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'PAGINATION_SET_LIMIT':
      return { ...state, limit: action.payload, page: 1 };
    case 'PAGINATION_SET_PAGE':
      return { ...state, page: action.payload };
    case 'FETCH_SESSIONS_DATA':
      return { ...state, total: action.payload.totalNum };
    case 'INITIALIZE_PAGE':
    case 'SET_SEARCH_KEYWORD':
      return { ...state, ...initialState };
    case 'SESSION_DELETED':
      state.total = state.total - 1;
      return { ...state };
    default:
      return state;
  }
};