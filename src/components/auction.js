import React, { useReducer, useEffect, useState } from "react"
import { navigate } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Slider from "rc-slider"
import Select from "react-select"
import Modal from "react-modal"
import Header from "./header"
import { useQuery, useMutation } from "@apollo/client"
import {
    numberWithCommas,
    numberWithLength,
    getTimeDiffOverall,
    getDiffOverall,
    getFormatedDate,
    isInbetween,
} from "../utilities/number"
import { ChartIcon, Qmark, CloseIcon } from "../utilities/imgImport"
import { useWindowSize } from "../utilities/customHook"
import { PLACE_BID } from "../apollo/graghqls/mutations/Bid"
import {
    GET_AUCTION,
    GET_AUCTION_BY_NUMBER,
    GET_BIDLIST_BY_ROUND,
    GET_BID_LIST,
} from "../apollo/graghqls/querys/Auction"
import { GET_ROUND_CHANCE, GET_ROUND_PERFORMANCE2 } from "../apollo/graghqls/querys/Statistics"
import { Currencies } from "../utilities/staticData"
import { User } from "../utilities/user-data"
import BidsChart1 from "./chart/BidsChart1"
import RoundsChart1 from "./chart/RoundsChart1"
import RoundsChart2 from "./chart/RoundsChart2"

import TimeframeBar from "./auction/TimeframeBar"
import { ROUTES } from "../utilities/routes"
import BidsChart2 from "./chart/BidsChart2"
import ChanceChart from "./chart/ChanceChart"

const ndb_token = `Since the beginning of NDB's project the vision is to provide clean green technologies to the world. The NDB token is not a security token nor does it represent any shares of NDB SA.

By using NDB token you will be able to contribute to the development of our technologies and our vision. We plan to expand our ecosystem to multiple areas including deep space exploration, sustainable fashion, quantum computing, and more. 
`

const options = [
    { value: "bid_performance", label: "BIDS PERFORMANCE" },
    { value: "round_performance", label: "ROUNDS PERFORMANCE" },
    { value: "round_chance", label: "CHANCE" },
]

