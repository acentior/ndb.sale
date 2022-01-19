/* eslint-disable */

import React, { useCallback, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactTooltip from "react-tooltip"
import Select, { components } from "react-select"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Header from "../components/header"
import { Input, CheckBox } from "../components/common/FormControl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/fontawesome-free-regular"
import { EditIcon, ETH, BTC, DOGE, QRCode, Copy, CloseIcon } from "../utilities/imgImport"
import { CopyToClipboard } from "react-copy-to-clipboard"
import ConnectWalletTab from "../components/profile/connect-wallet-tab"
import { FOO_COINS, PAYMENT_FRACTION_TOOLTIP_CONTENT, Currencies } from "../utilities/staticData"
import { setBidInfo } from "../redux/actions/bidAction"

const { Option, SingleValue } = components

const balances = [
    { value: "3,002,565", label: "ETH", icon: ETH },
    { value: "225,489", label: "BTC", icon: BTC },
    { value: "489,809", label: "DOGE", icon: DOGE },
]
const payment_types = [
    { value: "cryptocoin", label: "Cryptocoin", index: 0 },
    { value: "creditcard", label: "Card Payment", index: 1 },
    { value: "wallet", label: "Ndb wallet", index: 2 },
    { value: "externalwallets", label: "External Wallets", index: 3 },
]

const IconOption = (props) => (
    <Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
            <img
                src={props.data.icon}
                style={{ width: "30px", height: "auto" }}
                alt={props.data.label}
            />
            <p className="coin-label">{props.data.label}</p>
        </div>
    </Option>
)
const SelectedValue = (props) => {
    return (
        <SingleValue {...props}>
            <img
                src={props.data.icon}
                style={{ width: "30px", height: "auto" }}
                alt={props.data.label}
            />
        </SingleValue>
    )
}
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
    const dispatch = useDispatch()
    const bidAmount = useSelector((state) => state?.placeBid)
    const currencyId = useSelector((state) => state?.placeBid.currencyId)

    const [fooPayAmount, setFooPayAmount] = useState("")
    const [showEditPayAmountBox, setShowEditPayAmountBox] = useState(false)
    const [currentCoinAddress, setCurrentCoinAddress] = useState(FOO_COINS[0].address)
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        firstname: "",
        lastname: "",
        card: "",
        expire: "",
        code: "",
        bill: "",
        allow_fraction: false,
        amount: "",
        walletId: 0,
        getAddress: false,
    })
    const {
        firstname,
        lastname,
        card,
        expire,
        code,
        bill,
        allow_fraction,
        amount,
        walletId,
        getAddress,
    } = state

    const [coin, setCoin] = useState(FOO_COINS[0])
    const [balance, setBalance] = useState(null)
    const [copied, setCopied] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)
    const [payment_type, setPaymentType] = useState(payment_types[0])

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

    const handlePaymentType = (value) => {
        setPaymentType(value)
        setTabIndex(value.index)
    }
    return (
        <main className="payment-page">
            <Header />
            <section className="container position-relative h-100">
                <div className="text-center mt-3">
                    <div className="title">Payment page</div>
                    <div className="sub-title">Here you can decide how to pay</div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-8 payment-select">
                        <Tabs
                            className="payment-type__tab"
                            selectedIndex={tabIndex}
                            onSelect={(index) => setTabIndex(index)}
                        >
                            <TabList>
                                {payment_types.map((item, index) => (
                                    <Tab
                                        className={`payment-type__tab-list text-center ${
                                            index === 3 && "px-0"
                                        }`}
                                        key={index}
                                    >
                                        <label>{item.label}</label>
                                    </Tab>
                                ))}
                            </TabList>
                            <Select
                                options={payment_types}
                                value={payment_type}
                                onChange={(v) => handlePaymentType(v)}
                                className="payment-type__select"
                            />
                            <TabPanel className="cryptocoin-tab">
                                <div className="payment-content">
                                    <div className="row">
                                        <div className="d-flex flex-column justify-content-between col-lg-9">
                                            <div className="d-flex justify-content-between w-100">
                                                <Select
                                                    className="cryptocoin-select col-3"
                                                    options={FOO_COINS}
                                                    value={coin}
                                                    onChange={(v) => {
                                                        setCoin(v)
                                                        setCurrentCoinAddress(v.address)
                                                    }}
                                                    components={{
                                                        Option: IconOption,
                                                        SingleValue: SelectedValue,
                                                    }}
                                                />
                                                <Input
                                                    type="number"
                                                    value={bidAmount.place_bid}
                                                    disabled
                                                />
                                            </div>
                                            {!getAddress ? (
                                                <button
                                                    className="btn btn-light rounded-0 text-uppercase fw-bold mt-2 py-10px w-100"
                                                    onClick={() => setState({ getAddress: true })}
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
                                            <div className="qr-code col-lg-3">
                                                <img src={QRCode} alt="qr code" />
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
                                            <ReactTooltip place="right" type="light" effect="solid">
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
                            </TabPanel>
                            <TabPanel className="creditcard-tab">
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
                                                placeholder="Billing zip"
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
                                            <ReactTooltip place="right" type="light" effect="solid">
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
                            </TabPanel>
                            <TabPanel className="wallet-tab">
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
                                                value={bidAmount.place_bid}
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
                                            <ReactTooltip place="right" type="light" effect="solid">
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
                            </TabPanel>
                            <TabPanel className="externalwallets-tab">
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
                                            <ReactTooltip place="right" type="light" effect="solid">
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
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="col-md-4 order-summary d-flex flex-column justify-content-between">
                        <h3>Order Summary</h3>
                        <p>
                            The token will be paid to your wallet at ndb Will be hold based on the
                            bid and deducted if you win. If you lose it will be availabel in the NDB
                            wallet and can be either released to the personal or stay in NDB wallet
                            for the next round.
                        </p>
                        <div className="total-amount">
                            <div className="d-flex align-items-start">
                                <p className="amount-label">total amount</p>
                                <img
                                    src={showEditPayAmountBox ? CloseIcon : EditIcon}
                                    alt="edit"
                                    className="ms-3 cursor-pointer"
                                    onClick={() => setShowEditPayAmountBox(!showEditPayAmountBox)}
                                    onKeyDown={() => setShowEditPayAmountBox(!showEditPayAmountBox)}
                                    role="presentation"
                                />
                            </div>
                            <div className="amount">
                                {showEditPayAmountBox && (
                                    <div className="my-2">
                                        <input
                                            type="number"
                                            className="bg-transparent text-light border border-1 border-light p-2"
                                            onChange={(e) => setFooPayAmount(e.target.value)}
                                            value={fooPayAmount}
                                        />
                                        <div
                                            className="btn text-decoration-underline text-uppercase rounded-0 py-2 px-4 ms-2 fw-bold text-light"
                                            onClick={() => {
                                                dispatch(setBidInfo(fooPayAmount))
                                                setShowEditPayAmountBox(!showEditPayAmountBox)
                                            }}
                                            onKeyDown={() => {
                                                dispatch(setBidInfo(fooPayAmount))
                                                setShowEditPayAmountBox(!showEditPayAmountBox)
                                            }}
                                            role="presentation"
                                        >
                                            save
                                        </div>
                                    </div>
                                )}
                                {bidAmount.place_bid}
                                <span> {Currencies[currencyId].label}</span>
                            </div>
                        </div>
                        <p className="payment-expire">
                            payment expires in
                            <span className="txt-green">10 minutes</span>
                        </p>
                        <button className="btn-primary text-uppercase width-max-content">
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
