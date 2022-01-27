import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ROUTES } from "../../utilities/routes"
import { Currencies } from "../../utilities/staticData"
import { setCurrencyInfo } from "../../redux/actions/bidAction"

export default function CurrencyChoice({ classNames }) {
    const dispatch = useDispatch()
    const currencyId = useSelector((state) => state.placeBid.currencyId)
    const [selectedCurrency, setSelectedCurrency] = useState(currencyId || 0)
    const toggleCurrenciesMenuContent = () => {
        const menuItem = document.querySelector(".currencies-dropdown-content")
        menuItem.classList.toggle("d-none")
        menuItem.classList.toggle("d-block")
    }
    return (
        <div className={classNames}>
            {typeof window !== `undefined` &&
                (window.location.pathname === ROUTES.auction ||
                    window.location.pathname === ROUTES.wallet ||
                    window.location.pathname === ROUTES.profile ||
                    window.location.pathname === ROUTES.presale_auction) && (
                    <div className="header-currencies-dropdown">
                        <div
                            className="currencies-dropdown-indicator"
                            onClick={toggleCurrenciesMenuContent}
                            onKeyDown={toggleCurrenciesMenuContent}
                            role="presentation"
                        >
                            <span>{Currencies[selectedCurrency].label}</span>
                            <svg
                                className="down-arrow"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </div>
                        <ul className="currencies-dropdown-content d-none">
                            {Currencies?.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={
                                            Currencies[selectedCurrency].id === item.id
                                                ? "text-secondary"
                                                : ""
                                        }
                                        onClick={() => {
                                            // User.selectedCurrencyId = item.id
                                            dispatch(setCurrencyInfo(item.id))
                                            toggleCurrenciesMenuContent()
                                            setSelectedCurrency(item.id)
                                        }}
                                        onKeyDown={() => {
                                            // User.selectedCurrencyId = item.id
                                            dispatch(setCurrencyInfo(item.id))
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
