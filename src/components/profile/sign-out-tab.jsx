import { navigate } from "gatsby"
import React from "react"
import { logout } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"

export default function SignOutTab() {
    const signOut = () => {
        logout(() => {
            navigate(ROUTES.home)
        })
    }
    return (
        <div className="sign-out">
            <h4 className="pt-3">confirm sign out</h4>
            <div className="h-75 d-flex flex-column align-items-center justify-content-center">
                <p>Are you sure you want to sign out?</p>
                <button className="btn-primary" onClick={(e) => signOut()}>
                    sign out
                </button>
            </div>
        </div>
    )
}
