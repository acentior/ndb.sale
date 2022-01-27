import React from "react"
import { Link } from "gatsby"
import { Logo } from "../../utilities/imgImport"

const SimpleHeader = () => {
    return (
        <nav className="menu">
            <div className="px-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-end gap-5 text-white text-uppercase fw-bold">
                    <Link to="/" className="menu__logo d-flex" title="Logo">
                        <img src={Logo} alt="NDB Brand Logo" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default SimpleHeader
