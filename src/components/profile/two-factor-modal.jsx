import React, { useCallback, useReducer, useState } from "react"
import { navigate } from "gatsby"
import { Input } from "../common/FormControl"
import Modal from "react-modal"
import { CloseIcon } from "../../utilities/imgImport"
import { useMutation } from "@apollo/client"
import { REQUEST_2FA, CONFIRM_REQUEST_2FA } from "../../apollo/graghqls/mutations/Auth"
import { getUser, setUser } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input"
import en from "react-phone-number-input/locale/en.json"
import "react-phone-number-input/style.css"

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
        <option value="">{labels.ZZ}</option>
        {getCountries().map((country) => (
            <option key={country} value={country}>
                {labels[country]}
            </option>
        ))}
    </select>
)

const two_factors = [
    { label: "Authenticator App", method: "app" },
    { label: "SMS", method: "phone" },
    { label: "Email", method: "email" },
]
const initial = {
    result_code: "",
    choose_type: 0,
    set_type: -1,
    input_mobile: false,
    mobile: "",
}

export default function TwoFactorModal({ is2FAModalOpen, setIs2FAModalOpen }) {
    const user = getUser()
    const [qrcode, setQRCode] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), initial)

    const { result_code, choose_type, set_type, input_mobile, mobile } = state

    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])

    const [request2FA] = useMutation(REQUEST_2FA, {
        onCompleted: (data) => {
            setQRCode(data.request2FA)
            setState({ set_type: choose_type })
        },
    })
    const [confirmRequest2FA] = useMutation(CONFIRM_REQUEST_2FA, {
        onCompleted: (data) => {
            if (data.confirmRequest2FA === "Failed") {
                user.isVerify = false
                setUser(user)
                navigate(ROUTES.verifyFailed)
            } else if (data.confirmRequest2FA === "Success") {
                user.isVerify = true
                setUser(user)
                navigate(ROUTES.signIn)
            }
        },
    })
    const sendRequest2FA = () => {
        request2FA({
            variables: {
                email: user.email,
                method: two_factors[choose_type].method,
                phone: mobile,
            },
        })
    }
    const closeModal = () => {
        setIs2FAModalOpen(false)
        setState(initial)
    }
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
                        <div className="input_mobile">
                            <h3>Connect Mobile</h3>
                            <p className="mt-3 pb-3">You will recive a sms code to the number</p>
                            <div className="form-group">
                                <div className="mobile-input-field">
                                    <CountrySelect
                                        className="form-control"
                                        labels={en}
                                        name="countrySelect"
                                        onChange={(c) => {
                                            const code = `+${getCountryCallingCode(c)} `
                                            setCountry(code)
                                            setState({
                                                mobile: code,
                                            })
                                        }}
                                    />
                                    <Input
                                        type="text"
                                        value={mobile}
                                        onChange={(e) => {
                                            const input = e.target.value
                                            setState({
                                                mobile: country + input.substr(country.length),
                                            })
                                        }}
                                    />
                                </div>
                                <p>You will receive a sms code to the number above</p>
                                <button
                                    className="btn-primary next-step mt-4"
                                    onClick={() => sendRequest2FA()}
                                >
                                    Confirm Number
                                </button>
                            </div>
                        </div>
                    ) : (
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
                                    onClick={() => {
                                        if (two_factors[choose_type].method === "phone") {
                                            setState({ input_mobile: true })
                                        } else {
                                            sendRequest2FA()
                                        }
                                    }}
                                >
                                    Next
                                </button>
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
                                placeholder="000-000"
                            />
                            <button
                                className="btn-primary next-step"
                                onClick={() =>
                                    confirmRequest2FA({
                                        variables: {
                                            email: user.email,
                                            method: two_factors[choose_type].method,
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
    )
}
