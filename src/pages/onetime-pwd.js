import React, { useCallback, useState } from "react"
import { Link } from "gatsby"
import { Input } from "../components/common/FormControl"
import AuthLayout from "../components/common/AuthLayout"

const OnetimePassword = () => {
    const [code, setCode] = useState("")
    const handleCodeChange = useCallback((e) => {
        setCode(e.target.value)
    }, [])

    return (
        <AuthLayout>
            <h3 className="signup-head mb-5">One-Time Password</h3>
            <form className="form">
                <div className="form-group">
                    <Input
                        name="code"
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="Enter code"
                    />
                </div>
                <div className="form-group text-white">
                    Didn’t receive your code?{" "}
                    <Link className="signup-link" to="/verify-email">
                        Send again
                    </Link>
                </div>
                <button type="submit" className="btn-primary w-100 text-uppercase my-5">
                    Confirm Code
                </button>
            </form>
            <p className="text-white text-center">
                Return to{" "}
                <Link to="/signup" className="signup-link">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    )
}

export default OnetimePassword
