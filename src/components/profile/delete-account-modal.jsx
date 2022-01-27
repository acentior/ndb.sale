import React, { useState } from "react"
import { navigate } from "gatsby"
import Modal from "react-modal"
import { useMutation } from "@apollo/client"
import { logout } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"
import CustomSpinner from "../common/custom-spinner"
import { CONFIRM_DELETE_ACCOUNT } from "../../apollo/graghqls/mutations/Auth"
import { CloseIcon } from "../../utilities/imgImport"

export default function DeleteAccountModal({
    isDeleteAccountModalOpen,
    setIsDeleteAccountModalOpen,
}) {
    const [next, setNext] = useState(false)
    const [text, setText] = useState("")
    const [deleteAccountMutation, deleteAccountMutationResults] = useMutation(
        CONFIRM_DELETE_ACCOUNT,
        {
            onCompleted: () => {
                logout(() => {
                    navigate(ROUTES.home)
                })
            },
            errorPolicy: "ignore",
        }
    )
    const pending = deleteAccountMutationResults?.loading
    const deleteAccount = (e) => {
        e.preventDefault()
        deleteAccountMutation({
            variables: {
                text: text,
            },
        })
    }
    const closeModal = () => {
        setIsDeleteAccountModalOpen(false)
        setNext(false)
    }
    return (
        <Modal
            isOpen={isDeleteAccountModalOpen}
            onRequestClose={() => closeModal()}
            ariaHideApp={false}
            className="delete-account-modal"
            overlayClassName="pwd-modal__overlay"
        >
            <div className="delete-account-modal__header">
                <h4> </h4>
                <div
                    onClick={() => closeModal()}
                    onKeyDown={() => closeModal()}
                    role="button"
                    tabIndex="0"
                >
                    <img width="14px" height="14px" src={CloseIcon} alt="close" />
                </div>
            </div>
            <div className="delete-account">
                {!next ? (
                    <>
                        <h4 className="title">Delete Account</h4>
                        <p className="content-text">
                            To delete your account, please withdraw all your assets from NDB Wallet.
                            <br />
                            Please note deleting process is irreversible.
                        </p>
                        <div>
                            <button className="btn-primary" onClick={() => setNext(true)}>
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h4 className="title">Confirm Account Deletion</h4>
                        <p className="content-text">
                            Are you sure that you want to delete your account?
                            <br />
                            Please write "delete" in the following box
                        </p>
                        <div>
                            <input
                                className="confirm-text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button
                                disabled={text !== "delete"}
                                className="btn-primary d-flex align-items-center justify-content-center"
                                onClick={deleteAccount}
                            >
                                <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                                    <CustomSpinner />
                                </div>
                                <div className={`${pending ? "ms-3" : "pe-4"}`}>Confirm</div>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
