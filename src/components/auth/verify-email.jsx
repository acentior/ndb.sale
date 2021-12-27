import React, { useCallback, useEffect, useReducer, useState } from "react"
import { Link, navigate } from "gatsby"
import { Input } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
import Modal from "react-modal"
import { CloseIcon } from "../../utilities/imgImport"
import { useMutation } from "@apollo/client"
import {
    VERIFY_ACCOUNT,
    RESEND_VERIFY_CODE,
    REQUEST_2FA,
    CONFIRM_REQUEST_2FA,
} from "../../apollo/graghqls/mutations/Auth"
import { 
    getUser,
    setUser
} from "../../utilities/auth"

const two_factors = [
    { label: "Authenticator App", method: "app" },
    { label: "SMS", method: "phone" },
    { label: "Email", method: "email" },
]

const VerifyEmail = () => {
    const user = getUser()

    useEffect(() => {
        console.log("verify_email user", user)
        if (!user?.email) navigate("/app/signup")
    }, [user])

    const getVerify = () => {
        const temp = user?.isVerify
        setUser({
            ...getUser(),
            isVerify: null
        })
        return temp;
    }

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        code: "",
        tfaModal: getVerify(),
        result_code: "",
        choose_type: 0,
        set_type: -1,
    })
    const { code, tfaModal, result_code, choose_type, set_type } = state

    const [qrcode, setQRCode] = useState("")

    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])

    const [verifyAccount] = useMutation(VERIFY_ACCOUNT, {
        onCompleted: (data) => {
            if (data.verifyAccount === "Failed") navigate("/app/verify-failed")
            else if (data.verifyAccount === "Success") setState({ tfaModal: true })
        },
    })

    const [resendVerifyCode] = useMutation(RESEND_VERIFY_CODE, {
        onCompleted: (data) => {
            // do something here to show resend email result.
        },
    })

    const [request2FA] = useMutation(REQUEST_2FA, {
        onCompleted: (data) => {
            setQRCode(data.request2FA)
            setState({ set_type: choose_type })
        },
    })
    const [confirmRequest2FA] = useMutation(CONFIRM_REQUEST_2FA, {
        onCompleted: (data) => {
            console.log("confirm2FA", data)
            if (data.confirmRequest2FA === "Failed") navigate("/app/verify-failed")
            else if (data.confirmRequest2FA === "Success") navigate("/app/signin")
        },
    })
    return (
        <AuthLayout>
            <h3 className="signup-head mb-5">Verify email</h3>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    verifyAccount({
                        variables: {
                            email: user.email,
                            code: code,
                        },
                    })
                }}
            >
                <div className="form-group">
                    <Input
                        type="text"
                        name="code"
                        value={code}
                        onChange={handleInput}
                        placeholder="Enter code"
                    />
                </div>
                <div className="form-group text-white">
                    Didn’t receive your code?{" "}
                    <Link
                        className="txt-green signup-link"
                        to="#"
                        onClick={() =>
                            resendVerifyCode({
                                variables: {
                                    email: user.email,
                                },
                            })
                        }
                    >
                        Send again
                    </Link>
                </div>
                <button type="submit" className="btn-primary w-100 text-uppercase my-5">
                    Confirm code
                </button>
            </form>
            <p className="text-white text-center">
                Return to{" "}
                <Link to="/app/signup" className="signup-link">
                    Sign up
                </Link>
            </p>
            <Modal
                isOpen={tfaModal}
                onRequestClose={() => setState({ tfaModal: false })}
                ariaHideApp={false}
                className="twoFA-modal"
                overlayClassName="2fa-modal__overlay"
            >
                <div className="tfa-modal__header">
                    <div
                        onClick={() => setState({ tfaModal: false })}
                        onKeyDown={() => setState({ tfaModal: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <div className="twoFA-modal__body">
                    {set_type === -1 ? (
                        <div className="tfa-select">
                            <h3>Protect your account with 2-step verification</h3>
                            <p className="mt-4 mb-5">
                                Each time you log in, in addition to your password, you will enter a
                                one-time code you receive via text message or generate using an
                                authenticator app.
                            </p>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                {two_factors.map((item, idx) => (
                                    <button
                                        key={idx}
                                        className={`btn-primary mb-2 select-tfa ${
                                            choose_type === idx && "active"
                                        }`}
                                        onClick={() => setState({ choose_type: idx })}
                                    >
                                        {item.label}
                                    </button>
                                ))}

                                <button
                                    className="btn-primary next-step mt-4"
                                    onClick={() =>
                                        request2FA({
                                            variables: {
                                                email: user.email,
                                                method: two_factors[choose_type].method,
                                                phone: "123456789",
                                            },
                                        })
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="get-code">
                            {set_type === 0 && (
                                <>
                                    <h3>Get codes from authenticator app</h3>
                                    <div className="mt-3">
                                        <p className="fw-bolder">STEP 1</p>
                                        <p className="step1-label">
                                            Scan the QR code below or mannually type the secret key
                                            into your authenticator app.
                                        </p>
                                        <img src={qrcode} alt="qr code" />
                                        <p>
                                            <small className="fw-bold">123456xxxx</small>
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="fw-bolder">STEP 2</p>
                                        <p className="mt-2 mb-3">
                                            Enter 6-digit code you see in your authentificator app
                                        </p>
                                    </div>
                                </>
                            )}

                            {set_type === 1 && (
                                <>
                                    <h3>Get codes via SMS</h3>
                                    <p className="mt-3 pb-3">
                                        Enter 6-digit code you got via text messages
                                    </p>
                                </>
                            )}

                            {set_type === 2 && (
                                <>
                                    <h3>Get codes via Email</h3>
                                    <p className="mt-3 pb-3">
                                        Enter 6-digit code you got via email
                                    </p>
                                </>
                            )}

                            <div className="mt-5">
                                <Input
                                    type="text"
                                    name="result_code"
                                    value={result_code}
                                    onChange={handleInput}
                                    placeholder="000-000"
                                />
                                <button
                                    className="btn-primary next-step"
                                    onClick={() =>
                                        confirmRequest2FA({
                                            variables: {
                                                email: user.email,
                                                code: result_code,
                                            },
                                        })
                                    }
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </AuthLayout>
    )
}

export default VerifyEmail
