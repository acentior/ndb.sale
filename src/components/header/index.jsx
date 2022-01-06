import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
// Libraries
import { Link } from "gatsby"

// Icons
import { Bell, Logo } from "../../utilities/imgImport"
import { User } from "../../utilities/user-data"

import { useAuth } from "../../hooks/useAuth"
import DressupModal from "../dressup/dressup-modal"
import { ROUTES } from "../../utilities/routes"
import CurrencyChoice from "./currency-choice"
import SaleCTA from "./sale-cta"

const Menu = () => {
    const auth = useAuth()
    const { user } = useSelector(state => state.auth);

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
                <div className="d-flex align-items-end gap-5 text-white text-uppercase fw-bold">
                    <Link to="/" className="menu__logo d-flex" title="Logo">
                        <img src={Logo} alt="NDB Brand Logo" />
                    </Link>
                    {typeof window !== `undefined` &&
                        (window.location.pathname === ROUTES.profile ||
                            window.location.pathname === ROUTES.faq ||
                            window.location.pathname === ROUTES.wallet) && (
                            <>
                                <Link
                                    to={ROUTES.wallet}
                                    className={`${
                                        window.location.pathname === ROUTES.wallet && "txt-green"
                                    }`}
                                >
                                    wallet
                                </Link>
                                <Link
                                    to={ROUTES.profile}
                                    className={`${
                                        window.location.pathname === ROUTES.profile && "txt-green"
                                    }`}
                                >
                                    profile
                                </Link>
                                <div
                                    onClick={() => setIsDressUPModalOpen(true)}
                                    onKeyDown={() => setIsDressUPModalOpen(true)}
                                    className="cursor-pointer hover:text-green"
                                    role="presentation"
                                >
                                    dressup
                                </div>
                                <Link
                                    to={ROUTES.faq}
                                    className={`${
                                        window.location.pathname === ROUTES.faq && "txt-green"
                                    }`}
                                >
                                    faq
                                </Link>
                                {user.role && user.role.includes('ROLE_ADMIN') && (<Link
                                    to={ROUTES.admin}
                                    className={`${
                                        window.location.pathname === ROUTES.admin && "txt-green"
                                    }`}
                                >
                                    admin
                                </Link>)}
                            </>
                        )}
                </div>
                <div className="d-flex align-items-center">
                    <SaleCTA />
                    <div>
                        {!auth?.isLoggedIn() ? (
                            <Link
                                className="btn-primary text-uppercase d-inline-block sign-in"
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
                                    <Link to={ROUTES.profile}>
                                        <img
                                            src={User.avatar}
                                            className="user-avatar"
                                            alt="Tesla Icon"
                                        />
                                    </Link>
                                </li>
                                <DressupModal
                                    setIsModalOpen={setIsDressUPModalOpen}
                                    isModalOpen={isDressUPModalOpen}
                                />
                            </ul>
                        )}
                    </div>
                    <CurrencyChoice />
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
