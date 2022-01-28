/* eslint-disable */

import React, { useReducer, useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Slider from "rc-slider"
import Select from "react-select"
import Modal from "react-modal"
import ReactTooltip from "react-tooltip"
import axios from "axios"

import Header from "./header"
import BidsChart1 from "./chart/BidsChart1"
import RoundsChart1 from "./chart/RoundsChart1"
import RoundsChart2 from "./chart/RoundsChart2"
import TimeframeBar from "./auction/TimeframeBar"
import { ROUTES } from "../utilities/routes"
import BidsChart2 from "./chart/BidsChart2"
import ChanceChart from "./chart/ChanceChart"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { setBidInfo, setCurrentRound } from "../redux/actions/bidAction"
import Loading from "./common/Loading"

import { ChartIcon, Qmark, CloseIcon } from "../utilities/imgImport"
import { useWindowSize } from "../utilities/customHook"
import { PLACE_BID } from "../apollo/graghqls/mutations/Bid"
import { GET_AUCTION, GET_AUCTION_BY_NUMBER } from "../apollo/graghqls/querys/Auction"
import { GET_BID, GET_BIDLIST_BY_ROUND, GET_BID_LIST } from "../apollo/graghqls/querys/Bid"
import { GET_ROUND_CHANCE, GET_ROUND_PERFORMANCE2 } from "../apollo/graghqls/querys/Statistics"
import {
    AUCTION_TOOLTIP_CONTENT1,
    AUCTION_TOOLTIP_CONTENT2,
    NDB_TOKEN_CONTENT,
    Currencies,
} from "../utilities/staticData"
import {
    numberWithCommas,
    numberWithLength,
    getTimeDiffOverall,
    getDiffOverall,
    isInbetween,
} from "../utilities/number"

const options = [
    { value: "bid_performance", label: "BIDS PERFORMANCE" },
    { value: "round_performance", label: "ROUNDS PERFORMANCE" },
    { value: "round_chance", label: "CHANCE" },
]

const Auction = () => {
    const dispatch = useDispatch()
    const size = useWindowSize()
    const currencyId = useSelector((state) => state?.placeBid.currencyId)
    const user = useSelector((state) => state.auth.user)

    //Get Auctions
    const { data } = useQuery(GET_AUCTION)
    const roundData = data?.getAuctions?.filter(
        (item) => (item.status === 2 || item.status === 0) && item
    )

    // set chart type
    const [pricce, setPrice] = useState(true)
    const [volume, setVolume] = useState(true)
    const [price_volume, setPriceVolume] = useState(false)
    const [ratio, setRatio] = useState({})
    const [ratioFetched, setRatioFetched] = useState(false)
    const [reser_price, setReserPrice] = useState(true)
    const [sold_price, setSoldPrice] = useState(true)
    const [performance, setPerformance] = useState(false)
    const [fnAverateMinBid, setfnAverateMinBid] = useState(0)
    const [auctionLoaded, setActionLoaded] = useState(false)

    const [selectedData, setSelectedData] = useState(1)
    const [period, setPeriod] = useState("1M")
    ////////////////////////

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        tabIndex: 0,
        amount: 1,
        price: 1,
        isBid: false,
        bidModal: false,
        show_chart: false,
        selectLabel: options[0],
    })
    const { tabIndex, amount, price, isBid, bidModal, show_chart, selectLabel } = state

    useEffect(() => {
        if (!auctionLoaded && roundData) {
            setActionLoaded(true)
            loadRoundMByNumber({
                variables: { round: roundData && roundData[0].round },
            })
            loadRoundHByNumber({
                variables: { round: roundData && roundData[0].round + 1 },
            })
            loadRoundLByNumber({
                variables: { round: roundData && roundData[0].round - 1 },
            })
            loadHistoryMByNumber({
                variables: { round: roundData && roundData[0].round },
            })
            loadHistoryHByNumber({
                variables: { round: roundData && roundData[0].round + 1 },
            })
            loadHistoryLByNumber({
                variables: { round: roundData && roundData[0].round - 1 },
            })
            loadBidMByNumber({
                variables: { round: roundData && roundData[0].round },
            })
            loadBidHByNumber({
                variables: { round: roundData && roundData[0].round + 1 },
            })
            loadBidLByNumber({
                variables: { round: roundData && roundData[0].round - 1 },
            })
            if (roundData[0]?.minPrice) {
                setState({ price: roundData[0]?.minPrice })
            }
        }
    }, [roundData])

    // console.log(roundData && roundData[0]?.minPrice)

    // get round based data
    const [loadRoundMByNumber, { data: roundM, error: mFetched }] =
        useLazyQuery(GET_AUCTION_BY_NUMBER)
    const [loadRoundHByNumber, { data: roundH, error: hFetched }] =
        useLazyQuery(GET_AUCTION_BY_NUMBER)
    const [loadRoundLByNumber, { data: roundL, error: lFetched }] =
        useLazyQuery(GET_AUCTION_BY_NUMBER)

    // get bids history
    const [loadHistoryMByNumber, { data: historyBidListM, error: hmFetched }] =
        useLazyQuery(GET_BIDLIST_BY_ROUND)
    const [loadHistoryLByNumber, { data: historyBidListL, error: hlFetched }] =
        useLazyQuery(GET_BIDLIST_BY_ROUND)
    const [loadHistoryHByNumber, { data: historyBidListH, error: hhFetched }] =
        useLazyQuery(GET_BIDLIST_BY_ROUND)

    // get my bid
    const [loadBidMByNumber, { data: bidListM, error: bmFetched }] = useLazyQuery(GET_BID)
    const [loadBidLByNumber, { data: bidListL, error: blFetched }] = useLazyQuery(GET_BID)
    const [loadBidHByNumber, { data: bidListH, error: bhFetched }] = useLazyQuery(GET_BID)

    const loading = useMemo(() => {
        if (
            roundData &&
            !!(mFetched || roundM) &&
            !!(hFetched || roundH) &&
            !!(lFetched || roundL) &&
            !!(hmFetched || historyBidListM) &&
            !!(hhFetched || historyBidListH) &&
            !!(hlFetched || historyBidListL) &&
            !!(bmFetched || bidListM) &&
            !!(blFetched || bidListL) &&
            !!(bhFetched || bidListH) &&
            ratioFetched
        ) {
            return false
        } else {
            return true
        }
    }, [
        roundData,
        mFetched,
        hFetched,
        lFetched,
        hmFetched,
        hhFetched,
        hlFetched,
        ratioFetched,
        roundM,
        roundH,
        roundL,
        historyBidListM,
        historyBidListH,
        historyBidListL,
        bmFetched,
        blFetched,
        bhFetched,
        bidListM,
        bidListL,
        bidListH,
    ])

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

    const hData = fnSelectedBidhistoryData()

    const distanceToDate = getTimeDiffOverall(
        fnSelectedRoundData()?.startedAt,
        fnSelectedRoundData()?.endedAt
    )
    const duration = getDiffOverall(
        fnSelectedRoundData()?.startedAt,
        fnSelectedRoundData()?.endedAt
    ) //getSecTomorrow()
    const percentage = (distanceToDate / duration) * 100

    const [PlaceBid] = useMutation(PLACE_BID, {
        onCompleted: (data) => {
            console.log("received Mutation data", data)
        },
        onError: (err) => {
            console.log("received Mutation data", err)
        },
    })

    const calcRatio = (from, to, value) => {
        if (!ratioFetched) {
            fetchRatio()
            return Number(value).toFixed(2)
        }
        if (from === "usd" && to === "usd") return value
        else if (from === "usd") return Number(ratio[to] * value).toFixed(2)
        else if (to === "usd") return Number(value / ratio[from]).toFixed(2)
        else return Number((value / ratio[from]) * ratio[to]).toFixed(2)
    }

    const calcPriceFromUsd = (price) => {
        return calcRatio("usd", Currencies[currencyId].label.toLowerCase(), price)
    }
    const calcPriceToUsd = (price) => {
        return calcRatio(Currencies[currencyId].label.toLowerCase(), "usd", price)
    }

    useEffect(() => {
        if (hData === undefined) {
            setfnAverateMinBid(0)
        } else if (hData.length === 0) {
            setfnAverateMinBid(0)
        } else {
            let totalValue = 0
            hData.map((item) => (totalValue = +item.totalPrice))
            setfnAverateMinBid(
                calcRatio("usd", Currencies[currencyId].label.toLowerCase(), totalValue)
            )
        }
    }, [currencyId, hData, ratioFetched])

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

        fetchRatio()

        return () => {
            clearInterval(id)
        }
    }, [])

    const fetchRatio = () => {
        axios
            .get(
                "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
            )
            .then((res) => {
                if (res.data?.usd) {
                    setRatio(res.data.usd)
                    setRatioFetched(true)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const bidMutation = () => {
        PlaceBid({
            variables: {
                roundId: fnSelectedRoundData()?.id,
                tokenAmount: amount * amount,
                tokenPrice: Math.max(fnSelectedRoundData()?.minPrice, price),
                payment: 1,
                cryptoType: "BTC",
            },
        })
        dispatch(
            setBidInfo(
                numberWithCommas(Number(Math.max(fnSelectedRoundData()?.minPrice, price * amount)))
            )
        )
        dispatch(setCurrentRound(fnSelectedRoundData()?.id))
        navigate(ROUTES.payment)
    }

    useEffect(() => {
        setState({
            price: fnSelectedRoundData()?.minPrice,
            amount: 1,
        })
    }, [selectedData])

    if (loading) return <Loading />
    else
        return (
            <main className="auction-page">
                <Header />
                <section className="section-auction container">
                    <div className="current-round">
                        <div>
                            <h4>Round {roundData && roundData[0]?.round}</h4>
                            <p>
                                Token Available <span>{roundData && roundData[0]?.totalToken}</span>
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
                            className={`auction-left col-lg-4 col-md-5 position-relative ${
                                show_chart ? "d-none" : "d-block"
                            }`}
                        >
                            <div className="d-flex">
                                <div className="w-100">
                                    {/* {roundM?.getAuctionByNumber && ( */}
                                    <Tabs
                                        className="round-tab"
                                        selectedIndex={selectedData}
                                        onSelect={(index) => setSelectedData(index)}
                                    >
                                        <TabList>
                                            <Tab>Round {roundL?.getAuctionByNumber?.round}</Tab>
                                            <Tab>Round {roundM?.getAuctionByNumber?.round}</Tab>
                                            <Tab>Round {roundH?.getAuctionByNumber?.round}</Tab>
                                        </TabList>

                                        <TabPanel>
                                            Token Available{" "}
                                            <span className="fw-bold">
                                                {fnSelectedRoundData()?.totalToken}
                                            </span>
                                        </TabPanel>
                                        <TabPanel>
                                            Token Available{" "}
                                            <span className="fw-bold">
                                                {fnSelectedRoundData()?.totalToken}
                                            </span>
                                        </TabPanel>
                                        <TabPanel>
                                            Token Available{" "}
                                            <span className="fw-bold">
                                                {fnSelectedRoundData()?.totalToken}
                                            </span>
                                        </TabPanel>
                                    </Tabs>
                                    {/* )} */}
                                    <Tabs
                                        className="statistics-tab"
                                        selectedIndex={tabIndex}
                                        onSelect={(index) => setState({ tabIndex: index })}
                                    >
                                        <TabList>
                                            <Tab onClick={() => setState({ isBid: false })}>
                                                bids
                                            </Tab>
                                            <Tab
                                                data-for="tooltip2"
                                                onClick={() => setState({ isBid: true })}
                                            >
                                                statistics
                                            </Tab>
                                            <ReactTooltip
                                                place="right"
                                                type="light"
                                                effect="solid"
                                                id="tooltip2"
                                            >
                                                <div
                                                    style={{
                                                        width: "300px",
                                                        color: "#000000",
                                                    }}
                                                >
                                                    {AUCTION_TOOLTIP_CONTENT2}
                                                </div>
                                            </ReactTooltip>
                                        </TabList>
                                        <TabPanel>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Placement</th>
                                                        <th>Highest Bid Per Token</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fnSelectedBidhistoryData()?.map(
                                                        (item, idx) => (
                                                            <tr key={idx}>
                                                                <td>{`${idx + 1}. ${
                                                                    item.prefix + "." + item.name
                                                                }`}</td>
                                                                <td>
                                                                    {calcPriceFromUsd(
                                                                        item.totalPrice
                                                                    )}
                                                                    <span className="txt-green">
                                                                        {" "}
                                                                        {
                                                                            Currencies[currencyId]
                                                                                .symbol
                                                                        }
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </TabPanel>
                                        <TabPanel>
                                            <p className="text">{NDB_TOKEN_CONTENT}</p>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                                <div className="d-none d-md-block section-auction__tooltip">
                                    <ReactTooltip
                                        place="right"
                                        type="light"
                                        effect="solid"
                                        id="tooltip3"
                                    >
                                        <div
                                            style={{
                                                width: "300px",
                                                color: "#000000",
                                            }}
                                        >
                                            {AUCTION_TOOLTIP_CONTENT1}
                                        </div>
                                    </ReactTooltip>

                                    <img
                                        src={Qmark}
                                        alt="question"
                                        className="ms-3 d-none d-sm-block"
                                        data-for="tooltip3"
                                        data-tip="tooltip3"
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                            <div className="auction-left__bottom">
                                {isInbetween(
                                    fnSelectedRoundData()?.startedAt,
                                    fnSelectedRoundData()?.endedAt
                                ) && (
                                    <TimeframeBar
                                        percentage={percentage}
                                        round={fnSelectedRoundData()}
                                    />
                                )}
                                <div className="d-flex justify-content-between mt-4">
                                    {fnAverateMinBid !== 0 ? (
                                        <div>
                                            <p className="caption">Minimum bid</p>
                                            <p className="value">
                                                {fnAverateMinBid}
                                                <span className="txt-green">
                                                    {" "}
                                                    {Currencies[currencyId].symbol}
                                                </span>{" "}
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
                                                    new Date(
                                                        fnSelectedRoundData()?.endedAt
                                                    ).getHours()
                                                )
                                            )}
                                            :
                                            {numberWithLength(
                                                parseInt(
                                                    new Date(
                                                        fnSelectedRoundData()?.endedAt
                                                    ).getMinutes()
                                                )
                                            )}
                                            :
                                            {numberWithLength(
                                                parseInt(
                                                    new Date(
                                                        fnSelectedRoundData()?.endedAt
                                                    ).getSeconds()
                                                )
                                            )}
                                        </p>
                                    </div>
                                </div>
                                {size.width <= 1024 && (
                                    <div className="text-center my-5">
                                        <button
                                            className="btn-primary btn-increase"
                                            onClick={() => {
                                                setState({ bidModal: true })
                                            }}
                                        >
                                            {!isBid ? "Place Bid" : "Increase bid"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="auction-right col-lg-8 col-md-7">
                            <div className={`place-bid ${isBid && "d-none"}`}>
                                <h3 className="range-label">amount of token</h3>
                                <div className="d-flex align-items-center mb-4">
                                    <input
                                        type="number"
                                        value={Math.max(1, amount)}
                                        onChange={(e) => setState({ amount: e.target.value })}
                                        className="range-input"
                                    />
                                    <Slider
                                        value={Math.max(1, amount)}
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
                                        value={calcPriceFromUsd(
                                            Math.max(fnSelectedRoundData()?.minPrice, price)
                                        )}
                                        onChange={(e) =>
                                            setState({ price: calcPriceToUsd(e.target.value) })
                                        }
                                        className="range-input"
                                    />
                                    <Slider
                                        value={calcPriceFromUsd(
                                            Math.max(fnSelectedRoundData()?.minPrice, price)
                                        )}
                                        onChange={(value) =>
                                            setState({ price: calcPriceToUsd(value) })
                                        }
                                        min={Math.ceil(
                                            calcPriceFromUsd(fnSelectedRoundData()?.minPrice)
                                        )}
                                        max={10000}
                                        step={100}
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="range-label">Total price</span>
                                    <input
                                        className="total-input"
                                        type="text"
                                        value={numberWithCommas(
                                            Number(
                                                calcPriceFromUsd(
                                                    Math.max(
                                                        fnSelectedRoundData()?.minPrice,
                                                        price * amount
                                                    )
                                                ),
                                                " "
                                            )
                                        )}
                                        readOnly
                                    />
                                    <h3 className="symbol-label">{Currencies[currencyId].label}</h3>
                                </div>
                                <div className="mt-3 mb-2">
                                    <p>Audited by Cyberunit</p>
                                </div>
                                <button
                                    className="btn-primary text-uppercase w-100"
                                    onClick={() => {
                                        bidMutation()
                                    }}
                                >
                                    {!isBid ? "Place Bid" : "Increase Bid"}
                                </button>
                            </div>
                            <div
                                className={`chart-area ${
                                    size.width <= 768
                                        ? show_chart
                                            ? "d-block"
                                            : "d-none"
                                        : (size.width <= 1024 && size.width > 768 && "d-block") ||
                                          (isBid && "d-block")
                                }`}
                            >
                                <div className="d-flex ">
                                    <div className="w-100">
                                        <div className="d-flex">
                                            <Select
                                                className="select-chart-type"
                                                options={options}
                                                value={selectLabel}
                                                onChange={(v) => setState({ selectLabel: v })}
                                            />
                                            <ReactTooltip
                                                place="right"
                                                type="light"
                                                effect="solid"
                                                id="tooltip1"
                                            >
                                                <div
                                                    style={{
                                                        width: "300px",
                                                        color: "#000000",
                                                    }}
                                                >
                                                    {AUCTION_TOOLTIP_CONTENT1}
                                                </div>
                                            </ReactTooltip>

                                            <img
                                                src={Qmark}
                                                alt="question"
                                                className="ms-3 d-none d-sm-block"
                                                data-for="tooltip1"
                                                data-tip="tooltip1"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>

                                        {selectLabel.value === "bid_performance" && (
                                            <div className="d-flex align-items-center pt-3 w-100 ">
                                                <button
                                                    className={`btn-small ${
                                                        pricce ? "" : "btn-disabled"
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
                                                        volume ? "" : "btn-disabled"
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
                                                        price_volume ? "" : "btn-disabled"
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
                                            <div className=" d-flex justify-content-between pt-3 w-100 flex-wrap">
                                                <div className="d-flex">
                                                    <button
                                                        className={`btn-small ${
                                                            reser_price ? "" : "btn-disabled"
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
                                                            sold_price ? "" : "btn-disabled"
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
                                                            performance ? "" : "btn-disabled"
                                                        }`}
                                                        onClick={() => {
                                                            if (!performance) {
                                                                setReserPrice(false)
                                                                setSoldPrice(false)
                                                                setPerformance(true)
                                                            }
                                                        }}
                                                    >
                                                        Histogram
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectLabel.value === "bid_performance" &&
                                    pricce &&
                                    volume &&
                                    !bid_perform.loading &&
                                    !bid_perform.error && (
                                        <BidsChart1 data={bid_perform?.data} period={period} />
                                    )}
                                {selectLabel.value === "bid_performance" &&
                                    price_volume &&
                                    !bid_perform.loading &&
                                    !bid_perform.error && (
                                        <BidsChart2 data={bid_perform?.data} period={period} />
                                    )}

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
                                    !round_chance.error && (
                                        <React.Fragment>
                                            <ChanceChart data={round_chance?.data} />
                                        </React.Fragment>
                                    )}
                                {selectLabel.value !== "round_chance" && (
                                    <div
                                        className="btnGroup "
                                        role="group"
                                        style={{
                                            borderTop: "2px solid #c4c4c4",
                                            marginLeft: "76px",
                                            marginTop: "25px",
                                            paddingLeft: "18px",
                                            marginRight: "11px",
                                            paddingTop: "12px",
                                            zIndex: "-2",
                                        }}
                                    >
                                        <button
                                            className="btn-no-border-green text-uppercase btn-small  "
                                            onClick={() => {
                                                setPeriod("1D")
                                            }}
                                        >
                                            1D
                                        </button>
                                        <button
                                            className="btn-no-border-green text-uppercase btn-small  "
                                            onClick={() => {
                                                setPeriod("5D")
                                            }}
                                        >
                                            5D
                                        </button>
                                        <button
                                            className="btn-no-border-green text-uppercase btn-small "
                                            onClick={() => {
                                                setPeriod("1M")
                                            }}
                                        >
                                            1M
                                        </button>
                                        <button
                                            className="btn-no-border-green text-uppercase btn-small  "
                                            onClick={() => {
                                                setPeriod("6M")
                                            }}
                                        >
                                            6M
                                        </button>
                                        <button
                                            className="btn-no-border-green text-uppercase btn-small  "
                                            onClick={() => {
                                                setPeriod("1Y")
                                            }}
                                        >
                                            1Y
                                        </button>
                                        <button
                                            className="btn-no-border-green text-uppercase btn-small  "
                                            onClick={() => {
                                                setPeriod("ALL")
                                            }}
                                        >
                                            ALL
                                        </button>
                                    </div>
                                )}
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
                                value={calcPriceFromUsd(price)}
                                onChange={(e) =>
                                    setState({ price: calcPriceToUsd(e.target.value) })
                                }
                                className="range-input"
                            />
                            <Slider
                                value={calcPriceFromUsd(price)}
                                onChange={(value) => setState({ price: calcPriceToUsd(value) })}
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
                                value={numberWithCommas(
                                    Number(
                                        calcPriceFromUsd(
                                            Math.max(
                                                fnSelectedRoundData()?.minPrice,
                                                price * amount
                                            )
                                        ),
                                        ","
                                    )
                                )}
                                readOnly
                            />
                            <h3 className="symbol-label">{Currencies[currencyId].label}</h3>
                        </div>
                        <button
                            className="btn-primary text-uppercase w-100 mt-4"
                            onClick={() => {
                                setState({ bidModal: false })
                                bidMutation()
                            }}
                        >
                            {!isBid ? "Place Bid" : "Increase Bid"}
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
                        <input
                            className="total-input"
                            type="text"
                            value={numberWithCommas(
                                Number(
                                    calcPriceFromUsd(
                                        Math.max(fnSelectedRoundData()?.minPrice, price * amount)
                                    ),
                                    ","
                                )
                            )}
                            readOnly
                        />
                        <button
                            className="btn-primary text-uppercase"
                            onClick={() => {
                                bidMutation()
                                setState({ bidModal: false })
                            }}
                        >
                            {!isBid ? "Place Bid" : "Increase Bid"}
                        </button>
                    </div>
                </Modal>
            </main>
        )
}

export default Auction
