import React, { useState, useReducer } from "react"
import { Link, navigate } from "gatsby"
import { Input } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
import { useSignIn2FA } from "../../apollo/model/auth"
import { getUser } from "../../utilities/auth"
import CustomSpinner from "../common/custom-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { ROUTES } from "../../utilities/routes"

const OnetimePassword = () => {
    const [code, setCode] = useReducer((old, action) => ({ ...old, ...action }), {
        app: "",
        phone: "",
        email: "",
    })
    const [codeError, setCodeError] = useState("")
    const user = getUser()

    if (!user.tempToken) navigate(ROUTES.signIn)

    const [signin2faMutation, signin2faMutationResults] = useSignIn2FA()

    const confirmCodeClick = (e) => {
        e.preventDefault()
        let error = false
        setCodeError("")

        if (!code || code.length === 0) {
            setCodeError("Invalid Code.")
            error = true
        }
        if (!error)
            signin2faMutation(
                user.email,
                user.tempToken,
                user.twoStep.map((step) => {
                    return {
                        key: step.key,
                        value: code[step.key],
                    }
                })
            )
    }

    const pending = signin2faMutationResults.loading
    const webserviceError = signin2faMutationResults?.data?.confirm2FA?.status === "Failed"

    return (
        <AuthLayout>
            <h3 className="signup-head mb-5">Authenticate</h3>
            <form className="form">
                {user.twoStep &&
                    Array.isArray(user.twoStep) &&
                    user.twoStep.map(
                        (step) =>
                            step.value && (
                                <div key={step.key}>
                                    <p className="text-uppercase">{step.key}</p>
                                    <div className="form-group">
                                        <Input
                                            name="code"
                                            type="text"
                                            value={code[step.key]}
                                            onChange={(e) =>
                                                setCode({ [step.key]: e.target.value })
                                            }
                                            placeholder="Enter code"
                                        />
                                        {codeError && (
                                            <span className="errorsapn">
                                                <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                                                {codeError}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group text-white resend-2fa">
                                        <Link className="signup-link" to="#">
                                            Resend
                                        </Link>
                                    </div>
                                </div>
                            )
                    )}
                <div className="mt-5 mb-2">
                    {webserviceError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                            {signin2faMutationResults?.data?.confirm2FA?.token}
                        </span>
                    )}
                    <button
                        type="submit"
                        className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2"
                        disabled={pending}
                        onClick={confirmCodeClick}
                    >
                        <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                            <CustomSpinner />
                        </div>
                        <div className={`${pending ? "ms-3" : "pe-4"}`}>confirm code</div>
                    </button>
                </div>
            </form>
            <p className="text-white text-center">
                Return to{" "}
                <Link to="/app/signup" className="signup-link">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    )
}

export default OnetimePassword
