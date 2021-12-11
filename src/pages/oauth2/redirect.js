/* eslint-disable */

import React, { useEffect, useMemo } from "react"
import { navigate } from "gatsby"
import { useDispatch, useSelector } from "../../context/store"
import * as Actions from "../../context/actions"

const OAuth2RedirectHandler = (props) => {
    const getUrlParameter = (name) => {
        name = name.replace(/\[]/, "\\[").replace(/[\]]/, "\\]")
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")

        var results = regex.exec(props.location.search)
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
    }

    const dispatch = useDispatch()
    const userData = useSelector((state) => state?.user)
    const token = useMemo(() => getUrlParameter("token"), [])

    console.log("user: ", userData)
    useEffect(() => {
        if (token) {
            dispatch(Actions.setUserInfo({ ...userData, token }))
            navigate("/onetime-pwd")
        } else {
            navigate("/signin")
        }
    }, [token])

    return <></>
}

export default OAuth2RedirectHandler
