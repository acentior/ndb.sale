import React from "react"
import { navigate } from "gatsby"
import { useMutation } from "@apollo/client"
import { logout } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"
import CustomSpinner from "../common/custom-spinner"
import { DELETE_ACCOUNT } from "../../apollo/graghqls/mutations/Auth"

export default function DeleteAccountTab() {
    const [deleteAccountMutation, deleteAccountMutationResults] = useMutation(DELETE_ACCOUNT, {
        onCompleted: () => {
            logout(() => {
                navigate(ROUTES.home)
            })
        },
        errorPolicy: "ignore",
    })
    const pending = deleteAccountMutationResults?.loading
    const deleteAccount = (e) => {
        e.preventDefault()
        deleteAccountMutation()
    }
    return (
        <div className="sign-out">
            <h4>confirm delete account</h4>
            <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                <p>Are you sure you want to delete your account?</p>
                <button
                    className="btn-primary d-flex align-items-center justify-content-center"
                    onClick={deleteAccount}
                >
                    <div className={`${pending ? "opacity-1" : "opacity-0"}`}>
                        <CustomSpinner />
                    </div>
                    <div className={`${pending ? "ms-3" : "pe-4"}`}>delete account</div>
                </button>
            </div>
        </div>
    )
}
