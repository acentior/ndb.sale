import * as ActionTypes from "./constants"

export const reducer = (state, action) => {
    const dispatch = state.dispatch
    if (typeof action === "function") {
        action(dispatch)
        return
    }

    switch (action.type) {
        case ActionTypes.SET_USER_INFO:
            return {
                ...state,
                user: action.payload,
            }

        default:
            return state
    }
}
