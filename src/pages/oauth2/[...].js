import React, { Suspense, lazy } from "react"
import { Router } from "@reach/router"
import Loading from "../../components/common/Loading"

const SignIn = lazy(() => import("../../components/oauth2/signin"))
const SignUp = lazy(() => import("../../components/oauth2/signup"))

const App = () => {
    const isSSR = typeof window === "undefined"
    return (
        <>
            {!isSSR && (
                <Suspense fallback={<Loading />}>
                    <Router basepath="oauth2">
                        <SignIn path="signin/:token" />
                        <SignUp path="signup/:token" />
                    </Router>
                </Suspense>
            )}
        </>
    )
}
export default App
