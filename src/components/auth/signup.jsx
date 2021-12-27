import { Link } from "gatsby"
import validator from "validator"
import Select from "react-select"
import AuthLayout from "../common/AuthLayout"
import CustomSpinner from "../common/custom-spinner"
import { FormInput } from "../common/FormControl"
import { useSignupMutation } from "../../apollo/model/auth"
import React, { useState } from "react"
import { countries, passwordValidatorOptions, social_links } from "../../utilities/staticData"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SingupPage = () => {
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")
    const [remember, setRemember] = useState("")
    const [country, setCountry] = useState(countries[0])

    const [emailError, setEmailError] = useState("")
    const [pwdError, setPwdError] = useState("")
    const [pwdConfirmError, setPwdConfirmError] = useState("")

    const [signupMutation, signupMutationResults] = useSignupMutation()

    const signUserUp = (e) => {
        e.preventDefault()
        setEmailError("")
        setPwdError("")
        setPwdConfirmError("")
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
        if (!pwdConfirm || pwd !== pwdConfirm)
            setPwdConfirmError("Password doest not match it's repeat!")
        if (!error) signupMutation(email, pwd, country)
    }

    const pending = signupMutationResults.loading
    const webserviceError = signupMutationResults?.data?.signup.status === "Failed"

    return (
        <AuthLayout>
            <h3 className="signup-head">Create an Account</h3>
            <p className="signup-subhead">
                Create an account to participate in the auction and to start bidding!
            </p>
            <form className="form" onSubmit={signUserUp}>
                <div className="form-group">
                    <FormInput
                        name="email"
                        type="text"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        error={emailError}
                    />
                </div>
                <div className="row">
                    <div className="form-group col-md-6 mb-0">
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="form-group col-md-6 mb-0">
                        <FormInput
                            name="pwd_confirm"
                            type="password"
                            label="Password Confirmation"
                            value={pwdConfirm}
                            onChange={(e) => setPwdConfirm(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    {pwdError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {pwdError}
                        </span>
                    )}
                    {!pwdError && pwdConfirmError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {pwdConfirmError}
                        </span>
                    )}
                </div>
                <div className="form-group mt-3">
                    <p className="form-label">Country of residence</p>
                    <Select
                        options={countries}
                        value={country}
                        id="signup-country-dropdown"
                        onChange={(v) => setCountry(v)}
                        placeholder="Choose country"
                        className="text-left"
                    />
                </div>
                <div className="form-group">
                    <label className="d-flex align-items-center gap-2">
                        <input
                            type="checkbox"
                            name="remember"
                            value={remember}
                            className="form-check-input"
                            onChange={() => setRemember(!remember)}
                        />
                        <div className="keep-me-signed-in-text">
                            Agree to{" "}
                            <Link to="/" className="text-info terms-link">
                                Terms & Conditions
                            </Link>
                        </div>
                    </label>
                </div>
                {webserviceError && (
                    <span className="errorsapn">
                        <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                        {"Your email and password do not match!"}
                    </span>
                )}
                <button
                    type="submit"
                    className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2 mt-3"
                    disabled={pending}
                >
                    <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                        <CustomSpinner />
                    </div>
                    <div className={`${pending ? "ms-3" : "pe-4"}`}>sign up with email</div>
                </button>
            </form>
            <ul className="social-links">
                {social_links.map((item, idx) => (
                    <li key={idx}>
                        <a href={`${item.to}/signup`}>
                            <img src={item.icon} alt="icon" />
                        </a>
                    </li>
                ))}
            </ul>
            <p className="text-white text-center">
                Already have an account?{" "}
                <Link to="/app/signin" className="signup-link">
                    Sign In
                </Link>
            </p>
        </AuthLayout>
    )
}

export default SingupPage
