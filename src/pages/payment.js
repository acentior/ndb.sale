/* eslint-disable */

import React, { useCallback, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "@apollo/client"
import ReactTooltip from "react-tooltip"
import Select, { components } from "react-select"
import QRCode from "react-qr-code"
import Header from "../components/header"
import { Input, CheckBox } from "../components/common/FormControl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/fontawesome-free-regular"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import {
    CryptoCoin,
    Paypal,
    Credit,
    NdbWallet,
    ExternalWallet,
    ETH,
    BTC,
    DOGE,
    Copy,
    PaypalBrand,
} from "../utilities/imgImport"
import { CopyToClipboard } from "react-copy-to-clipboard"
import ConnectWalletTab from "../components/profile/connect-wallet-tab"
import { FOO_COINS, PAYMENT_FRACTION_TOOLTIP_CONTENT, Currencies } from "../utilities/staticData"
import { CREATE_CRYPTO_PAYMENT } from "../apollo/graghqls/mutations/Payment"

const { Option, SingleValue } = components

const balances = [
    { value: "3,002,565", label: "ETH", icon: ETH },
    { value: "225,489", label: "BTC", icon: BTC },
    { value: "489,809", label: "DOGE", icon: DOGE },
]
const payment_types = [
    { icon: CryptoCoin, value: "cryptocoin", label: "Cryptocoin" },
    { icon: Credit, value: "creditcard", label: "Credit / Debit card" },
    { icon: Paypal, value: "paypal", label: "PayPal" },
    { icon: NdbWallet, value: "ndb_wallet", label: "Ndb wallet" },
    { icon: ExternalWallet, value: "externalwallets", label: "External Wallets" },
]

const SelectOption = (props) => (
    <Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
            <img
                src={props.data.icon}
                style={{ width: "30px", height: "auto" }}
                alt={props.data.label}
            />
            <p className="coin-label ms-2">{props.data.label}</p>
        </div>
    </Option>
)

const CustomOption = (props) => (
    <Option {...props}>
        <div className="custom-option">
            <p>{props.data.value}</p>
            <p className="ms-4">{props.data.label}</p>
        </div>
    </Option>
)
const CustomSingleValue = (props) => {
    return (
        <SingleValue {...props}>
            <p className="wallet-select__value">{props.data.value + " - " + props.data.label}</p>
        </SingleValue>
    )
}

const Payment = () => {
    // const dispatch = useDispatch()
    const bidAmount = useSelector((state) => state?.placeBid.bid_amount)
    const currentRound = useSelector((state) => state?.placeBid.round_id)
    console.log("data: ", bidAmount, currentRound)
    const [currentCoinAddress, setCurrentCoinAddress] = useState(FOO_COINS[0].address)
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        firstname: "",
        lastname: "",
        card: "",
        expire: "",
        code: "",
        bill: "",
        allow_fraction: false,
        getAddress: false,
    })
    const { firstname, lastname, card, expire, code, bill, allow_fraction, getAddress } = state

    const [coin, setCoin] = useState(FOO_COINS[0])
    const [balance, setBalance] = useState(null)
    const [tabIndex, setTabIndex] = useState(0)
    const [selectedCoinPrice, setSelectedCoinPrice] = useState(0)
    const [price_list, setPriceList] = useState(null)
    const [address_list, setAddressList] = useState(null)

    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])
    const handleAllowFraction = useCallback(
        (e) => {
            e.preventDefault()
            setState({ allow_fraction: !allow_fraction })
        },
        [allow_fraction]
    )

    const [CreateCryptoPayment] = useMutation(CREATE_CRYPTO_PAYMENT, {
        onCompleted: (data) => {
            console.log("create cypto payment: ", data)
            const list = data.createCryptoPayment.pricing
            const addresses = data.createCryptoPayment.addresses
            console.log(addresses)
            setAddressList(addresses)
            setPriceList(data.createCryptoPayment.pricing)
            setCurrentCoinAddress(addresses[0].value)
            setSelectedCoinPrice(list[1].value.amount.toFixed(3))
        },
        onError: (err) => {
            console.log("create cypto payment: ", err)
        },
    })

    return (
        <main className="payment-page">
            <Header />
            <section className="container position-relative">
                <div className="row payment-wrapper">
                    <div className="col-lg-8 payment-select">
                        <div className="payment-type__tab">
                            <div className="payment-type__tab-name">
                                {tabIndex !== 0 && (
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        className="left-arrow cursor-pointer text-light"
                                        size="lg"
                                        onClick={() => setTabIndex(0)}
                                    />
                                )}
                                <h4>
                                    {tabIndex === 0
                                        ? "How do you want to pay?"
                                        : payment_types[tabIndex - 1].label}
                                </h4>
                            </div>
                            {tabIndex === 0 && (
                                <div className="payment-type__tab-list">
                                    {payment_types.map((item, idx) => (
                                        <div
                                            className="payment-type"
                                            key={idx}
                                            onClick={() => setTabIndex(idx + 1)}
                                            style={{
                                                width: idx === 0 ? "100%" : "calc(50% - 6px)",
                                                marginRight: idx % 2 === 0 ? "0" : "12px",
                                            }}
                                        >
                                            <img
                                                className="payment-type__icon"
                                                src={item.icon}
                                                alt="payment type"
                                            />
                                            <p className="payment-type__name">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}{" "}
                            {tabIndex === 1 && (
                                <div className="cryptocoin-tab">
                                    <div className="payment-content">
                                        <div className="set-cryptocoin">
                                            <div className="d-flex flex-column justify-content-between coin-address">
                                                <div className="d-flex justify-content-between w-100">
                                                    <Select
                                                        className="cryptocoin-select col-3"
                                                        options={FOO_COINS}
                                                        value={coin}
                                                        onChange={(v) => {
                                                            setCoin(v)
                                                            setCurrentCoinAddress(v.address)
                                                            price_list.map((item, index) => {
                                                                if (
                                                                    item.value.currency === v.value
                                                                ) {
                                                                    setSelectedCoinPrice(
                                                                        (
                                                                            item.value.amount * 1
                                                                        ).toFixed(3)
                                                                    )
                                                                    setCurrentCoinAddress(
                                                                        address_list[index - 1]
                                                                            .value
                                                                    )
                                                                }
                                                            })
                                                        }}
                                                        components={{
                                                            Option: SelectOption,
                                                            SingleValue: SelectOption,
                                                        }}
                                                    />
                                                    <Input
                                                        type="number"
                                                        value={selectedCoinPrice}
                                                        disabled
                                                    />
                                                </div>
                                                {!getAddress ? (
                                                    <button
                                                        className="btn btn-light rounded-0 text-uppercase fw-bold mt-2 py-10px w-100"
                                                        onClick={() => {
                                                            setState({ getAddress: true })
                                                            CreateCryptoPayment({
                                                                variables: {
                                                                    round: currentRound,
                                                                    amount: bidAmount,
                                                                },
                                                            })
                                                        }}
                                                    >
                                                        get deposit Address
                                                    </button>
                                                ) : (
                                                    <>
                                                        <CopyToClipboard
                                                            onCopy={() => setCopied(true)}
                                                            text={currentCoinAddress}
                                                            options={{ message: "copied" }}
                                                        >
                                                            <p
                                                                className="clipboard"
                                                                onClick={() => setCopied(true)}
                                                                onKeyDown={() => setCopied(true)}
                                                                role="presentation"
                                                            >
                                                                <code>{currentCoinAddress}</code>
                                                                <img src={Copy} alt="copy" />
                                                            </p>
                                                        </CopyToClipboard>
                                                    </>
                                                )}
                                            </div>
                                            {getAddress && (
                                                <div className="qr-code">
                                                    <QRCode value={currentCoinAddress} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3 d-flex">
                                            <div className="d-flex flex-row">
                                                <CheckBox
                                                    type="checkbox"
                                                    name="allow_fraction"
                                                    value={allow_fraction}
                                                    onChange={handleAllowFraction}
                                                    className="text-uppercase"
                                                ></CheckBox>
                                                <div className="allow-text text-light">
                                                    Do you allow fraction of order compleation?
                                                </div>
                                                <ReactTooltip
                                                    place="right"
                                                    type="light"
                                                    effect="solid"
                                                >
                                                    <div
                                                        className="text-justify"
                                                        style={{
                                                            width: "300px",
                                                        }}
                                                    >
                                                        {PAYMENT_FRACTION_TOOLTIP_CONTENT}
                                                    </div>
                                                </ReactTooltip>
                                                <FontAwesomeIcon
                                                    data-tip="React-tooltip"
                                                    icon={faQuestionCircle}
                                                    className="fa-2x ms-2 cursor-pointer text-light"
                                                />
                                            </div>
                                            <p className="payment-expire my-auto">
                                                payment expires in{" "}
                                                <span className="txt-green">10 minutes</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {tabIndex === 2 && (
                                <div className="creditcard-tab">
                                    <div className="payment-content">
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <Input
                                                    type="text"
                                                    name="firstname"
                                                    value={firstname}
                                                    onChange={handleInput}
                                                    placeholder="First name"
                                                />
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <Input
                                                    type="text"
                                                    name="lastname"
                                                    value={lastname}
                                                    onChange={handleInput}
                                                    placeholder="Last name"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                type="number"
                                                name="card"
                                                value={card}
                                                onChange={handleInput}
                                                placeholder="Card number"
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-sm-4">
                                                <Input
                                                    type="number"
                                                    name="expire"
                                                    value={expire}
                                                    onChange={handleInput}
                                                    placeholder="Expiration date"
                                                />
                                            </div>
                                            <div className="form-group col-sm-4">
                                                <Input
                                                    type="number"
                                                    name="code"
                                                    value={code}
                                                    onChange={handleInput}
                                                    placeholder="CSS code"
                                                />
                                            </div>
                                            <div className="form-group col-sm-4">
                                                <Input
                                                    type="number"
                                                    name="bill"
                                                    value={bill}
                                                    onChange={handleInput}
                                                    placeholder="Billing zip/postal code"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-3 d-flex">
                                            <p className="d-flex flex-row">
                                                <CheckBox
                                                    type="checkbox"
                                                    name="allow_fraction"
                                                    value={allow_fraction}
                                                    onChange={handleAllowFraction}
                                                    className="text-uppercase"
                                                ></CheckBox>
                                                <div className="allow-text">
                                                    Do you allow fraction of order compleation?
                                                </div>
                                                <ReactTooltip
                                                    place="right"
                                                    type="light"
                                                    effect="solid"
                                                >
                                                    <div
                                                        className="text-justify"
                                                        style={{
                                                            width: "300px",
                                                        }}
                                                    >
                                                        {PAYMENT_FRACTION_TOOLTIP_CONTENT}
                                                    </div>
                                                </ReactTooltip>
                                                <FontAwesomeIcon
                                                    data-tip="React-tooltip"
                                                    icon={faQuestionCircle}
                                                    className="fa-2x ms-2 cursor-pointer"
                                                />
                                            </p>
                                            <p className="payment-expire my-auto">
                                                payment expires in{" "}
                                                <span className="txt-green">10 minutes</span>
                                            </p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="d-flex flex-row">
                                                <CheckBox
                                                    type="checkbox"
                                                    name="allow_fraction"
                                                    value={allow_fraction}
                                                    onChange={handleAllowFraction}
                                                    className="text-uppercase"
                                                ></CheckBox>
                                                <div className="allow-text">
                                                    Save card details for future purchase
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {tabIndex === 3 && (
                                <div className="paypal-tab">
                                    <div className="payment-content">
                                        <button className="paypal-checkout btn-second">
                                            Check out with &nbsp;
                                            <img src={PaypalBrand} alt="paypal" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {tabIndex === 4 && (
                                <div className="wallet-tab">
                                    <div className="payment-content">
                                        <div className="row">
                                            <Select
                                                className="balance-select col-lg-4 pe-0"
                                                options={balances}
                                                value={balance}
                                                placeholder="YOUR BALANCE"
                                                onChange={(v) => setBalance(v)}
                                                components={{
                                                    Option: CustomOption,
                                                    SingleValue: CustomSingleValue,
                                                }}
                                            />
                                            <div className="col-lg-8 d-flex pl-8px">
                                                <div className="choosed-icon">
                                                    {balance?.icon && (
                                                        <img src={balance?.icon} alt="coin" />
                                                    )}
                                                </div>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={bidAmount}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-3 d-flex">
                                            <p className="d-flex flex-row">
                                                <CheckBox
                                                    type="checkbox"
                                                    name="allow_fraction"
                                                    value={allow_fraction}
                                                    onChange={handleAllowFraction}
                                                    className="text-uppercase"
                                                ></CheckBox>
                                                <div className="allow-text">
                                                    Do you allow fraction of order compleation?
                                                </div>
                                                <ReactTooltip
                                                    place="right"
                                                    type="light"
                                                    effect="solid"
                                                >
                                                    <div
                                                        className="text-justify"
                                                        style={{
                                                            width: "300px",
                                                        }}
                                                    >
                                                        {PAYMENT_FRACTION_TOOLTIP_CONTENT}
                                                    </div>
                                                </ReactTooltip>
                                                <FontAwesomeIcon
                                                    data-tip="React-tooltip"
                                                    icon={faQuestionCircle}
                                                    className="fa-2x ms-2 cursor-pointer"
                                                />
                                            </p>
                                            <p className="payment-expire my-auto">
                                                payment expires in{" "}
                                                <span className="txt-green">10 minutes</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {tabIndex === 5 && (
                                <div className="externalwallets-tab">
                                    <div className="payment-content" style={{ display: "block" }}>
                                        <ConnectWalletTab />

                                        <div className="mt-1 d-flex">
                                            <p className="d-flex flex-row">
                                                <CheckBox
                                                    type="checkbox"
                                                    name="allow_fraction"
                                                    value={allow_fraction}
                                                    onChange={handleAllowFraction}
                                                    className="text-uppercase"
                                                ></CheckBox>
                                                <div className="allow-text">
                                                    Do you allow fraction of order compleation?
                                                </div>
                                                <ReactTooltip
                                                    place="right"
                                                    type="light"
                                                    effect="solid"
                                                >
                                                    <div
                                                        className="text-justify"
                                                        style={{
                                                            width: "300px",
                                                        }}
                                                    >
                                                        {PAYMENT_FRACTION_TOOLTIP_CONTENT}
                                                    </div>
                                                </ReactTooltip>
                                                <FontAwesomeIcon
                                                    data-tip="React-tooltip"
                                                    icon={faQuestionCircle}
                                                    className="fa-2x ms-2 cursor-pointer"
                                                />
                                            </p>
                                            <p className="payment-expire my-auto">
                                                payment expires in{" "}
                                                <span className="txt-green">10 minutes</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-4 d-flex flex-column justify-content-between">
                        <div className="order-summary ">
                            <h4>Order Summary</h4>

                            <div className="order-list">
                                <div className="d-flex justify-content-between">
                                    <p className="order-list__label">Total order</p>
                                    <p className="order-list__label">
                                        {bidAmount} <span> USD</span>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between my-3">
                                    <p className="order-list__label">Fee</p>
                                    <p className="order-list__label">0</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="order-list__label">Discount</p>
                                    <p className="order-list__label">0</p>
                                </div>
                            </div>
                            <div
                                className="d-flex justify-content-between"
                                style={{ paddingTop: "11px", paddingBottom: "25px" }}
                            >
                                <p className="order-list__label" style={{ color: "#959595" }}>
                                    Order total:
                                </p>
                                <p className="order-total">
                                    {bidAmount} <span> USD</span>
                                </p>
                            </div>
                        </div>

                        <button className="btn-primary text-uppercase width-max-content confirm-payment">
                            Confirm Payment
                        </button>
                    </div>
                </div>
                <div className="remain-token__value col-md-12 mx-auto">
                    <div className="d-flex justify-content-between">
                        <p className="current-value">
                            current token value&nbsp;
                            <span className="txt-green">123.421</span>
                        </p>
                        <p className="end-value">
                            end token value&nbsp;
                            <span className="txt-green">1 Trillion</span>
                        </p>
                    </div>
                    <div className="timeframe-bar">
                        <div
                            className="timeleft"
                            style={{
                                width: "25%",
                                background:
                                    "linear-gradient(270deg, #FFFFFF 0%, #77DDA0 31.34%, #23C865 64.81%)",
                            }}
                        >
                            <div className="timeleft__value">
                                Round &nbsp;
                                <span className="txt-green">1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Payment
