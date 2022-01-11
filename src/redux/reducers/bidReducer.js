import { BID_PLACE } from "../actionTypes"

const initailState = {
    place_bid: 1,
}

export const bidReducer = (state = initailState, action) => {
    switch (action.type) {
        case BID_PLACE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
