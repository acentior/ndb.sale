import { FETCH_DATA } from './../actionTypes';

const InitialData = {
  loaded: false,
  data: []
};

export const dataReducer = (state = InitialData, action) => {
  switch(action.type) {
    case FETCH_DATA:
      state.data = [ ...action.payload ];
      return { ...state, loaded: true };
    default:
      return state;
  }
};
