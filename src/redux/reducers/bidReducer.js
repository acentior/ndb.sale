import { BID_PLACE, SET_CURRENCY } from "../actionTypes"

const initailState = {
    place_bid: 1,
    currencyId: 0
}

export const bidReducer = (state = initailState, action) => {
    switch (action.type) {
        case BID_PLACE:
            return { ...state, ...action.payload }
        case SET_CURRENCY:
            return { ...state, currencyId: action.payload }
        default:
            return state
    }
}
