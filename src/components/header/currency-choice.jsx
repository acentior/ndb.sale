import React, { useState } from "react"
import { ROUTES } from "../../utilities/routes"
import { Currencies } from "../../utilities/staticData"
import { User } from "../../utilities/user-data"

export default function CurrencyChoice() {
    const [selectedCurrency, setSelectedCurrency] = useState(0)
    const toggleCurrenciesMenuContent = () => {
        const menuItem = document.querySelector(".currencies-dropdown-content")
        menuItem.classList.toggle("d-none")
        menuItem.classList.toggle("d-block")
    }
    return (
        <div>
            {typeof window !== `undefined` &&
                (window.location.pathname === ROUTES.auction ||
                    window.location.pathname === ROUTES.wallet ||
                    window.location.pathname === ROUTES.profile) && (
                    <div className="header-currencies-dropdown">
                        <div
                            className="currencies-dropdown-indicator"
                            onClick={toggleCurrenciesMenuContent}
                            onKeyDown={toggleCurrenciesMenuContent}
                            role="presentation"
                        >
                            <span>{Currencies[User.selectedCurrencyId].label}</span>
                            <svg
                                class="down-arrow"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </div>
                        <ul className="currencies-dropdown-content d-none">
                            {Currencies?.map((item) => {
                                return (
                                    <li
                                        className={
                                            Currencies[User.selectedCurrencyId].id === item.id &&
                                            "text-secondary"
                                        }
                                        onClick={() => {
                                            User.selectedCurrencyId = item.id
                                            toggleCurrenciesMenuContent()
                                            setSelectedCurrency(item.id)
                                        }}
                                        onKeyDown={() => {
                                            User.selectedCurrencyId = item.id
                                            toggleCurrenciesMenuContent()
                                            setSelectedCurrency(item.id)
                                        }}
                                        role="presentation"
                                    >
                                        {item.label}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
        </div>
    )
}
