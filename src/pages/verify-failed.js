import React from "react"
import { Link } from "gatsby"
import AuthLayout from "../components/common/AuthLayout"
import { Failed } from "../utilities/imgImport"

const ForgetPassword = () => {
    return (
        <AuthLayout>
            <div className="text-center">
                <img src={Failed} alt="failed" />
                <h3 className="signup-head mb-3 mt-5">Verification failed</h3>
                <Link to="/verify-email" className="verify-link">
                    Try verify again
                </Link>
            </div>
        </AuthLayout>
    )
}

export default ForgetPassword
