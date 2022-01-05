import validator from "validator"
import Loading from "../common/Loading"
import { Link, navigate } from "gatsby"
import AuthLayout from "../common/AuthLayout"
import { ROUTES } from "../../utilities/routes"
import { FormInput } from "../common/FormControl"
import React, { useState, useEffect } from "react"
import CustomSpinner from "../common/custom-spinner"
import { useResetPassword } from "../../apollo/model/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { passwordValidatorOptions } from "../../utilities/staticData"
import PasswordEyeIcon from "../common/password-eye-icon"

const ForgetPassword = () => {
    // Containers
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [resetPasswordMutation, resetPasswordResults] = useResetPassword()
    // Methods
    const changePasswordMethod = (e) => {
        e.preventDefault()
        setError("")
        if (!password || !confirmPassword || !token)
            return setError("Please fill out all the fields!")
        if (!validator.isStrongPassword(password, passwordValidatorOptions)) {
            return setError(
                "Password must contain at least 8 characters, including UPPER/lowercase and numbers!"
            )
        }
        if (password !== confirmPassword) return setError("Password doest not match it's repeat!")

        resetPasswordMutation(email, token, password)
    }
    useEffect(() => {
        if ("FORGOT_PASSWORD_EMAIL" in localStorage) {
            const tempEmail = localStorage.getItem("FORGOT_PASSWORD_EMAIL")
            setLoading(false)
            return setEmail(tempEmail)
        }
        return navigate(ROUTES.forgotPassword)
    }, [])
    const pending = resetPasswordResults?.loading
    const webserviceError = resetPasswordResults?.data?.resetPassword === "Failed"

    if (resetPasswordResults?.data?.resetPassword === "Success") navigate(ROUTES.signIn)
    if (loading) return <Loading />
    return (
        <AuthLayout>
            <h3 className="signup-head mb-4">Change password</h3>
            <form className="form">
                <div className="form-group">
                    <FormInput
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Activation Code"
                        label="Activation Code"
                    />
                </div>
                <div className="form-group position-relative">
                    <FormInput
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter New Password"
                        label="Enter New Password"
                    />
                    <PasswordEyeIcon
                        passwordVisible={passwordVisible}
                        setPasswordVisible={setPasswordVisible}
                    />
                </div>
                <div className="form-group position-relative">
                    <FormInput
                        type={confirmPasswordVisible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        label="Confirm Password"
                    />
                    <PasswordEyeIcon
                        passwordVisible={confirmPasswordVisible}
                        setPasswordVisible={setConfirmPasswordVisible}
                    />
                </div>
                <div className="mb-3 mt-5">
                    {error && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                        </span>
                    )}
                    {webserviceError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> Invalid or expired sent
                            code!
                        </span>
                    )}
                    <button
                        type="submit"
                        className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2"
                        disabled={pending}
                        onClick={changePasswordMethod}
                    >
                        <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                            <CustomSpinner />
                        </div>
                        <div className={`${pending ? "ms-3" : "pe-4"}`}>submit</div>
                    </button>
                </div>
                <div className="form-group text-white mb-3">
                    <span className="signup-text-link">Didn't receive an email? </span>
                    <Link className="signup-link" to={ROUTES.forgotPassword}>
                        Send again
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default ForgetPassword
