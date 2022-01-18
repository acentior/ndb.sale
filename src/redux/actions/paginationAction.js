import { PAGINATION_SET_PAGE } from "../actionTypes";

export const set_Page = page => dispatch => {
    dispatch({
        type: PAGINATION_SET_PAGE,
        payload: page
    })
};