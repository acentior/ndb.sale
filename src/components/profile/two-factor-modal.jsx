import React, { useCallback, useReducer, useState, useEffect } from "react"
import { navigate } from "gatsby"
import { Input } from "../common/FormControl"
import Modal from "react-modal"
import { CloseIcon } from "../../utilities/imgImport"
import { useMutation } from "@apollo/client"
import { REQUEST_2FA, DISABLE_2FA, CONFIRM_REQUEST_2FA } from "../../apollo/graghqls/mutations/Auth"
import { ROUTES } from "../../utilities/routes"
import CustomSpinner from "../common/custom-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

import "react-phone-number-input/style.css"
import ConnectMobile from "./connect-mobile"

const two_factors = [
    { label: "Authenticator App", method: "app" },
    { label: "SMS", method: "phone" },
    { label: "Email", method: "email" },
]
const initial = {
    result_code: "",
    selected: 0,
    set_type: -1,
    input_mobile: false,
    loading: false,
    error: false,
}

export default function TwoFactorModal({
    is2FAModalOpen,
    setIs2FAModalOpen,
    email,
    phone,
    twoStep,
    updateUser,
}) {
    const [qrcode, setQRCode] = useState("")
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), initial)
    const { result_code, selected, set_type, input_mobile, loading, error } = state

    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])

    useEffect(() => {
        setState({ loading: false })
    }, [twoStep])

    const [request2FA] = useMutation(REQUEST_2FA, {
        onCompleted: (data) => {
            setQRCode(data.request2FA)
            setState({ set_type: selected })
        },
    })

    // This will be only trigger on Profile page
    const [disable2FA] = useMutation(DISABLE_2FA, {
        onCompleted: (data) => {
            updateUser()
        },
    })

    const [confirmRequest2FA, { loading: confirmLoading }] = useMutation(CONFIRM_REQUEST_2FA, {
        onCompleted: (data) => {
            console.log("confirm Request 2FA", data)
            if (data.confirmRequest2FA === "Failed") {
                navigate(ROUTES.verifyFailed)
            } else if (data.confirmRequest2FA === "Success") {
                updateUser()
                navigate(ROUTES.signIn)
            }
        },
    })

    const sendRequest2FA = (i, mobile = "") => {
        console.log("Two : ", two_factors[i].method)
        setState({ loading: true })
        request2FA({
            variables: {
                email,
                method: two_factors[i].method,
                phone: mobile,
            },
        })
    }
    const closeModal = () => {
        setIs2FAModalOpen(false)
        setState(initial)
    }

    console.log("loading", loading)
    return (
        <Modal
            isOpen={is2FAModalOpen}
            onRequestClose={() => closeModal()}
            ariaHideApp={false}
            className="twoFA-modal"
            overlayClassName="2fa-modal__overlay"
        >
            <div className="tfa-modal__header">
                <div
                    onClick={() => closeModal()}
                    onKeyDown={() => closeModal()}
                    role="button"
                    tabIndex="0"
                >
                    <img width="14px" height="14px" src={CloseIcon} alt="close" />
                </div>
            </div>
            <div className="twoFA-modal__body">
                {set_type === -1 ? (
                    input_mobile ? (
                        <ConnectMobile confirm={(number) => sendRequest2FA(1, number)} />
                    ) : (
                        <div className="tfa-select">
                            <h3>Protect your account with 2-step verification</h3>
                            <p className="mt-4 mb-5">
                                Each time you log in, in addition to your password, you will enter a
                                one-time code you receive via text message or generate using an
                                authenticator app.
                            </p>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                {two_factors.map((item, idx) => {
                                    const enable = !!twoStep ? twoStep.includes(item.method) : false
                                    return (
                                        <div key={idx} className="tfa-line">
                                            <div className="tfa-line_labels">
                                                <p className="tfa-line_labels_type">{item.label}</p>
                                                {enable && (
                                                    <p className="tfa-line_labels_preview">
                                                        {item.method === "phone" && phone
                                                            ? "*******" + phone.slice(-3)
                                                            : ""}
                                                        {item.method === "email" &&
                                                            email.slice(0, 2) +
                                                                "***@***" +
                                                                email.slice(-2)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="tfa-line_buttons">
                                                {enable ? (
                                                    <>
                                                        <button className="tfa-line_buttons_change">
                                                            Change
                                                        </button>
                                                        <button
                                                            className="btn-primary select-tfa d-flex align-items-center justify-content-center"
                                                            onClick={() => {
                                                                setState({
                                                                    selected: idx,
                                                                    loading: true,
                                                                })
                                                                disable2FA({
                                                                    variables: {
                                                                        method: item.method,
                                                                    },
                                                                })
                                                            }}
                                                        >
                                                            <div
                                                                className={`${
                                                                    selected === idx && loading
                                                                        ? "opacity-1"
                                                                        : "opacity-0"
                                                                }`}
                                                            >
                                                                <CustomSpinner />
                                                            </div>
                                                            <div
                                                                className={`${
                                                                    selected === idx && loading
                                                                        ? "ms-3"
                                                                        : "pe-4"
                                                                }`}
                                                            >
                                                                Disable
                                                            </div>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="btn-primary select-tfa d-flex align-items-center justify-content-center enable"
                                                        onClick={() => {
                                                            setState({ selected: idx })
                                                            if (item.method === "phone") {
                                                                setState({ input_mobile: true })
                                                            } else {
                                                                sendRequest2FA(idx)
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            className={`${
                                                                selected === idx && loading
                                                                    ? "opacity-1"
                                                                    : "opacity-0"
                                                            }`}
                                                        >
                                                            <CustomSpinner color="black" />
                                                        </div>
                                                        <div
                                                            className={`${
                                                                selected === idx && loading
                                                                    ? "ms-3"
                                                                    : "pe-4"
                                                            }`}
                                                        >
                                                            Enable
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                ) : (
                    <div className="get-code">
                        {set_type === 0 && (
                            <>
                                <h3>Get codes from authenticator app</h3>
                                <div className="mt-3">
                                    <p className="fw-bolder">STEP 1</p>
                                    <p className="step1-label">
                                        Scan the QR code below or mannually type the secret key into
                                        your authenticator app.
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
                                <p className="mt-3 pb-3">Enter 6-digit code you got via email</p>
                            </>
                        )}

                        <div className="mt-5">
                            <Input
                                type="text"
                                name="result_code"
                                value={result_code}
                                onChange={handleInput}
                                placeholder="000 000"
                            />
                            <div className="result_code_error">
                                {error && (
                                    <span className="errorsapn">
                                        <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                                        {"Please input confirm code"}
                                    </span>
                                )}
                            </div>
                            <button
                                className="btn-primary next-step d-flex align-items-center justify-content-center"
                                onClick={() => {
                                    if (!result_code.length) setState({ error: true })
                                    else
                                        confirmRequest2FA({
                                            variables: {
                                                email,
                                                method: two_factors[selected].method,
                                                code: result_code,
                                            },
                                        })
                                }}
                            >
                                <div className={`${confirmLoading ? "opacity-1" : "opacity-0"}`}>
                                    <CustomSpinner />
                                </div>
                                <div className={`${confirmLoading ? "ms-3" : "pe-4"}`}>Confirm</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}
