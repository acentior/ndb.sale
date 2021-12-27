import React, { useCallback, useReducer } from "react"
import { Link, navigate } from "gatsby"
import { FormInput, CheckBox } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
// import { useSigninMutation } from "../../apollo/model/auth"
import { useAuth } from "../../hooks/useAuth"

const NewPassword = () => {
    const auth = useAuth()

    if (auth?.isLoggedIn()) {
        navigate("/app/profile")
    }

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        new_pwd: { value: "", error: "" },
        confirm_pwd: { value: "", error: "" },
        remember: false,
    })
    const { new_pwd, confirm_pwd, remember } = state
    const handleNewPwd = useCallback((e) => {
        setState({
            new_pwd: {
                value: e.target.value,
                error: e.target.value.length >= 6 ? "" : "Password length must be at least 6",
            },
        })
    }, [])
    const handleConfirmPwd = useCallback((e) => {
        setState({
            confirm_pwd: {
                value: e.target.value,
                error: e.target.value.length >= 6 ? "" : "Password length must be at least 6",
            },
        })
    }, [])

    const handleRememberChange = useCallback(
        (e) => {
            setState({ remember: !remember })
        },
        [remember]
    )

    // const [signinMutation, signinMutationResults] = useSigninMutation()

    // const disableForm = signinMutationResults.loading

    return (
        <AuthLayout>
            <h3 className="signup-head">New Password</h3>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    // signinMutation(email.value, pwd.value)
                }}
            >
                <div className="form-group ">
                    <FormInput
                        name="new password"
                        type="password"
                        label="New Password"
                        value={new_pwd.value}
                        onChange={handleNewPwd}
                        placeholder="Enter password"
                        error={new_pwd.error}
                    />
                </div>
                <div className="form-group ">
                    <FormInput
                        name="confirm password"
                        type="password"
                        label="Confirm New Password"
                        value={confirm_pwd.value}
                        onChange={handleConfirmPwd}
                        placeholder="Re-enter password"
                        error={confirm_pwd.error}
                    />
                </div>
                <div className="form-group d-flex justify-content-between align-items-center mb-5">
                    <CheckBox
                        name="remember"
                        type="checkbox"
                        value={remember}
                        onChange={handleRememberChange}
                    >
                        Keep me signed in in this device
                    </CheckBox>
                </div>
                <button
                    type="submit"
                    className="btn-primary w-100 text-uppercase"
                    // disabled={disableForm}
                >
                    confirm new password
                </button>
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

export default NewPassword
