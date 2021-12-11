import React, { createContext, useContext, useReducer } from "react"
import { reducer } from "./reducer"

const defaultState = {
    user: { userId: null, userEmail: null, token: "", remember: false },
}

export const store = createContext(defaultState)

export const ApplicationContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState, (state) => state)

    return <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
}

export const useDispatch = () => {
    const value = useContext(store)
    return value.dispatch
}

export const useSelector = (selectorFn) => {
    const value = useContext(store)
    return selectorFn(value.state)
}
