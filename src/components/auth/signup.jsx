import React, { useReducer } from "react"
import { Link, navigate } from "gatsby"
import Select from "react-select"
import validator from "validator"
import AuthLayout from "../common/AuthLayout"
import { FormInput } from "../common/FormControl"
import CustomSpinner from "../common/custom-spinner"
import * as GraphQL from "../../apollo/graghqls/mutations/Auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { countries, passwordValidatorOptions, social_links } from "../../utilities/staticData"
import termsAndConditionsFile from "../../assets/files/NDB Coin Auction - Terms and Conditions.pdf"
import PasswordEyeIcon from "../common/password-eye-icon"
import { useMutation } from "@apollo/client"
import { ROUTES } from "../../utilities/routes"

const Singup = () => {
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        email: "",
        pwd: "",
        pwdConfirm: "",
        agree: "",
        country: countries[0],

        pwdVisible: false,
        pwdConfirmVisible: false,

        emailError: "",
        pwdError: "",
        pwdConfirmError: "",
        agreeError: "",
        result: "",
    })

    const {
        email,
        pwd,
        pwdConfirm,
        agree,
        country,

        pwdVisible,
        pwdConfirmVisible,

        emailError,
        pwdError,
        pwdConfirmError,
        agreeError,
        result,
    } = state

    const [signupMutation, { loading }] = useMutation(GraphQL.SIGNUP, {
        onCompleted: (data) => {
            setState({ result: data?.signup })
            if (data?.signup === "Already verified")
                navigate(ROUTES.signIn + "error.Already verified")
            else navigate(ROUTES.verifyEmail + email)
        },
    })

    const signUserUp = (e) => {
        e.preventDefault()
        setState({ emailError: "", pwdError: "", pwdConfirmError: "", agreeError: "" })
        let error = false
        if (!email || !validator.isEmail(email)) {
            setState({ emailError: "Invalid email address" })
            error = true
        }
        if (!pwd || !validator.isStrongPassword(pwd, passwordValidatorOptions)) {
            setState({
                pwdError:
                    "Password must contain at least 8 characters, including UPPER/lowercase and numbers!",
            })
            error = true
        }
        if (!agree) {
            setState({ agreeError: "Please agree to terms and conditions" })
            error = true
        }
        if (!pwdConfirm || pwd !== pwdConfirm)
            setState({ pwdConfirmError: "Password doest not match it's repeat!" })
        if (!error) signupMutation({ variables: { email, password: pwd, country } })
    }

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
                        onChange={(e) => setState({ email: e.target.value })}
                        placeholder="Enter email"
                        error={emailError}
                    />
                </div>
                <div className="row">
                    <div className="form-group col-md-6 mb-0 position-relative">
                        <FormInput
                            type={pwdVisible ? "text" : "password"}
                            label="Password"
                            value={pwd}
                            onChange={(e) => setState({ pwd: e.target.value })}
                            placeholder="Enter password"
                        />
                        <PasswordEyeIcon
                            passwordVisible={pwdVisible}
                            setPasswordVisible={(res) => setState({ pwdVisible: res })}
                            styles={{
                                right: "18px",
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6 mb-0 position-relative">
                        <FormInput
                            type={pwdConfirmVisible ? "text" : "password"}
                            label="Password confirmation"
                            value={pwdConfirm}
                            onChange={(e) => setState({ pwdConfirm: e.target.value })}
                            placeholder="Enter password"
                        />
                        <PasswordEyeIcon
                            passwordVisible={pwdConfirmVisible}
                            setPasswordVisible={(res) => setState({ pwdConfirmVisible: res })}
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
                        onChange={(v) => setState({ country: v })}
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
                            onChange={() => setState({ agree: !agree })}
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
                    {result.length > 0 && result !== "Success" && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {result}
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
                        disabled={loading}
                    >
                        <div className={`${loading ? "opacity-1" : "opacity-0"}`}>
                            <CustomSpinner />
                        </div>
                        <div className={`${loading ? "ms-3" : "pe-4"}`}>sign up with email</div>
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

export default Singup
