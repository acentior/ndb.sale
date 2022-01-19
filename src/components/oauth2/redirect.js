import React, { useEffect, useReducer } from "react"
import { navigate } from "gatsby"
import AuthLayout from "../common/AuthLayout"
import VerifyMutliFA from "../auth/verify-multiFA"
import TwoFactorModal from "../profile/two-factor-modal"
import { ROUTES } from "../../utilities/routes"
const OAuth2RedirectHandler = ({ type, dataType, data }) => {

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        email: "", twoStep: [], tempToken: "", tfaOpen: false, success: false
    })
    const { email, twoStep, tempToken, tfaOpen, success } = state

    useEffect(() => {
        if (type === "success") {
            if (data) {
                let email
                let twoStep = []
                for (let i in data.split("*")) {
                    const d = data.split("*")[i]
                    if (i === "0") email = d
                    else twoStep.push({ key: d, value: true })
                }
                setState({
                    tempToken: dataType,
                    email: email,
                    twoStep: twoStep,
                })
            } else {
                navigate("/app/signin")
            }
        } else {
            if (dataType === "No2FA") {
                setState({ email: data, tfaOpen: true })
            }
            else {
                navigate(`/app/signin/${dataType}.${data}`)
            }
        }
    }, [type, dataType, data])

    return (
        <AuthLayout>
            {success &&
                <VerifyMutliFA
                    twoStep={twoStep}
                    email={email}
                    tempToken={tempToken}
                    returnToSignIn={() => navigate(ROUTES.signIn)}
                />}
            <TwoFactorModal
                is2FAModalOpen={tfaOpen}
                setIs2FAModalOpen={(res) => {
                    if (!res) navigate(ROUTES.signIn)
                    setState({ tfaOpen: res })

                }}
                email={email}
                twoStep={twoStep}
                onResult={(r) => {
                    if (r) {
                        setState({ tfaOpen: false })
                        navigate(ROUTES.signIn)
                    }
                    else
                        navigate(ROUTES.verifyFailed)
                }}
            />
        </AuthLayout>
    )
}

export default OAuth2RedirectHandler
