import React from "react"
import { navigate } from "gatsby"
import { isBrowser } from "../../utilities/auth"
import { useAuth } from "../../hooks/useAuth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const auth 