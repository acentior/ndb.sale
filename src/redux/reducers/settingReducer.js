import { GET_USER_TIERS, UPDATE_USER_TIER, DELETE_USER_TIER, CREATE_USER_TIER } from "../actionTypes";

export const userTierReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_USER_TIERS:
            return { ...state, ...action.payload };
        case CREATE_USER_TIER:
        case UPDATE_USER_TIER:
            return { ...state, [action.payload.level]: action.payload };
        case DELETE_USER_TIER:
            delete state[action.payload];
            return { ...state };
        default:
            return state;
    }
};