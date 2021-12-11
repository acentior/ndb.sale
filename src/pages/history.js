import React, { useState, useReducer, useCallback } from "react"
import Header from "../components/common/header"
import Select, { components } from "react-select"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { numberSign, numberWithCommas } from "../utilities/number"
import {
    BTC,
    BCH,
    DAI,
    DOGE,
    ETH,
    LTC,
    USDC,
    NDB,
    Airdrop,
    Address,
    Copy2,
    CloseIcon,
} from "../utilities/imgImport"
import { Link } from "gatsby"
import CountDown from "../components/common/countdown"
import Modal from "react-modal"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Input } from "../components/common/FormControl"

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
        price: -3500,
    },
    {
        name: "Transaction Name",
        date: "10.06.2021 11:05",
        price: 3500,
    },
]
const market_data = [
    {
        icon: ETH,
        abbr: "ETH",
        name: "Ethereum",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: BTC,
        abbr: "BTC",
        name: "Bitcoin",
        price: 282004.43,
        percent: -2.2,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: BCH,
        abbr: "BCH",
        name: "Bitcoin Cash",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: DAI,
        abbr: "DAI",
        name: "Dai",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$1,7B",
    },
    {
        icon: DOGE,
        abbr: "DOGE",
        name: "Dogecoin",
        price: 282004.43,
        percent: -1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: USDC,
        abbr: "USDC",
        name: "USD Coin",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
    },
    {
        icon: LTC,
        abbr: "LTC",
        name: "Litecoin",
        price: 282004.43,
        percent: 1.9,
        chart: "",
        volume: "$28,6B",
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
const bids = [
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 55",
        date: "2021.04.30",
        bid: 360000,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
    {
        name: "NDB Presale round 55",
        date: "2021.04.30",
        bid: 360000,
    },
    {
        name: "NDB Presale round 80",
        date: "2021.05.02",
        bid: 4500,
    },
]
const coins = [
    { value: "eth", label: "Ethereum", icon: ETH },
    { value: "btc", label: "Bitcoin", icon: BTC },
    { value: "doge", label: "Dogecoin", icon: DOGE },
]
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
    const copyText = "kjY602GgjsKP23mhs09oOp63bd3n34fsla"
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        amount: "",
    })
    const { amount } = state
    const [detail_show, setShow] = useState(false)
    const [index, setIndex] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [coin, setCoin] = useState(coins[0])
    const [copied, setCopied] = useState(false)

    const handleClick = (idx) => {
        setShow(true)
        setIndex(idx)
    }
    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])
    return (
        <main className="history-page">
            <Header />
            <section className="section-history container">
                <div className="section-history__left col-lg-4">
                    <Tabs>
                        <TabList>
                            <Tab>Bid activity</Tab>
                            <Tab>WALLET</Tab>
                        </TabList>
                        <TabPanel>
                            <ul className="bid-activity">
                                {bids.map((item, idx) => (
                                    <li
                                        className="d-flex align-items-center justify-content-between"
                                        key={idx}
                                    >
                                        <div>
                                            <p className="bid-name">{item.name}</p>
                                            <p className="bid-date">{item.date}</p>
                                        </div>
                                        <p className="bid-price">
                                            {numberWithCommas(item.bid)}
                                            <span className="txt-green"> T</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <div className="d-flex justify-content-end">
                                <Link to="/" className="verify-link">
                                    Get verified
                                </Link>
                            </div>
                            <div className="profile-value">
                                <h5>Portfolio value </h5>
                                <div className="value-box">
                                    <p className="value-label">Equity Value (BTC)</p>
                                    <p className="value">6.00</p>
                                    <p className="max-value">~ $282,004.43</p>
                                </div>
                            </div>
                            <div className="transaction-history">
                                <h5>Transactions history</h5>
                                {transactions.map((item, idx) => (
                                    <div className="transaction" key={idx}>
                                        <p className="transaction-date">{item.date}</p>
                                        <div className="d-flex justify-content-between">
                                            <p className="transaction-name">{item.name}</p>
                                            <p className="transaction-price">
                                                {numberSign(item.price) + item.price}$
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="section-history__right col-lg-8">
                    <Tabs onSelect={() => setShow(false)}>
                        <div className="tab-top">
                            <TabList>
                                <Tab>MY ASSETS</Tab>
                                <Tab>market</Tab>
                                <Tab>AirdropS</Tab>
                            </TabList>
                            <Link to="/" className="verify-link">
                                Get verified
                            </Link>
                        </div>
                        <TabPanel>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Crypto Assets</th>
                                        <th>Amount</th>
                                        <th>Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {my_assets.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="d-flex align-items-start">
                                                <img src={item.icon} alt="coin icon" />
                                                <div>
                                                    <p className="coin-abbr">{item.abbr}</p>
                                                    <p className="coin-name">{item.name}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="coin-price">{item.amount}</p>
                                                <p className="coin-percent">
                                                    ${numberWithCommas(item.price)}
                                                </p>
                                            </td>
                                            <td className="coin-operations">
                                                <p
                                                    onClick={() => setIsOpen(true)}
                                                    onKeyDown={() => setIsOpen(true)}
                                                    role="presentation"
                                                    className="operation-link"
                                                >
                                                    Deposit
                                                </p>
                                                <p
                                                    onClick={() => setIsOpen(true)}
                                                    onKeyDown={() => setIsOpen(true)}
                                                    role="presentation"
                                                    className="operation-link"
                                                >
                                                    Withdraw
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-center mt-5">
                                <button className="btn-primary">CONNECT TO EXTERNAL WALLET</button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th className="mobile-not">Price Chart</th>
                                        <th className="mobile-not">Volume (24h)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {market_data.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="d-flex align-items-start">
                                                <img src={item.icon} alt="coin icon" />
                                                <div>
                                                    <p className="coin-abbr">{item.abbr}</p>
                                                    <p className="coin-name">{item.name}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="coin-price">
                                                    ${numberWithCommas(item.price)}
                                                </p>
                                                <p
                                                    className={
                                                        numberSign(item.percent) === "+"
                                                            ? "coin-percent txt-green"
                                                            : "coin-percent txt-red"
                                                    }
                                                >
                                                    {numberSign(item.percent) + item.percent}%
                                                </p>
                                            </td>
                                            <td className="mobile-not">{item.chart}</td>
                                            <td className="mobile-not">{item.volume}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </TabPanel>
                        <TabPanel>
                            {!detail_show ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Airdrop</th>
                                            <th>Status</th>
                                            <th className="mobile-not">End</th>
                                            <th>Reward</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airdrops.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="airdrop-link"
                                                onClick={() => handleClick(idx)}
                                            >
                                                <td className="d-flex align-items-start">
                                                    <img src={item.icon} alt="coin icon" />
                                                    <div>
                                                        <p className="coin-abbr">{item.name}</p>
                                                        <p className="coin-name mobile-not">
                                                            {item.desc}
                                                        </p>
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
                                                <td className="mobile-not">{item.end}</td>
                                                <td className="coin-reward">={item.reward} USD</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className=" airdrop-detail">
                                    <div className="col-md-7 airdrop-detail__left">
                                        <div className="detail-header">
                                            <img
                                                src={airdrops[index].icon}
                                                alt="coin icon"
                                                className="detail-header__icon"
                                            />
                                            <div>
                                                <p className="detail-header__name">
                                                    {airdrops[index].name}
                                                </p>
                                                <p className="detail-header__end">
                                                    {airdrops[index].end}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="detail-body">
                                            <li>
                                                <p>Participants</p>
                                                <p className="value">
                                                    {airdrops[index].participants}
                                                </p>
                                            </li>
                                            <li>
                                                <p>Number of winners</p>
                                                <p className="value">{airdrops[index].winners}</p>
                                            </li>
                                            <li>
                                                <p>Airdrop amount</p>
                                                <p className="coin-reward">
                                                    = {airdrops[index].participants} USD
                                                </p>
                                            </li>
                                        </ul>
                                        <div className="detail-footer">
                                            <h6>How to participate?</h6>
                                            <ul>
                                                <li>Connect your MetaMask wallet</li>
                                                <li>
                                                    Connect your BitMEX API key via{" "}
                                                    <a
                                                        className="txt-green"
                                                        href="https://aluna.social/my/account/api_keys"
                                                    >
                                                        https://aluna.social/my/account/api_keys
                                                    </a>
                                                </li>
                                                <li>
                                                    Trade with at least $1,000 volume to qualify
                                                </li>
                                                <li>Follow Facebook account</li>
                                            </ul>
                                        </div>
                                        <Link className="read-more" to="/">
                                            Read more
                                        </Link>
                                    </div>
                                    <div className="col-md-5 airdrop-detail__right">
                                        <div className="time-remaining">
                                            <h5 className="pt-4">Time remaining</h5>
                                            <CountDown />
                                            <button className="btn-primary mb-4">
                                                Join airdrop
                                            </button>
                                        </div>
                                        <div className="about-company">
                                            <h6>About the company</h6>
                                            <p>
                                                ICON Foundation is leading ICON project, one of the
                                                largest blockchain networks in the world, launched
                                                in 2017 with the vision of ‘Hyperconnect the
                                                World’...
                                            </p>
                                            <Link className="read-more" to="/">
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                    </Tabs>
                </div>
            </section>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                className="deposit-modal"
                overlayClassName="doposit-modal__overlay"
            >
                <div className="pwd-modal__header">
                    Desposits and withdrawals
                    <div
                        onClick={() => setIsOpen(false)}
                        onKeyDown={() => setIsOpen(false)}
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
                    onChange={(v) => setCoin(v)}
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
                            onCopy={() => setCopied(true)}
                            text={copyText}
                            options={{ message: "copied" }}
                        >
                            <div
                                className="clipboard"
                                onClick={() => setCopied(true)}
                                onKeyDown={() => setCopied(true)}
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
                            onChange={(v) => setCoin(v)}
                            components={{
                                Option: IconOption,
                                SingleValue: SelectedValue,
                            }}
                        />
                        <button className="btn-second w-100">Withdraw</button>
                    </TabPanel>
                </Tabs>
            </Modal>
        </main>
    )
}

export default History
