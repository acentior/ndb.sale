import { SET_USER_INFO } from "./constants"

export const setUserInfo = (info) => ({
    type: SET_USER_INFO,
    payload: info,
})
