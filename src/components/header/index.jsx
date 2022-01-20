import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useQuery } from "@apollo/client"
// Libraries
import { Link } from "gatsby"
import { isBrowser } from "./../../utilities/auth"
// Icons
import { Bell, Logo, NotificationBell } from "../../utilities/imgImport"
import { User } from "../../utilities/user-data"

import { useAuth } from "../../hooks/useAuth"
import DressupModal from "../dressup/dressup-modal"
import { ROUTES } from "../../utilities/routes"
import CurrencyChoice from "./currency-choice"
import { fetch_Avatar_Components } from "./../../redux/actions/avatarAction"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"
import { setCurrentAuthInfo } from "../../redux/actions/authAction"
import { GET_ALL_UNREAD_NOTIFICATIONS } from "../../apollo/graghqls/querys/Notification"

const Menu = () => {
    // Webservice
    const { data: user_data } = useQuery(GET_USER)
    const { data: allUnReadNotifications } = useQuery(GET_ALL_UNREAD_NOTIFICATIONS, {
        fetchPolicy: "network-only",
        onCompleted: (response) => {
            setNewNotification(response.getAllUnReadNotifications.length !== 0)
        },
    })

    // Containers
    const auth = useAuth()
    const dispatch = useDispatch()
    const userInfo = user_data?.getUser
    const [active, setActive] = useState(false)
    const { avatarComponents } = useSelector((state) => state)
    const [newNotification, setNewNotification] = useState(false)
    const [isDressUPModalOpen, setIsDressUPModalOpen] = useState(false)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
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

    // Methods
    useEffect(() => {
        if (!avatarComponents.loaded) {
            dispatch(fetch_Avatar_Components())
        }
        if (!isAuthenticated && userInfo) {
            dispatch(setCurrentAuthInfo(userInfo))
        }
    }, [dispatch, userInfo, avatarComponents.loaded, isAuthenticated])

    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.key === "Escape" && active) {
                setActive(false)
            }
        }
        document.addEventListener("keydown", handleEscKeyPress)
        return () => document.removeEventListener("keydown", handleEscKeyPress)
    })

    // Render
    return (
        <nav className={active ? "menu menu--active" : "menu"}>
            <div className="px-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-end gap-5 text-white text-uppercase fw-bold">
                    <Link to="/" className="menu__logo d-flex" title="Logo">
                        <img src={Logo} alt="NDB Brand Logo" />
                    </Link>
                    {isBrowser &&
                        (window.location.pathname === ROUTES.profile ||
                            window.location.pathname === ROUTES.faq ||
                            window.location.pathname === ROUTES.wallet ||
                            window.location.pathname === ROUTES.auction ||
                            window.location.pathname.includes(ROUTES.admin)) && (
                            <div className="d-none d-sm-flex justify-content-between gap-5">
                                <Link
                                    to={ROUTES.auction}
                                    className={`${
                                        window.location.pathname === ROUTES.auction && "txt-green"
                                    }`}
                                >
                                    sale
                                </Link>
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
                                {user?.role && user?.role?.includes("ROLE_ADMIN") ? (
                                    <Link
                                        to={ROUTES.admin}
                                        className={`${
                                            window.location.pathname.includes(ROUTES.admin) &&
                                            "txt-green"
                                        }`}
                                    >
                                        admin
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>
                        )}
                </div>
                <div className="d-flex align-items-center">
                    <div>
                        {!auth?.isLoggedIn() ? (
                            <Link
                                className="btn-primary text-uppercase d-inline-block sign-in"
                                to="/app/signin"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <ul className="d-flex align-items-center">
                                <li className="scale-75">
                                    <img
                                        src={newNotification ? NotificationBell : Bell}
                                        alt="Bell Icon"
                                    />
                                </li>
                                <li className="px-sm-3 px-0 scale-75">
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
                    <CurrencyChoice classNames="d-sm-block d-none" />
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
