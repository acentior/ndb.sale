import React, { useState } from "react"
import { FormInput } from "../common/FormControl"
import Modal from "react-modal"
import { CloseIcon } from "../../utilities/imgImport"
import { passwordValidatorOptions } from "../../utilities/staticData"
import { useChangePassword } from "../../apollo/model/auth"
import validator from "validator"
import CustomSpinner from "../common/custom-spinner"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ProfileChangePasswordModal({
    isPasswordModalOpen,
    setIsPasswordModalOpen,
}) {
    // Containers
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [changePasswordMutation, changePasswordResults] = useChangePassword()
    const pending = changePasswordResults.loading
    const webserviceError = changePasswordResults?.data?.changePassword === "Failed"
    const successfullRequest = changePasswordResults?.data?.changePassword === "Success"
    // Methods
    const changeUserPassword = (e) => {
        e.preventDefault()
        setPasswordError("")
        setConfirmPasswordError("")
        let error = false
        if (!password || !validator.isStrongPassword(password, passwordValidatorOptions)) {
            setPasswordError(
                "Password must contain at least 8 characters, including UPPER/lowercase and numbers!"
            )
            error = true
        }
        if (
            !confirmPassword ||
            !validator.isStrongPassword(confirmPassword, passwordValidatorOptions)
        ) {
            setConfirmPasswordError(
                "Password must contain at least 8 characters, including UPPER/lowercase and numbers!"
            )
            error = true
        }
        if (confirmPassword !== password) {
            setConfirmPasswordError("Password does not match its repeate!")
            error = true
        }
        if (!error) changePasswordMutation(password)
    }
    return (
        <Modal
            isOpen={isPasswordModalOpen}
            onRequestClose={() => setIsPasswordModalOpen(false)}
            className="pwd-modal"
            overlayClassName="pwd-modal__overlay"
        >
            <div className="pwd-modal__header">
                change your password
                <div
                    onClick={() => setIsPasswordModalOpen(false)}
                    onKeyDown={() => setIsPasswordModalOpen(false)}
                    role="button"
                    tabIndex="0"
                >
                    <img width="14px" height="14px" src={CloseIcon} alt="close" />
                </div>
            </div>
            <form className="form">
                <FormInput
                    name="password"
                    type="password"
                    label="New Password"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                />
                <FormInput
                    name="pwd_confirm"
                    type="password"
                    label="Confirm New Password"
                    value={confirmPassword}
                    placeholder="Re-enter password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                />
                <div className="pwd-modal__footer mt-4">
                    {webserviceError && (
                        <span className="errorsapn">
                            <FontAwesomeIcon icon={faExclamationCircle} /> Something went wrong,
                            Please try again!
                        </span>
                    )}
                    {successfullRequest && (
                        <div className="txt-green text-left">
                            <FontAwesomeIcon icon={faExclamationCircle} /> Password changed
                            successfully!
                        </div>
                    )}
                    <button
                        className="btn-primary w-100 text-uppercase d-flex align-items-center justify-content-center py-2"
                        disabled={pending}
                        onClick={changeUserPassword}
                    >
                        <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                            <CustomSpinner />
                        </div>
                        <div className={`${pending ? "ms-3" : "pe-4"}`}>save</div>
                    </button>
                    <button
                        className="btn-cancel pointer-cursor mx-auto mt-3"
                        onClick={(e) => {
                            e.preventDefault()
                            setIsPasswordModalOpen(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}
