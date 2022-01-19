import { PAGINATION_SET_PAGE } from "../actionTypes";

export const set_Page = (page = 1, limit = 5) => dispatch => {
    dispatch({
        type: PAGINATION_SET_PAGE,
        payload: { page, limit }
    })
};