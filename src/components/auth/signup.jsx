import React, { useState } from "react"
import { Link } from "gatsby"
import Select from "react-select"
import validator from "validator"
import AuthLayout from "../common/AuthLayout"
import { FormInput } from "../common/FormControl"
import CustomSpinner from "../common/custom-spinner"
import { useSignupMutation } from "../../apollo/model/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { countries, passwordValidatorOptions, social_links } from "../../utilities/staticData"
import termsAndConditionsFile from "../../assets/files/NDB Coin Auction - Terms and Conditions.pdf"
import PasswordEyeIcon from "../common/password-eye-icon"

const SingupPage = () => {
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")
    const [agree, setAgree] = useState("")
    const [country, setCountry] = useState(countries[0])
    // password visibility feature
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false)

    const [emailError, setEmailError] = useState("")
    const [pwdError, setPwdError] = useState("")
    const [pwdConfirmError, setPwdConfirmError] = useState("")
    const [agreeError, setAgreeError] = useState("")

    const [signupMutation, signupMutationResults] = useSignupMutation()

    const signUserUp = (e) => {
        e.preventDefault()
        setEmailError("")
        setPwdError("")
        setPwdConfirmError("")
        setAgreeError("")
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
        if (!agree) {
            setAgreeError("Please agree to terms and conditions")
            error = true
        }
        if (!pwdConfirm || pwd !== pwdConfirm)
            setPwdConfirmError("Password doest not match it's repeat!")
        if (!error) signupMutation(email, pwd, country)
    }

    const pending = signupMutationResults.loading
    const signupResult = signupMutationResults?.data?.signup

    return (
        <AuthLayout>
            <h3 className="signup-head mb-4">Create an Account</h3>
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
                    <div className="form-group col-md-6 mb-0 position-relative">
                        <FormInput
                            type={passwordVisible ? "text" : "password"}
                            label="Password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="Enter password"
                        />
                        <PasswordEyeIcon
                            passwordVisible={passwordVisible}
                            setPasswordVisible={setPasswordVisible}
                            styles={{
                                right: "18px",
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6 mb-0 position-relative">
                        <FormInput
                            type={passwordConfirmVisible ? "text" : "password"}
                            label="Password confirmation"
                            value={pwdConfirm}
                            onChange={(e) => setPwdConfirm(e.target.value)}
                            placeholder="Enter password"
                        />
                        <PasswordEyeIcon
                            passwordVisible={passwordConfirmVisible}
                            setPasswordVisible={setPasswordConfirmVisible}
                            styles={{
                                right: "18px",
                            }}
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
                            value={agree}
                            className="form-check-input"
                            onChange={() => setAgree(!agree)}
                        />
                        <div className="keep-me-signed-in-text">
                            Agree to{" "}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={termsAndConditionsFile}
                                className="text-info terms-link"
                            >
                                Terms & Conditions
                            </a>
                        </div>
                    </label>
                </div>
                <div className="mt-3">
                    {signupResult && signupResult !== "Success" && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {signupResult}
                        </span>
                    )}
                    {agreeError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {agreeError}
                        </span>
                    )}
                    <button
                        type="submit"
                        className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2"
                        disabled={pending}
                    >
                        <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                            <CustomSpinner />
                        </div>
                        <div className={`${pending ? "ms-3" : "pe-4"}`}>sign up with email</div>
                    </button>
                </div>
            </form>
            <ul className="social-links">
                {social_links.map((item, idx) => (
                    <li key={idx}>
                        <a href={item.to}>
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