const Auction = () => {
    const size = useWindowSize()

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        tabIndex: 0,
        amount: 1,
        price: 1,
        total: "",
        place_bid: true,
        bidModal: false,
        show_chart: false,
        selectLabel: options[0],
    })

    // set chart type
    const [pricce, setPrice] = useState(true)
    const [volume, setVolume] = useState(true)
    const [price_volume, setPriceVolume] = useState(false)

    const [reser_price, setReserPrice] = useState(true)
    const [sold_price, setSoldPrice] = useState(true)
    const [performance, setPerformance] = useState(false)

    const { tabIndex, amount, price, place_bid, bidModal, show_chart, selectLabel } = state
    const [selectedData, setSelectedData] = useState(1)
    const { data } = useQuery(GET_AUCTION)

    const roundData = data?.getAuctions?.filter(
        (item) => (item.status === 2 || item.status === 0) && item
    )

    // get round based data
    const { data: roundM } = useQuery(GET_AUCTION_BY_NUMBER, {
        variables: { round: roundData && roundData[0].number },
    })
    const { data: roundH } = useQuery(GET_AUCTION_BY_NUMBER, {
        variables: { round: roundData && roundData[0]?.number + 1 },
    })
    const { data: roundL } = useQuery(GET_AUCTION_BY_NUMBER, {
        variables: { round: roundData && roundData[0]?.number - 1 },
    })

    // get history bids
    const { data: historyBidListM } = useQuery(GET_BIDLIST_BY_ROUND, {
        variables: { round: roundData && roundData[0].number },
    })
    const { data: historyBidListH } = useQuery(GET_BIDLIST_BY_ROUND, {
        variables: { round: roundData && roundData[0]?.number + 1 },
    })
    const { data: historyBidListL } = useQuery(GET_BIDLIST_BY_ROUND, {
        variables: { round: roundData && roundData[0]?.number - 1 },
    })

    // get chart data
    const round_chance = useQuery(GET_ROUND_CHANCE)
    const round_perform1 = useQuery(GET_AUCTION)
    const round_perform2 = useQuery(GET_ROUND_PERFORMANCE2)
    const bid_perform = useQuery(GET_BID_LIST)

    const fnSelectedRoundData = () =>
        selectedData === 0
            ? roundL?.getAuctionByNumber
            : selectedData === 1
            ? roundM?.getAuctionByNumber
            : roundH?.getAuctionByNumber

    const fnSelectedBidhistoryData = () =>
        selectedData === 0
            ? historyBidListL?.getBidListByRound
            : selectedData === 1
            ? historyBidListM?.getBidListByRound
            : historyBidListH?.getBidListByRound

    const fnAverateMinBid = () => {
        let hData = fnSelectedBidhistoryData()

        if (hData === undefined) {
            return 0
        }

        if (hData.length === 0) {
            return 0
        } else {
            let totalValue = 0
            hData.map((item) => (totalValue = +item.totalPrice))
            return totalValue
        }
    }

    const distanceToDate = getTimeDiffOverall(
        fnSelectedRoundData()?.startedAt,
        fnSelectedRoundData()?.endedAt
    ) // 86400
    const duration = getDiffOverall(
        fnSelectedRoundData()?.startedAt,
        fnSelectedRoundData()?.endedAt
    ) //getSecTomorrow()
    const percentage = (distanceToDate / duration) * 100

    const [PlaceBid] = useMutation(PLACE_BID, {
        onCompleted: (data) => {
            console.log("received Mutation data", data)
            setState({ place_bid: true })
        },
        onError: (err) => {
            console.log("received Mutation data", err)
            setState({ place_bid: true })
        },
    })

    useEffect(() => {
        const id = setInterval(() => {
            setState({
                curTime: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                },
            })
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [])

    return (
        <main className="auction-page">
            <Header />
            <section className="section-auction container">
                <div className="current-round">
                    <div>
                        <h4>Round {roundData && roundData[0]?.number}</h4>
                        <p>
                            Token Available <span>{roundData && roundData[0]?.token}</span>
                        </p>
                    </div>
                    <img
                        src={ChartIcon}
                        alt="chart"
                        className="show-chart"
                        onClick={() => setState({ show_chart: !show_chart })}
                        onKeyDown={() => setState({ show_chart: !show_chart })}
                        role="presentation"
                    />
                </div>
                <div className="row h-100">
                    <div
                        className={`auction-left col-lg-4 col-md-5 ${
                            show_chart ? "d-none" : "d-block"
                        }`}
                    >
                        {roundM?.getAuctionByNumber && (
                            <Tabs
                                className="round-tab"
                                selectedIndex={selectedData}
                                onSelect={(index) => {
                                    if (index !== selectedData) {
                                        setState({ price: 0, amount: 0 })
                                        setSelectedData(index)
                                    }
                                }}
                            >
                                (
                                <TabList>
                                    <Tab>Round {roundL?.getAuctionByNumber?.number}</Tab>
                                    <Tab>Round {roundM?.getAuctionByNumber?.number}</Tab>
                                    <Tab>Round {roundH?.getAuctionByNumber?.number}</Tab>
                                </TabList>
                                )
                                <TabPanel>
                                    Token Available{" "}
                                    <span className="fw-bold">{fnSelectedRoundData()?.token}</span>
                                </TabPanel>
                                <TabPanel>
                                    Token Available{" "}
                                    <span className="fw-bold">{fnSelectedRoundData()?.token}</span>
                                </TabPanel>
                                <TabPanel>
                                    Token Available{" "}
                                    <span className="fw-bold">{fnSelectedRoundData()?.token}</span>
                                </TabPanel>
                            </Tabs>
                        )}
                        <Tabs
                            className="statistics-tab"
                            selectedIndex={tabIndex}
                            onSelect={(index) => setState({ tabIndex: index })}
                        >
                            <TabList>
                                {fnSelectedRoundData()?.status === 2 ? (
                                    <>
                                        <Tab>statistics</Tab>
                                        <Tab>bids history</Tab>
                                        <Tab>ndb token</Tab>
                                    </>
                                ) : (
                                    <>
                                        <Tab>ndb token</Tab>
                                        <Tab>bids history</Tab>
                                        <Tab>statistics</Tab>
                                    </>
                                )}
                            </TabList>
                            {fnSelectedRoundData()?.status === 2 ? (
                                <>
                                    <TabPanel>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Highest Bid Per Token</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fnSelectedBidhistoryData()?.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{getFormatedDate(item.placedAt)}</td>
                                                        <td>
                                                            {item.totalPrice}
                                                            <span className="txt-green"> $</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </TabPanel>
                                    <TabPanel>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Placement</th>
                                                    <th>Highest Bid Per Token</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fnSelectedBidhistoryData()?.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>
                                                            {item.totalPrice}
                                                            <span className="txt-green"> $</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className="text">{ndb_token}</p>
                                    </TabPanel>
                                </>
                            ) : (
                                <>
                                    <TabPanel>
                                        <p className="text">{ndb_token}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Placement</th>
                                                    <th>Highest Bid Per Token</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fnSelectedBidhistoryData()?.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>
                                                            {item.totalPrice}
                                                            <span className="txt-green"> $</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </TabPanel>
                                    <TabPanel>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Highest Bid Per Token</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fnSelectedBidhistoryData()?.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{getFormatedDate(item.placedAt)}</td>
                                                        <td>
                                                            {item.totalPrice}
                                                            <span className="txt-green"> $</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </TabPanel>
                                </>
                            )}
                        </Tabs>
                        {isInbetween(
                            fnSelectedRoundData()?.startedAt,
                            fnSelectedRoundData()?.endedAt
                        ) && <TimeframeBar percentage={percentage} round={fnSelectedRoundData()} />}
                        <div className="d-flex justify-content-between mt-4">
                            {fnAverateMinBid() !== 0 ? (
                                <div>
                                    <p className="caption">Minimum bid</p>
                                    <p className="value">
                                        {fnAverateMinBid()}
                                        <span className="txt-green"> $</span>{" "}
                                    </p>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div>
                                <p className="caption">Available Until</p>
                                <p className="value">
                                    {numberWithLength(
                                        parseInt(
                                            new Date(fnSelectedRoundData()?.endedAt).getHours()
                                        )
                                    )}
                                    :
                                    {numberWithLength(
                                        parseInt(
                                            new Date(fnSelectedRoundData()?.endedAt).getMinutes()
                                        )
                                    )}
                                    :
                                    {numberWithLength(
                                        parseInt(
                                            new Date(fnSelectedRoundData()?.endedAt).getSeconds()
                                        )
                                    )}
                                </p>
                            </div>
                        </div>
                        {size.width <= 1024 && (
                            <div className="text-center my-5">
                                <button
                                    className="btn-primary btn-increase"
                                    onClick={() => setState({ bidModal: true })}
                                >
                                    {!place_bid ? "Place Bid" : "Increase bid"}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="auction-right col-lg-8 col-md-7">
                        <div className={`place-bid ${place_bid && "d-none"}`}>
                            <h3 className="range-label">amount of token</h3>
                            <div className="d-flex align-items-center mb-4">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setState({ amount: e.target.value })}
                                    className="range-input"
                                />
                                <Slider
                                    value={amount}
                                    onChange={(value) => setState({ amount: value })}
                                    min={1}
                                    max={fnSelectedRoundData()?.token}
                                    step={1}
                                />
                            </div>
                            <h3 className="range-label">Per token price</h3>
                            <div className="d-flex align-items-center mb-4">
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setState({ price: e.target.value })}
                                    className="range-input"
                                />
                                <Slider
                                    value={price}
                                    onChange={(value) => setState({ price: value })}
                                    min={fnSelectedRoundData()?.minPrice}
                                    max={10000}
                                    step={100}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="range-label">Total price</span>
                                <input
                                    className="total-input"
                                    type="text"
                                    value={numberWithCommas(price * amount, " ")}
                                    readOnly
                                />
                                <h3 className="symbol-label">
                                    {Currencies[User.selectedCurrencyId].symbol}
                                </h3>
                            </div>
                            <button
                                className="btn-primary text-uppercase w-100"
                                onClick={() => {
                                    // PlaceBid({
                                    //     variables: {
                                    //         roundId: fnSelectedRoundData()?.auctionId,
                                    //         tokenAmount: amount,
                                    //         tokenPrice: price,
                                    //         payment: 1,
                                    //         cryptoType: "String",
                                    //     },
                                    // })
                                    navigate(ROUTES.payment)
                                }}
                            >
                                {!place_bid ? "Place Bid" : "Increase Bid"}
                            </button>
                        </div>
                        <div
                            className={`chart-area ${
                                size.width <= 768
                                    ? show_chart
                                        ? "d-block"
                                        : "d-none"
                                    : (size.width <= 1024 && size.width > 768 && "d-block") ||
                                      (place_bid && "d-block")
                            }`}
                        >
                            <div className="">
                                <div className="d-flex ">
                                    <div className="w-100">
                                        <Select
                                            className="select-chart-type"
                                            options={options}
                                            value={selectLabel}
                                            onChange={(v) => setState({ selectLabel: v })}
                                        />
                                        {selectLabel.value === "bid_performance" && (
                                            <div className="d-flex align-items-center pt-3 w-100 ">
                                                <button
                                                    className={`btn-small ${
                                                        pricce ? "btn-disabled" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (!pricce) {
                                                            setPrice(true)
                                                            setVolume(true)
                                                            setPriceVolume(false)
                                                        }
                                                    }}
                                                >
                                                    Price
                                                </button>
                                                <button
                                                    className={`btn-small ${
                                                        volume ? "btn-disabled" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (!volume) {
                                                            setPrice(true)
                                                            setVolume(true)
                                                            setPriceVolume(false)
                                                        }
                                                    }}
                                                >
                                                    Volume
                                                </button>
                                                <button
                                                    className={`btn-small ${
                                                        price_volume ? "btn-disabled" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (!price_volume) {
                                                            setPrice(false)
                                                            setVolume(false)
                                                            setPriceVolume(true)
                                                        }
                                                    }}
                                                >
                                                    Price Volume
                                                </button>
                                            </div>
                                        )}
                                        {selectLabel.value === "round_performance" && (
                                            <div className="d-flex align-items-center pt-3 w-100 ">
                                                <button
                                                    className={`btn-small ${
                                                        reser_price ? "btn-disabled" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (!reser_price) {
                                                            setReserPrice(true)
                                                            setSoldPrice(true)
                                                            setPerformance(false)
                                                        }
                                                    }}
                                                >
                                                    Reserved Price
                                                </button>
                                                <button
                                                    className={`btn-small ${
                                                        sold_price ? "btn-disabled" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (!sold_price) {
                                                            setReserPrice(true)
                                                            setSoldPrice(true)
                                                            setPerformance(false)
                                                        }
                                                    }}
                                                >
                                                    Price Sold
                                                </button>
                                                <button
                                                    className={`btn-small ${
                                                        performance ? "btn-disabled" : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (!performance) {
                                                            setReserPrice(false)
                                                            setSoldPrice(false)
                                                            setPerformance(true)
                                                        }
                                                    }}
                                                >
                                                    Performance
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <img
                                        src={Qmark}
                                        alt="question"
                                        className="ms-3 d-none d-sm-block"
                                    />
                                </div>
                            </div>
                            {/* <p className="select-label">{selectLabel.label}</p> */}

                            {selectLabel.value === "bid_performance" &&
                                pricce &&
                                volume &&
                                !bid_perform.loading &&
                                !bid_perform.error && <BidsChart1 data={bid_perform?.data} />}
                            {selectLabel.value === "bid_performance" &&
                                price_volume &&
                                !bid_perform.loading &&
                                !bid_perform.error && <BidsChart2 data={bid_perform?.data} />}

                            {selectLabel.value === "round_performance" &&
                                reser_price &&
                                sold_price &&
                                !round_perform1.loading &&
                                !round_perform1.error && (
                                    <RoundsChart1 data={round_perform1?.data} />
                                )}
                            {selectLabel.value === "round_performance" &&
                                performance &&
                                !round_perform2.loading &&
                                !round_perform2.error && (
                                    <RoundsChart2 data={round_perform2?.data} />
                                )}
                            {selectLabel.value === "round_chance" &&
                                !round_chance.loading &&
                                !round_chance.error && <ChanceChart data={round_chance?.data} />}
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={bidModal}
                onRequestClose={() => setState({ bidModal: false })}
                ariaHideApp={false}
                className="place-bid"
                overlayClassName="place-bid__overlay"
            >
                <div className="tfa-modal__header">
                    <div
                        onClick={() => setState({ bidModal: false })}
                        onKeyDown={() => setState({ bidModal: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                <div className="desktop-view">
                    <h3 className="range-label">amount of Token</h3>
                    <div className="d-flex align-items-center mb-4">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setState({ amount: e.target.value })}
                            className="range-input"
                        />
                        <Slider
                            value={amount}
                            onChange={(value) => setState({ amount: value })}
                            min={1}
                            max={fnSelectedRoundData()?.token}
                            step={1}
                        />
                    </div>
                    <h3 className="range-label">Per token price</h3>
                    <div className="d-flex align-items-center mb-4">
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setState({ price: e.target.value })}
                            className="range-input"
                        />
                        <Slider
                            value={price}
                            onChange={(value) => setState({ price: value })}
                            min={fnSelectedRoundData()?.minPrice}
                            max={10000}
                            step={100}
                        />
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="range-label">Total price</span>
                        <input
                            className="total-input"
                            type="number"
                            value={price * amount}
                            readOnly
                        />
                    </div>
                    <button
                        className="btn-primary text-uppercase w-100"
                        onClick={() => {
                            setState({ place_bid: true })
                            setState({ bidModal: false })
                            navigate(ROUTES.payment)
                        }}
                    >
                        {!place_bid ? "Place Bid" : "Increase Bid"}
                    </button>
                </div>
                <div className="tablet-view">
                    <h4 className="range-label">amount of Token</h4>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setState({ amount: e.target.value })}
                        placeholder="Type the Token Amount Here"
                        className="range-input"
                    />
                    <h4 className="range-label">Per token price</h4>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setState({ price: e.target.value })}
                        placeholder="Type the price per Token Here"
                        className="range-input"
                    />
                    <h4 className="range-label">Total price</h4>
                    <input className="total-input" type="number" value={price * amount} readOnly />
                    <button
                        className="btn-primary text-uppercase"
                        onClick={() => {
                            setState({ total: price * amount })
                            setState({ bidModal: false })
                            setState({ place_bid: true })
                            navigate(ROUTES.payment)
                        }}
                    >
                        {!place_bid ? "Place Bid" : "Increase Bid"}
                    </button>
                </div>
            </Modal>
        </main>
    )
}

export default Auction
