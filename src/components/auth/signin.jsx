import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import validator from "validator"
import { passwordValidatorOptions, social_links } from "../../utilities/staticData"
import { FormInput } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
import { useSigninMutation } from "../../apollo/model/auth"
import { useAuth } from "../../hooks/useAuth"
import CustomSpinner from "../common/custom-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const Signin = () => {
    // Auth Check
    const auth = useAuth()
    if (auth?.isLoggedIn()) navigate("/app/profile")

    // Containers
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [remember, setRemember] = useState(false)

    const [emailError, setEmailError] = useState("")
    const [pwdError, setPwdError] = useState("")

    const [signinMutation, signinMutationResults] = useSigninMutation()

    // Methods
    const signUserIn = (e) => {
        e.preventDefault()
        setEmailError("")
        setPwdError("")
        let error = false
        if (!email || !validator.isEmail(email)) {
            setEmailError("Invalid email address")
            error = true
        }
        if (!pwd || !validator.isStrongPassword(pwd, passwordValidatorOptions)) {
            setPwdError(
                "Password must contain at least 8 characters, including UPPER/lowercase and numbers!"
            )
            error = true
        }

        if (!error) signinMutation(email, pwd)
    }

    const pending = signinMutationResults?.loading
    const webserviceError = signinMutationResults?.data?.signin.status === "Failed"

    return (
        <AuthLayout>
            <h3 className="signup-head">Sign in</h3>
            <form className="form">
                <div className="form-group">
                    <FormInput
                        name="email"
                        type="text"
                        label="Email"
                        value={email.value}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        error={emailError}
                    />
                </div>
                <div className="form-group ">
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        value={pwd.value}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Enter password"
                        error={pwdError}
                    />
                </div>
                <div className="form-group d-flex justify-content-between align-items-center mb-5">
                    <label className="d-flex align-items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember"
                            value={remember}
                            className="form-check-input"
                            onChange={() => setRemember(!remember)}
                        />
                        <div className="keep-me-signed-in-text">
                            Keep me signed in in this device
                        </div>
                    </label>
                    <Link className="txt-green forget-pwd" to="/app/password-reset">
                        Forgot password?
                    </Link>
                </div>
                {webserviceError && (
                    <span className="errorsapn">
                        <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                        {signinMutationResults?.data?.signin.token}
                    </span>
                )}
                <button
                    type="submit"
                    className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2"
                    disabled={pending}
                    onClick={signUserIn}
                >
                    <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                        <CustomSpinner />
                    </div>
                    <div className={`${pending ? "ms-3" : "pe-4"}`}>sign in</div>
                </button>
            </form>
            <ul className="social-links">
                {social_links.map((item, idx) => (
                    <li key={idx}>
                        <a href={`${item.to}/signin`}>
                            <img src={item.icon} alt="icon" />
                        </a>
                    </li>
                ))}
            </ul>
            <p className="text-white text-center">
                Do not have an account?{" "}
                <Link to="/app/signup" className="signup-link">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    )
}

export default Signin
