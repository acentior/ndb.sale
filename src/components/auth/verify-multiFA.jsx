import React, { useState, useReducer } from "react"
import { Link } from "gatsby"
import { Input } from "../common/FormControl"
import { useSignIn2FA } from "../../apollo/model/auth"
import CustomSpinner from "../common/custom-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const VerifyMutliFA = ({ twoStep, tempToken, email, returnToSignIn }) => {
    const [code, setCode] = useReducer((old, action) => ({ ...old, ...action }), {
        app: "",
        phone: "",
        email: "",
    })
    const [codeError, setCodeError] = useState("")

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
                email,
                tempToken,
                twoStep.map((step) => {
                    return {
                        key: step,
                        value: code[step],
                    }
                })
            )
    }

    const pending = signin2faMutationResults.loading
    const webserviceError = signin2faMutationResults?.data?.confirm2FA?.status === "Failed"

    return (
        <>
            <h3 className="signup-head mb-5">Authenticate</h3>
            <form className="form">
                {twoStep &&
                    Array.isArray(twoStep) &&
                    twoStep.map(
                        (step) =>
                            step && (
                                <div key={step}>
                                    <p className="text-uppercase">{step}</p>
                                    <div className="form-group">
                                        <Input
                                            name="code"
                                            type="text"
                                            value={code[step]}
                                            onChange={(e) => setCode({ [step]: e.target.value })}
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
                <Link to="#" className="signup-link" onClick={() => returnToSignIn()}>
                    Sign in
                </Link>
            </p>
        </>
    )
}

export default VerifyMutliFA
