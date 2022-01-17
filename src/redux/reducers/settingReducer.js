import { GET_USER_TIERS } from "../actionTypes";

export const userTierReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_USER_TIERS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};