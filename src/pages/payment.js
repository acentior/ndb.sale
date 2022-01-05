import React, { useCallback, useReducer, useState } from "react"
import Header from "../components/common/header"
import Select, { components } from "react-select"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { Input, CheckBox } from "../components/common/FormControl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/fontawesome-free-regular"
import { EditIcon, ETH, BTC, DOGE, LTC, BCH, DAI, USDC, QRCode, Copy } from "../utilities/imgImport"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { wallets } from "../utilities/staticData"

const { Option, SingleValue } = components

const coins = [
    { value: "ETH", label: "ETH", icon: ETH },
    { value: "BTC", label: "BTC", icon: BTC },
    { value: "BCH", label: "BCH", icon: BCH },
    { value: "DOGE", label: "DOGE", icon: DOGE },
    { value: "DAI", label: "DAI", icon: DAI },
    { value: "USDC", label: "USDC", icon: USDC },
    { value: "LTC", label: "LTC", icon: LTC },
]
const balances = [
    { value: "3,002,565", label: "ETH", icon: ETH },
    { value: "225,489", label: "BTC", icon: BTC },
    { value: "489,809", label: "DOGE", icon: DOGE },
]
const payment_types = [
    { value: "cryptocoin", label: "Cryptocoin", index: 0 },
    { value: "creditcard", label: "Card Payment", index: 1 },
    { value: "wallet", label: "Ndb wallet", index: 2 },
    { value: "externalwallets", label: "Wallets", index: 3 },
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
    const copyText = "kjY602GgjsKP23mhs09oOp63bd3n34fsla"
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
        getAddress: false
    })
    const { firstname, lastname, card, expire, code, bill, allow_fraction, amount, walletId, getAddress } = state

    const [coin, setCoin] = useState(coins[0])
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
                                        className={`payment-type__tab-list text-center`}
                                        key={index}
                                    >
                                        {item.label}
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
                                <div className="row">
                                    <div className="d-flex flex-column justify-content-between col-lg-9">
                                        <div className="d-flex justify-content-between w-100">
                                            <Select
                                                className="cryptocoin-select col-3"
                                                options={coins}
                                                value={coin}
                                                onChange={(v) => setCoin(v)}
                                                components={{
                                                    Option: IconOption,
                                                    SingleValue: SelectedValue,
                                                }}
                                            />
                                            <Input
                                                type="number"
                                                name="amount"
                                                value={amount}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        {
                                            !getAddress ?
                                                <button className="btn-primary" onClick={() => setState({ getAddress: true })}>Get deposit Adress</button>
                                                :
                                                <>
                                                    <CopyToClipboard
                                                        onCopy={() => setCopied(true)}
                                                        text={copyText}
                                                        options={{ message: "copied" }}
                                                    >
                                                        <p
                                                            className="clipboard"
                                                            onClick={() => setCopied(true)}
                                                            onKeyDown={() => setCopied(true)}
                                                            role="presentation"
                                                        >
                                                            <code>{copyText}</code>
                                                            <img src={Copy} alt="copy" />
                                                        </p>
                                                    </CopyToClipboard>
                                                    {copied ? (
                                                        <span style={{ color: "white" }}>Copied.</span>
                                                    ) : null}
                                                </>
                                        }
                                    </div>
                                    {
                                        getAddress &&
                                        <div className="qr-code col-lg-3">
                                            <img src={QRCode} alt="qr code" />
                                        </div>
                                    }
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
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            className="fa-2x ms-2"
                                        />
                                    </p>
                                    <p className="payment-expire my-auto">
                                        payment expires in{" "}
                                        <span className="txt-green">10 minutes</span>
                                    </p>
                                </div>
                            </TabPanel>
                            <TabPanel className="creditcard-tab">
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
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            className="fa-2x ms-2"
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
                            </TabPanel>
                            <TabPanel className="wallet-tab">
                                <div className="row">
                                    <Select
                                        className="balance-select col-lg-4"
                                        options={balances}
                                        value={balance}
                                        placeholder="YOUR BALANCE"
                                        onChange={(v) => setBalance(v)}
                                        components={{
                                            Option: CustomOption,
                                            SingleValue: CustomSingleValue,
                                        }}
                                    />
                                    <div className="col-lg-8 d-flex">
                                        <div className="choosed-icon">
                                            {balance?.icon && (
                                                <img src={balance?.icon} alt="coin" />
                                            )}
                                        </div>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="amount"
                                            value={amount}
                                            onChange={handleInput}
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
                                        <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                            className="fa-2x ms-2"
                                        />
                                    </p>
                                    <p className="payment-expire my-auto">
                                        payment expires in{" "}
                                        <span className="txt-green">10 minutes</span>
                                    </p>
                                </div>
                            </TabPanel>
                            <TabPanel className="externalwallets-tab">
                                <div className="row">
                                    {wallets.map((item, idx) => (
                                        <div
                                            className="col-sm-6"
                                            key={idx}
                                            onClick={() => setState({ walletId: idx })}
                                            onKeyDown={() => setState({ walletId: idx })}
                                            role="presentation"
                                        >
                                            <div className={`wallet-item ${idx === walletId && "active"}`}>
                                                <img src={item.icon} alt="wallet icon" />
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="col-md-4 order-summary">
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
                                <img src={EditIcon} alt="edit" className="ms-3" />
                            </div>
                            <p className="amount">50.234 ETH</p>
                        </div>
                        <p className="payment-expire">
                            payment expires in
                            <span className="txt-green">10 minutes</span>
                        </p>
                        <button className="btn-primary text-uppercase">Confirm Payment</button>
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
        </main >
    )
}

export default Payment
