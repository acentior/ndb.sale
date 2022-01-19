import { BID_PLACE, SET_CURRENCY, SET_CURRENT_ROUND_ID } from "../actionTypes"

export const setBidInfo = (bid_amount) => (dispatch) => {
    dispatch({
        type: BID_PLACE,
        payload: bid_amount,
    })
}

export const setCurrencyInfo = (currencyId) => (dispatch) => {
    dispatch({
        type: SET_CURRENCY,
        payload: currencyId,
    })
}

export const setCurrentRound = (round_id) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_ROUND_ID,
        payload: round_id,
    })
}
