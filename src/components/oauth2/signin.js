/* eslint-disable */
import React, { useEffect, useMemo } from "react"
import { navigate } from "gatsby"
import { 
    setUser,
    getUser,
    getEmailfromTempToken
} from "../../utilities/auth"

const OAuth2RedirectHandler = (props) => {
    
    const token = props.token

    if (token) {
        setUser({
            ...getUser(),
            email: getEmailfromTempToken(token),
            tempToken: token,
        })
        navigate("/app/onetime-pwd")
    } else {
        navigate("/app/signin")
    }

    return <></>
}

export default OAuth2RedirectHandler
