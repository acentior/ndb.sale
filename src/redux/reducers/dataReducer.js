export const searchReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_SEARCH_KEYWORD':
      return action.payload;
    case 'INITIALIZE_PAGE':
      return '';
    default:
      return state;
  }
};

export const sessionsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_SESSIONS_DATA':
      return action.payload.sessions;
    case 'INITIALIZE_SESSIONS':
      return {};
    case 'SESSION_DELETED':
      delete state[action.payload];
      return {...state};
    default:
      return state;
  }
};

export const joinedSessionIdReducer = (state = '', action) => {
  switch(action.type) {
    case 'SELECTE_JOIN_SESSION':
      return action.payload;
    default:
      return state;
  }
};

export const joinedSessionReducer = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_JOINED_SESSIOIN_DATA':
      return action.payload;
    case 'ADD_PANDL_ANSWER':
      if(!state.answers) state.answers = [];
      state.answers.push(action.payload);
      return {...state};
    default:
      return state;
  }
};

