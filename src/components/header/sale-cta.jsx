import React from "react"
import { Link } from "gatsby"
import { ROUTES } from "../../utilities/routes"
import { useAuth } from "../../hooks/useAuth"

export default function SaleCTA() {
    const auth = useAuth()
    return (
        auth?.isLoggedIn() && (
            <Link to={ROUTES.auction} className="header-sale-cta">
                sale
            </Link>
        )
    )
}
