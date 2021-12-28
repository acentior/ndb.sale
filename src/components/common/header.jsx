import React, { useEffect, useState } from "react"

// Libraries
import { Link } from "gatsby"

// Icons
import { Bell, DownArrow, Logo } from "../../utilities/imgImport"
import { User } from "../../utilities/user-data"

import { useAuth } from "../../hooks/useAuth"
import DressupModal from "../dressup/dressup-modal"

const Menu = () => {
    const auth = useAuth()

    // State
    const [isDressUPModalOpen, setIsDressUPModalOpen] = useState(false)

    const [active, setActive] = useState(false)

    // Navigation Links
    const navigationLinks = [
        {
            label: "Home",
            url: "https://ndb.money/",
        },
        {
            label: "Vision",
            url: "https://ndb.city",
        },
        {
            label: "Technology",
            url: "https://ndb.money/technology",
        },
        {
            label: "Learn",
            url: "https://ndb.money/learn",
        },
        {
            label: "Sale",
            url: "/",
        },
        {
            label: "Contact Us",
            url: "https://ndb.money/#contactUs",
        },
    ]

    // Handles 'ESC' key pressing.
    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.key === "Escape" && active) {
                setActive(false)
            }
        }

        document.addEventListener("keydown", handleEscKeyPress)

        return () => document.removeEventListener("keydown", handleEscKeyPress)
    })

    return (
        <nav className={active ? "menu menu--active" : "menu"}>
            <div className="px-4 d-flex align-items-center justify-content-between">
                <Link to="/" className="menu__logo d-flex" title="Logo">
                    <img src={Logo} alt="NDB Brand Logo" />
                </Link>

                <div className="d-flex align-items-center">
                    <div className="sign-in">
                        {!auth?.isLoggedIn() ? (
                            <Link
                                className="btn-primary text-uppercase d-inline-block"
                                to="/app/signin"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <ul className="d-flex">
                                <li className="d-flex">
                                    <img src={Bell} alt="Bell Icon" />
                                </li>
                                <li className="px-4">
                                    <Link to="/app/profile">
                                        <img
                                            src={User.avatar}
                                            className="user-avatar"
                                            alt="Tesla Icon"
                                        />
                                    </Link>
                                </li>
                                <li className="user-dropdown">
                                    {window.location.pathname === "/app/profile" && (
                                        <img
                                            src={DownArrow}
                                            alt="Down Arrow Icon"
                                            className="cursor-pointer"
                                        />
                                    )}
                                    <ul className="user-dropdown-menu">
                                        <li>
                                            <Link to="/auction">
                                                <div>dashboard</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/app/profile">profile</Link>
                                        </li>
                                        <li
                                            onClick={() => setIsDressUPModalOpen(true)}
                                            onKeyDown={() => setIsDressUPModalOpen(true)}
                                            role="presentation"
                                        >
                                            <a>dressup</a>
                                        </li>
                                        <li>
                                            <Link to="/faq">faq</Link>
                                        </li>
                                    </ul>
                                </li>

                                <DressupModal
                                    setIsDressUPModalOpen={setIsDressUPModalOpen}
                                    isDressUPModalOpen={isDressUPModalOpen}
                                />
                            </ul>
                        )}
                    </div>
                    <button
                        type="button"
                        className="menu__toggler"
                        onClick={() => setActive(!active)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <div className="menu__content">
                    <div className="content d-md-flex align-items-center">
                        <ul className="content__section menu__items">
                            {navigationLinks.map((link) => (
                                <li className="menu__item" key={link.label}>
                                    <a
                                        href={link.url}
                                        className="d-inline-block"
                                        onClick={() => setActive(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menu
