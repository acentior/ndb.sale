import React, { Suspense, lazy } from "react"
import { Router } from "@reach/router"
import Loading from "../../components/common/Loading"

const Profile = lazy(() => import("../../components/Profile"))
const PrivateRoute = lazy(() => import("../../components/common/PrivateRoute"))
const SignIn = lazy(() => import("../../components/auth/signin"))
const SignUp = lazy(() => import("../../components/auth/signup"))
const VerifyEmail = lazy(() => import("../../components/auth/verify-email"))
const VerifyFailed = lazy(() => import("../../components/auth/verify-failed"))
const OneTimePassword = lazy(() => import("../../components/auth/onetime-pwd"))
const ForgotPassword = lazy(() => import("../../components/auth/forgot-password"))
const NewPassword = lazy(() => import("../../components/auth/new-password"))
const VerifyID = lazy(() => import("../../components/auth/verify-id"))
const VerifyCompany = lazy(() => import("../../components/auth/verify-company"))
const Auction = lazy(() => import("../../components/auction"))
const ChangePassword = lazy(() => import("../../components/auth/change-password"))

const App = () => {
    const isSSR = typeof window === "undefined"
    return (
        <>
            {!isSSR && (
                <Suspense fallback={<Loading />}>
                    <Router basepath="app">
                        <PrivateRoute path="/profile" component={Profile} />
                        <SignIn path="signin" />
                        <SignUp path="signup" />
                        <SignIn path="signin/:error" />
                        <VerifyEmail path="verify-email" />
                        <VerifyEmail path="verify-email/:verified" />
                        <VerifyFailed path="verify-failed" />
                        <OneTimePassword path="onetime-pwd" />
                        <ForgotPassword path="forgot-password" />
                        <NewPassword path="new-password" />
                        <VerifyID path="verify-id" />
                        <VerifyCompany path="verify-company" />
                        <Auction path="auction" />
                        <ChangePassword path="change-password" />
                    </Router>
                </Suspense>
            )}
        </>
    )
}
export default App
