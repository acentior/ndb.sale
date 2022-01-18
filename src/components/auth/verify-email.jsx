import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Input } from "../common/FormControl"
import AuthLayout from "../common/AuthLayout"
import { useMutation } from "@apollo/client"
import { VERIFY_ACCOUNT, RESEND_VERIFY_CODE } from "../../apollo/graghqls/mutations/Auth"
import { getUser } from "../../utilities/auth"
import { ROUTES } from "../../utilities/routes"
import TwoFactorModal from "../profile/two-factor-modal"

const VerifyEmail = (props) => {
    const user = getUser()

    useEffect(() => {
        if (!user?.email) navigate(ROUTES.signUp)
    }, [user])

    const [code, setCode] = useState("")

    const [is2FAModalOpen, setIs2FAModalOpen] = useState(!!props.verified)

    const [verifyAccount] = useMutation(VERIFY_ACCOUNT, {
        onCompleted: (data) => {
            if (data.verifyAccount === "Failed") navigate(ROUTES.verifyFailed)
            else if (data.verifyAccount === "Success") setIs2FAModalOpen(true)
        },
    })

    const [resendVerifyCode] = useMutation(RESEND_VERIFY_CODE, {
        onCompleted: (data) => {
            if (data.resendVerifyCode === "Already verified") {
                setIs2FAModalOpen(true)
            }
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
                        onChange={(e) => setCode(e.target.value)}
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
            <TwoFactorModal
                is2FAModalOpen={is2FAModalOpen}
                setIs2FAModalOpen={setIs2FAModalOpen}
                email={user?.email}
                twoStep={user?.twoStep}
                updateUser={() => {}}
            />
        </AuthLayout>
    )
}

export default VerifyEmail
