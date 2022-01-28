import { LOGIN_SUCCESS, LOGOUT_USER } from "../actionTypes";
import { GET_USER } from "../../apollo/graghqls/querys/Auth"
import { client } from './../../apollo/client';

export const logOutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    });
};

export const setCurrentAuthInfo = authInfo => dispatch => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            isAuthenticated: true,
            user: authInfo
        }
    });
};

export const getAuthInfo = () => async dispatch => {
    try {
        // console.log("getAuthino")
        const { data } = await client.query({
            query: GET_USER
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                isAuthenticated: true,
                user: data.getUser
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}
