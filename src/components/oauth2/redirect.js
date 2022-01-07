/* eslint-disable */
import React from "react"
import { navigate } from "gatsby"
import {
    setUser,
    getUser,
    getEmailfromTempToken
} from "../../utilities/auth"

const OAuth2RedirectHandler = (props) => {

    const type = props.type
    const dataType = props.dataType
    const data = props.data

    if (type === "success") {
        if (data) {
            let email;
            let twoStep = [];
            for (let i in data.split("*")) {
                const d = data.split("*")[i];
                if (i === "0") email = d
                else twoStep.push({ key: d, value: true })
            }
            setUser({
                ...getUser(),
                tempToken: dataType,
                email: email,
                twoStep: twoStep,
            })
            navigate("/app/onetime-pwd")
        } else {
            navigate("/app/signin")
        }
    } else {
        if (dataType === "No2FA") {
            setUser({
                ...getUser(),
                email: data,
            })
            navigate(`/app/verify-email/1`)
        }
        else {
            navigate(`/app/signin/${dataType}.${data}`)
        }
    }

    return <></>
}

export default OAuth2RedirectHandler
