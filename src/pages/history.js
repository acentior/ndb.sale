import React, { useReducer, useCallback, useState } from "react"
import Header from "../components/header"
import Select, { components } from "react-select"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { numberWithCommas } from "../utilities/number"
import { BTC, DOGE, ETH, NDB, Airdrop, Address, Copy2, CloseIcon } from "../utilities/imgImport"
import { Link } from "gatsby"
import Modal from "react-modal"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Input } from "../components/common/FormControl"
import { useWindowSize } from "../utilities/customHook"
import AirdropDetail from "../components/AirdropDetail"
import DepositWithdrawModal from "../components/wallet/deposit-withdraw-modal"
import MarketTab from "../components/wallet/market-tab"
import { TRANSACTION_TYPES } from "../utilities/staticData"
import Transactions from "../components/wallet/transactions-tab"
import ReferralTab from "../components/wallet/referral-tab"
import StakeTab from "../components/wallet/stake-tab"
import BidActivityTab from "../components/wallet/bid-activity-tab"

const transactions = [
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: -3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
]

const my_assets = [
    {
        icon: NDB,
        abbr: "NDB",
        name: "NDB Token",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: ETH,
        abbr: "ETH",
        name: "Ethereum",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: BTC,
        abbr: "BTC",
        name: "Bitcoin",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: NDB,
        abbr: "NDB",
        name: "NDB Token",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: ETH,
        abbr: "ETH",
        name: "Ethereum",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: BTC,
        abbr: "BTC",
        name: "Bitcoin",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: NDB,
        abbr: "NDB",
        name: "NDB Token",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: ETH,
        abbr: "ETH",
        name: "Ethereum",
        amount: 12.0865,
        price: 282004.43,
    },
    {
        icon: BTC,
        abbr: "BTC",
        name: "Bitcoin",
        amount: 12.0865,
        price: 282004.43,
    },
]
const airdrops = [
    {
        icon: Airdrop,
        name: "ICON (ICX)",
        desc: "General-purpose blockchain protocol",
        status: "Active",
        end: "14 Apr 2022",
        reward: 150,
        participants: 60,
        winners: 20,
    },
    {
        icon: Airdrop,
        name: "BtcEX (BXC)",
        desc: "Crypto exchange platform",
        status: "Active",
        end: "14 Apr 2022",
        reward: 300,
        participants: 60,
        winners: 20,
    },
    {
        icon: Airdrop,
        name: "Publish0x",
        desc: "Crypto-publishing platform",
        status: "Ended",
        end: "Unkown",
        reward: 100,
        participants: 60,
        winners: 20,
    },
]
const coins = [
    { value: "eth", label: "Ethereum", icon: ETH },
    { value: "btc", label: "Bitcoin", icon: BTC },
    { value: "doge", label: "Dogecoin", icon: DOGE },
]
const joins = [
    {
        label: "Connect your MetaMask wallet",
        btnName: "Connect metamask wallet",
    },
    {
        label: "Connect your BitMEX API key",
        btnName: "Connect ",
    },
    {
        label: "Follow Facebook account",
        btnName: "Follow",
    },
    {
        label: "Join Telegram channel",
        btnName: "Join",
    },
]

// Select option customization
const { Option, SingleValue } = components
const IconOption = (props) => (
    <Option {...props}>
        <img
            src={props.data.icon}
            style={{ width: 24, marginRight: "4px" }}
            alt={props.data.label}
        />
        {props.data.label}
    </Option>
)
const SelectedValue = (props) => {
    return (
        <SingleValue {...props}>
            <img src={props.data.icon} style={{ width: 24 }} alt={props.data.label} />
            <p>{props.data.label}</p>
        </SingleValue>
    )
}

