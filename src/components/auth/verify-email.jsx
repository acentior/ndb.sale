import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { Input } from "../common/FormControl"
import { useMutation } from "@apollo/client"
import { VERIFY_ACCOUNT, RESEND_VERIFY_CODE } from "../../apollo/graghqls/mutations/Auth"
import CustomSpinner from "../common/custom-spinner"
import { ROUTES } from "../../utilities/routes"
import AuthLayout from "../common/AuthLayout"
import TwoFactorModal from "../profile/two-factor-modal"

const VerifyEmail = ({ email }) => {
    const [code, setCode] = useState("")

    const [tfaOpen, setTfaOpen] = useState(false)

    const [verifyAccount, { loading }] = useMutation(VERIFY_ACCOUNT, {
        onCompleted: (data) => {
            if (data.verifyAccount === "Failed") navigate(ROUTES.verifyFailed)
            else if (data.verifyAccount === "Success") {
                setTfaOpen(true)
            }
        },
    })

    const [resendVerifyCode, { loading: resending }] = useMutation(RESEND_VERIFY_CODE, {
        onCompleted: (data) => {
            if (data.resendVerifyCode === "Already verified") {
                navigate(ROUTES.signIn + "error.Already verified")
            }
        },
    })

    return (
        <AuthLayout>
            <TwoFactorModal
                is2FAModalOpen={tfaOpen}
                setIs2FAModalOpen={(res) => {
                    setTfaOpen(res)
                    if (!res) navigate(ROUTES.signIn)
                }}
                email={email}
                twoStep={[]}
                onResult={(r) => {
                    if (r) {
                        navigate(ROUTES.signIn)
                    } else navigate(ROUTES.verifyFailed)
                }}
            />
            <h3 className="signup-head mb-5">Verify email</h3>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    verifyAccount({
                        variables: {
                            email,
                            code,
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
                        className={`signup-link ${resending ? "text-white" : "txt-green"}`}
                        to="#"
                        onClick={() =>
                            resendVerifyCode({
                                variables: {
                                    email,
                                },
                            })
                        }
                    >
                        Send again
                    </Link>
                </div>
                <button
                    type="submit"
                    className="btn-primary w-100 text-uppercase my-5 d-flex align-items-center justify-content-center"
                >
                    <div className={`${loading ? "opacity-1" : "opacity-0"}`}>
                        <CustomSpinner />
                    </div>
                    <div className={`${loading ? "ms-3" : "pe-4"}`}>Confirm Code</div>
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

export default VerifyEmail
