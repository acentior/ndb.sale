import React, { useReducer, useState } from "react"
import { Link, navigate } from "gatsby"
import validator from "validator"
import { passwordValidatorOptions, social_links } from "../../utilities/staticData"
import { FormInput } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
import CustomSpinner from "../common/custom-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { ROUTES } from "../../utilities/routes"
import PasswordEyeIcon from "../common/password-eye-icon"
import * as GraphQL from "../../apollo/graghqls/mutations/Auth"
import { useMutation } from "@apollo/client"
import VerifyMutliFA from "./verify-multiFA"
import TwoFactorModal from "../profile/two-factor-modal"

const Signin = ({ error }) => {
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        email: "",
        pwd: "",
        remember: false,
        emailError: "",
        pwdError: "",
        authError: false,
        pwdVisible: false,
        tempToken: "",
        twoStep: [],
        tfaOpen: false,
    })

    const {
        email,
        pwd,
        remember,
        emailError,
        pwdError,
        authError,
        pwdVisible,
        tempToken,
        twoStep,
        tfaOpen,
    } = state

    const [success, setSuccess] = useState(false)

    const [signinMutation, { loading }] = useMutation(GraphQL.SIGNIN, {
        retry: 1,
        onCompleted: (data) => {
            console.log("signin data", data)
            setState({ tempToken: data.signin.token, twoStep: data.signin.twoStep })

            if (data.signin.status === "Failed") {
                setState({ authError: true })
                setSuccess(false)
                if (data.signin.token === "Please set 2FA.") {
                    //Open select 2FA modal
                    setState({ tfaOpen: true })
                } else if (data.signin.token === "Please verify your email.") {
                    navigate(ROUTES.verifyEmail + email)
                }
            } else if (data.signin.status === "Success") {
                setSuccess(true)
            }
        },
    })

    // Methods
    const signUserIn = (e) => {
        e.preventDefault()
        setState({ emailError: "", pwdError: "" })
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

        if (!error)
            signinMutation({
                variables: {
                    email,
                    password: pwd,
                },
            })
    }

    return (
        <AuthLayout>
            <TwoFactorModal
                is2FAModalOpen={tfaOpen}
                setIs2FAModalOpen={(res) => setState({ tfaOpen: res })}
                email={email}
                twoStep={twoStep}
                onResult={(r) => {
                    if (r) {
                        setState({ tfaOpen: false, authError: false })
                    } else navigate(ROUTES.verifyFailed)
                }}
            />
            {success ? (
                <VerifyMutliFA
                    twoStep={twoStep}
                    email={email}
                    tempToken={tempToken}
                    returnToSignIn={() => setSuccess(false)}
                />
            ) : (
                <>
                    <h3 className="signup-head">Sign in</h3>
                    <form className="form">
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
                        <div className="form-group position-relative">
                            <FormInput
                                type={pwdVisible ? "text" : "password"}
                                label="Password"
                                value={pwd}
                                onChange={(e) => setState({ pwd: e.target.value })}
                                placeholder="Enter password"
                                error={pwdError}
                            />
                            <PasswordEyeIcon
                                passwordVisible={pwdVisible}
                                setPasswordVisible={(res) => setState({ pwdVisible: res })}
                            />
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center mb-5">
                            <label className="d-flex align-items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    value={remember}
                                    className="form-check-input"
                                    onChange={() => setState({ remember: !remember })}
                                />
                                <div className="keep-me-signed-in-text">
                                    Keep me signed in in this device
                                </div>
                            </label>
                            <Link className="txt-green forget-pwd" to={ROUTES.forgotPassword}>
                                Forgot password?
                            </Link>
                        </div>
                        {authError && (
                            <span className="errorsapn">
                                <FontAwesomeIcon icon={faExclamationCircle} /> {tempToken}
                            </span>
                        )}
                        {error && error.split(".")[0] === "InvalidProvider" && (
                            <span className="errorsapn">
                                <FontAwesomeIcon icon={faExclamationCircle} /> Your are already
                                signed up with{" "}
                                <span className="text-uppercase errorsapn">
                                    {error.split(".")[1]}
                                </span>
                                . Please use it.
                            </span>
                        )}
                        {error && error.split(".")[0] === "error" && (
                            <span className="errorsapn">
                                <FontAwesomeIcon icon={faExclamationCircle} /> {error.split(".")[1]}
                            </span>
                        )}
                        <button
                            type="submit"
                            className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2"
                            disabled={loading}
                            onClick={signUserIn}
                        >
                            <div className={`${loading ? "opacity-1" : "opacity-0"}`}>
                                <CustomSpinner />
                            </div>
                            <div className={`${loading ? "ms-3" : "pe-4"}`}>sign in</div>
                        </button>
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
                        Do not have an account?{" "}
                        <Link to="/app/signup" className="signup-link">
                            Sign up
                        </Link>
                    </p>
                </>
            )}
        </AuthLayout>
    )
}

export default Signin
