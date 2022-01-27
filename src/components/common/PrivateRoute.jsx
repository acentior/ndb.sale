import React from "react"
import { navigate } from "gatsby"
import { isBrowser } from "../../utilities/auth"
import { useAuth } from "../../hooks/useAuth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const auth = useAuth()

    if (!auth.isLoggedIn() && isBrowser && window.location.pathname !== `/app/signin/`) {
        navigate(`/app/signin/`, { replace: true })
        return null
    }

    return <Component {...rest} />
}
export default PrivateRoute
