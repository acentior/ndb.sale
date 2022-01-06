import React from "react"
import { Link } from "gatsby"
import { ROUTES } from "../../utilities/routes"

export default function SaleCTA() {
    return (
        <Link to={ROUTES.auction} className="header-sale-cta">
            sale
        </Link>
    )
}
