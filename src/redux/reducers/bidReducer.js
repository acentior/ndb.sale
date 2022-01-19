import { BID_PLACE, SET_CURRENCY, SET_CURRENT_ROUND_ID } from "../actionTypes"

const initailState = {
    bid_amount: 1,
    currencyId: 0,
    round_id: 0,
}

export const bidReducer = (state = initailState, action) => {
    switch (action.type) {
        case BID_PLACE:
            return { ...state, bid_amount: action.payload }
        case SET_CURRENCY:
            return { ...state, currencyId: action.payload }
        case SET_CURRENT_ROUND_ID:
            return { ...state, round_id: action.payload }
        default:
            return state
    }
}
