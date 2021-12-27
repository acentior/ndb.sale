const initailState = {
  isAuthenticated: false,
  user: {}
};

export const authReducer = (state = initailState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, ...action.payload};
    case 'LOGOUT_USER':
      return { ...state, ...initailState };
    default:
      return state;
  }
};