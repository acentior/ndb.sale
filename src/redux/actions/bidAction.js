import { BID_PLACE } from "../actionTypes"

export const setBidInfo = (state) => (dispatch) => {
    dispatch({
        type: BID_PLACE,
        payload: {
            place_bid: state,
        },
    })
}
