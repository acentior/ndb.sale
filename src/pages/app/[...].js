import React, { Suspense, lazy } from "react"
import { Router } from "@reach/router"
import { navigate } from "gatsby"
import Loading from "../../components/common/Loading"
import { useAuth } from "../../hooks/useAuth"

const Profile = lazy(() => import("../../components/Profile"))
const PrivateRoute = lazy(() => import("../../components/common/PrivateRoute"))
const SignIn = lazy(() => import("../../components/auth/signin"))
const SignUp = lazy(() => import("../../components/auth/signup"))
const VerifyEmail = lazy(() => import("../../components/auth/verify-email"))
const VerifyFailed = lazy(() => import("../../components/auth/verify-failed"))
const ForgotPassword = lazy(() => import("../../components/auth/forgot-password"))
const NewPassword = lazy(() => import("../../components/auth/new-password"))
const VerifyID = lazy(() => import("../../components/auth/verify-id"))
const VerifyCompany = lazy(() => import("../../components/auth/verify-company"))
const Auction = lazy(() => import("../../components/auction"))
const ChangePassword = lazy(() => import("../../components/auth/change-password"))
const SelectFigure = lazy(() => import("../../components/auth/select-figure"))

const AuthRoute = ({ component: Component, location, ...rest }) => {
    const auth = useAuth()

    if (auth.isLoggedIn()) {
        navigate(`/app/profile/`, { replace: true })
        return null
    }

    return <Component {...rest} />
}

const App = () => {
    const isSSR = typeof window === "undefined"
    return (
        <>
            {!isSSR && (
                <Suspense fallback={<Loading />}>
                    <Router basepath="app">
                        <AuthRoute path="signin" component={SignIn} />
                        <AuthRoute path="signin/:error" component={SignIn} />
                        <AuthRoute path="signup" component={SignUp} />
                        <AuthRoute path="verify-email/:email" component={VerifyEmail} />

                        <VerifyFailed path="verify-failed" />
                        <NewPassword path="new-password" />
                        <ForgotPassword path="forgot-password" />
                        <ChangePassword path="change-password" />
                        <VerifyID path="verify-id" />
                        <VerifyCompany path="verify-company" />
                        <Auction path="auction" />

                        <PrivateRoute path="/profile" component={Profile} />
                        <PrivateRoute path="select-figure" component={SelectFigure} />
                    </Router>
                </Suspense>
            )}
        </>
    )
}
export default App
