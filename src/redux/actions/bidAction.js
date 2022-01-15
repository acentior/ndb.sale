import { BID_PLACE, SET_CURRENCY } from "../actionTypes"

export const setBidInfo = (state) => (dispatch) => {
    dispatch({
        type: BID_PLACE,
        payload: {
            place_bid: state,
        },
    })
}
export const setCurrencyInfo = (currencyId) => dispatch => {
    dispatch({
        type: SET_CURRENCY,
        payload: currencyId
    })
}