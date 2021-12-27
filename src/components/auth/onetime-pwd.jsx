import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { Input } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
import { useSignIn2FA } from "../../apollo/model/auth"
import { getUser } from "../../utilities/auth"
import CustomSpinner from "../common/custom-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const OnetimePassword = () => {
    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState("")
    const user = getUser()

    if (!user.tempToken) navigate("/app/signin")

    const [signin2faMutation, signin2faMutationResults] = useSignIn2FA()

    const confirmCodeClick = (e) => {
        e.preventDefault()
        let error = false
        setCodeError("")

        if (!code || code.length === 0) {
            setCodeError("Invalid Code.")
            error = true
        }
        if (!error) signin2faMutation(user.email, user.tempToken, code)
    }

    const pending = signin2faMutationResults.loading
    const webserviceError = signin2faMutationResults?.data?.confirm2FA?.status === "Failed"

    return (
        <AuthLayout>
            <h3 className="signup-head mb-5">One-Time Password</h3>
            <form className="form">
                <div className="form-group">
                    <Input
                        name="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter code"
                    />
                    {codeError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {codeError}
                        </span>
                    )}
                </div>
                <div className="form-group text-white">
                    Didn't receive your code?{" "}
                    <Link className="signup-link" to="#">
                        Send again
                    </Link>
                </div>
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
