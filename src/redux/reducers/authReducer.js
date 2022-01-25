import * as types from "../actionTypes";

const initailState = {
  isAuthenticated: false,
  user: {}
};

export const authReducer = (state = initailState, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...action.payload};
    case types.LOGOUT_USER:
      return { ...state, ...initailState };
    default:
      return state;
  }
};