const History = () => {
    const [hideValues, setHideValues] = useState(false)
    const [btcEquityValue, setBtcEquityValue] = useState("12.003.877")
    const [dollarEquityValue, setDollarEquityValue] = useState("282,004.43")
    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPES.deposit)
    const [showDepositAndWidthdrawModal, setShowDepositAndWidthdrawModal] = useState(false)
    const obscureValueString = "****"
    const [btcOrUsd, setBtcOrUsd] = useState("USD")
    const copyText = "kjY602GgjsKP23mhs09oOp63bd3n34fsla"
    const size = useWindowSize()
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        amount: "",
        detail_show: false,
        index: 0,
        coin: coins[0],
        copied: false,
        modalIsOpen: false,
        airdropModal: false,
        joinAirdrop: false,
        facebook_handle: "",
        telegram_handle: "",
    })
    const {
        amount,
        detail_show,
        index,
        coin,
        copied,
        modalIsOpen,
        airdropModal,
        joinAirdrop,
        facebook_handle,
        telegram_handle,
    } = state

    const handleClick = (idx) => {
        setState({ detail_show: true })
        setState({ index: idx })
    }
    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])
    const handleJoinAirdrop = () => {
        setState({ joinAirdrop: true })
    }

    return (
        <main className="history-page">
            <Header />
            <section className="container">
                <div className="section-history row">
                    <div className="section-history__left col-lg-4 col-md-5">
                        <div>
                            <div className="profile-value">
                                <div className="value-box">
                                    <p className="value-label d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            Equity Value (BTC)
                                            {!hideValues && (
                                                <svg
                                                    className="value-label-eye-icon"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    onClick={() => setHideValues(true)}
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                    ></path>
                                                </svg>
                                            )}
                                            {hideValues && (
                                                <svg
                                                    className="value-label-eye-icon"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    onClick={() => setHideValues(false)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    ></path>
                                                </svg>
                                            )}
                                        </div>

                                        <div className="d-flex gap-2">
                                            <div
                                                className={`cursor-pointer ${
                                                    btcOrUsd === "BTC" && "fw-bold text-white"
                                                }`}
                                                onClick={() => setBtcOrUsd("BTC")}
                                                onKeyDown={() => setBtcOrUsd("BTC")}
                                                role="presentation"
                                            >
                                                BTC
                                            </div>
                                            <div>|</div>
                                            <div
                                                className={`cursor-pointer ${
                                                    btcOrUsd === "USD" && "fw-bold text-white"
                                                }`}
                                                onClick={() => setBtcOrUsd("USD")}
                                                onKeyDown={() => setBtcOrUsd("USD")}
                                                role="presentation"
                                            >
                                                USD
                                            </div>
                                        </div>
                                    </p>
                                    <p className="value">
                                        {hideValues
                                            ? obscureValueString
                                            : btcOrUsd === "USD"
                                            ? dollarEquityValue
                                            : btcEquityValue}
                                    </p>
                                    <p className="max-value mt-3">
                                        {hideValues
                                            ? obscureValueString
                                            : "~ $ " +
                                              (btcOrUsd === "USD"
                                                  ? btcEquityValue
                                                  : dollarEquityValue)}
                                    </p>
                                </div>
                                <div className="btn-group d-flex justify-content-between mt-3 align-items-center">
                                    <div className="col-sm-6 pe-2">
                                        <button
                                            className="btn btn-outline-light rounded-0 col-12 text-uppercase fw-bold py-2 h4"
                                            onClick={() => {
                                                setTransactionType(TRANSACTION_TYPES.deposit)
                                                setShowDepositAndWidthdrawModal(true)
                                            }}
                                        >
                                            deposit
                                        </button>
                                    </div>
                                    <div className="col-sm-6 ps-2">
                                        <button
                                            className="btn btn-outline-light rounded-0 col-12 text-uppercase fw-bold py-2 h4"
                                            onClick={() => {
                                                setTransactionType(TRANSACTION_TYPES.withdraw)
                                                setShowDepositAndWidthdrawModal(true)
                                            }}
                                        >
                                            withdraw
                                        </button>
                                    </div>
                                    {showDepositAndWidthdrawModal && (
                                        <DepositWithdrawModal
                                            showModal={showDepositAndWidthdrawModal}
                                            setShowModal={setShowDepositAndWidthdrawModal}
                                            transactionType={transactionType}
                                        />
                                    )}
                                </div>
                            </div>
                            <table className="my-3">
                                <tbody>
                                    {my_assets.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="d-flex align-items-center ps-2">
                                                <img
                                                    src={item.icon}
                                                    alt="coin icon"
                                                    className="me-2"
                                                />
                                                <div>
                                                    <p className="coin-abbr text-light">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="coin-price fw-bold">
                                                    {item.amount} {item.abbr}
                                                </p>
                                                <p className="coin-percent">
                                                    {numberWithCommas(item.price)}$
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="section-history__right col-lg-8 col-md-7">
                        <Tabs onSelect={() => setState({ detail_show: false })}>
                            <div className="tab-top">
                                <TabList>
                                    <Tab>market</Tab>
                                    <Tab>stake</Tab>
                                    <Tab>referral</Tab>
                                    <Tab>airdrops</Tab>
                                    <Tab>transaction</Tab>
                                    <Tab>bid activity</Tab>
                                </TabList>
                            </div>
                            <TabPanel>
                                <MarketTab />
                            </TabPanel>
                            <TabPanel className="px-0">
                                <StakeTab />
                            </TabPanel>
                            <TabPanel>
                                <ReferralTab />
                            </TabPanel>
                            <TabPanel>
                                <table
                                    className={`${
                                        detail_show &&
                                        (size.width > 1024 || size.width <= 576) &&
                                        "d-none"
                                    }`}
                                >
                                    <thead>
                                        <tr>
                                            <th className="w-50">Airdrop</th>
                                            <th>Status</th>
                                            <th className="laptop-not">End</th>
                                            <th>Reward</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airdrops.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="airdrop-link"
                                                onClick={() => {
                                                    handleClick(idx)
                                                    setState({ airdropModal: true })
                                                }}
                                            >
                                                <td className="w-50">
                                                    <div className="d-flex align-items-start ps-2">
                                                        <img
                                                            src={item.icon}
                                                            alt="coin icon"
                                                            className="me-2"
                                                        />
                                                        <div>
                                                            <p className="coin-abbr">{item.name}</p>
                                                            <p className="coin-name mobile-not">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className={
                                                        item.status === "Active"
                                                            ? "coin-status active"
                                                            : "coin-status deactive"
                                                    }
                                                >
                                                    {item.status}
                                                </td>
                                                <td className="laptop-not">{item.end}</td>
                                                <td className="coin-reward">={item.reward} USD</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <AirdropDetail
                                    clsName={
                                        (size.width > 1024 || size.width <= 576) && detail_show
                                            ? "d-block"
                                            : "d-none"
                                    }
                                    airdrop={airdrops[index]}
                                    onJoinClick={handleJoinAirdrop}
                                />
                            </TabPanel>
                            <TabPanel>
                                <Transactions />
                            </TabPanel>
                            <TabPanel>
                                <BidActivityTab />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setState({ modalIsOpen: false })}
                ariaHideApp={false}
                className="deposit-modal"
                overlayClassName="deposit-modal__overlay"
            >
                <div className="pwd-modal__header">
                    Desposits and withdrawals
                    <div
                        onClick={() => setState({ modalIsOpen: false })}
                        onKeyDown={() => setState({ modalIsOpen: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <Select
                    className="cryptocoin-select"
                    options={coins}
                    value={coin}
                    onChange={(v) => setState({ coin: v })}
                    components={{
                        Option: IconOption,
                        SingleValue: SelectedValue,
                    }}
                />
                <Tabs className="deposit-tab">
                    <TabList>
                        <Tab>Deposit</Tab>
                        <Tab>Withdraw</Tab>
                    </TabList>
                    <TabPanel className="deposit-panel">
                        <CopyToClipboard
                            onCopy={() => setState({ copied: true })}
                            text={copyText}
                            options={{ message: "copied" }}
                        >
                            <div
                                className="clipboard"
                                onClick={() => setState({ copied: true })}
                                onKeyDown={() => setState({ copied: true })}
                                role="presentation"
                            >
                                <div>
                                    <p>Deposit Address</p>
                                    <code>{copyText}</code>
                                </div>
                                <img src={Copy2} alt="copy" />
                            </div>
                        </CopyToClipboard>
                        {copied ? <span style={{ color: "white" }}>Copied.</span> : null}
                        <div className="bitcoin-address">
                            <img src={Address} alt="bitcoin address" />
                            <p>Send only Bitcoin to this deposit adress</p>
                        </div>
                        <button className="btn-second w-100">Share Address</button>
                    </TabPanel>
                    <TabPanel className="withdraw-panel">
                        <Input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={handleInput}
                            placeholder="Deposit amount"
                        />
                        <div className="my-3">
                            <div className="available-balance">
                                <p>Available balance</p>
                                <p>5.0054 BTC</p>
                            </div>
                            <div className="minimum-transfer">
                                <p>Minimum transfer</p>
                                <p>0.00200 BTC</p>
                            </div>
                        </div>
                        <Select
                            className="cryptocoin-select"
                            options={coins}
                            value={coin}
                            onChange={(v) => setState({ coin: v })}
                            components={{
                                Option: IconOption,
                                SingleValue: SelectedValue,
                            }}
                        />
                        <button className="btn-second w-100">Withdraw</button>
                    </TabPanel>
                </Tabs>
            </Modal>
            <Modal
                isOpen={airdropModal}
                onRequestClose={() => setState({ airdropModal: false })}
                ariaHideApp={false}
                className="airdrop-modal"
                overlayClassName="airdrop-modal__overlay"
            >
                <div className="tfa-modal__header">
                    <div
                        onClick={() => setState({ airdropModal: false })}
                        onKeyDown={() => setState({ airdropModal: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <AirdropDetail
                    clsName={size.width <= 1024 && airdropModal ? "d-block" : "d-none"}
                    airdrop={airdrops[index]}
                    onJoinClick={handleJoinAirdrop}
                />
            </Modal>
            <Modal
                isOpen={joinAirdrop}
                onRequestClose={() => setState({ joinAirdrop: false })}
                ariaHideApp={false}
                className="join-modal"
                overlayClassName="join-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <div className="d-flex align-items-center">
                        <img
                            src={airdrops[index].icon}
                            alt="coin icon"
                            className="detail-header__icon me-2"
                        />
                        <p className="detail-header__name">{airdrops[index].name}</p>
                    </div>

                    <div
                        onClick={() => setState({ joinAirdrop: false })}
                        onKeyDown={() => setState({ joinAirdrop: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <div className="join-airdrop">
                    <ul className="join-list">
                        {joins.map((item, idx) => (
                            <li key={idx}>
                                <p>{item.label}</p>
                                <button className="btn-green">{item.btnName}</button>
                            </li>
                        ))}
                    </ul>
                    <div className="my-3">
                        <Input
                            type="text"
                            name="facebook_handle"
                            label="Facebook handle "
                            value={facebook_handle}
                            onChange={handleInput}
                            placeholder="Enter Facebook handle"
                        />
                        <Input
                            type="text"
                            name="telegram_handle"
                            label="Facebook handle "
                            value={telegram_handle}
                            onChange={handleInput}
                            placeholder="Enter Telegram"
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn-primary">Join Airdrop</button>
                    </div>
                </div>
            </Modal>
        </main>
    )
}

export default History
