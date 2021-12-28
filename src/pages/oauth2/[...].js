import React, { Suspense, lazy } from "react"
import { Router } from "@reach/router"
import Loading from "../../components/common/Loading"

const Redirect = lazy(() => import("../../components/oauth2/redirect"))

const App = () => {
    const isSSR = typeof window === "undefined"
    return (
        <>
            {!isSSR && (
                <Suspense fallback={<Loading />}>
                    <Router basepath="oauth2">
                        <Redirect path="redirect/:type/:dataType/:data" />
                    </Router>
                </Suspense>
            )}
        </>
    )
}
export default App
