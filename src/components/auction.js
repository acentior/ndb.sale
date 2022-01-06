import React, { useReducer, useEffect, useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Slider from "rc-slider"
import Select from "react-select"
import Modal from "react-modal"
import ReactECharts from "echarts-for-react"
import Header from "../components/common/header"
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
} from "../apollo/graghqls/querys/Auction"
import { GET_ROUND_CHANCE, GET_ROUND_PERFORMANCE2 } from "../apollo/graghqls/querys/Statistics"
import { Currencies } from "../utilities/staticData"
import { User } from "../utilities/user-data"
import Linechart from "./chart/Linechart"
import Candlestick from "./chart/Candlestick"

// for test
// import chart1 from '../../test_data/chart1.json'
// import chart2 from '../../test_data/chart2.json'

const ndb_token = `Since the beginning of NDB's project the vision is to provide clean green technologies to the world. The NDB token is not a security token nor does it represent any shares of NDB SA.

By using NDB token you will be able to contribute to the development of our technologies and our vision. We plan to expand our ecosystem to multiple areas including deep space exploration, sustainable fashion, quantum computing, and more. 
`

const options = [
    { value: "round_performance2", label: "Round performance" },
    { value: "round_change", label: "Round Change" },
]

const Auction = () => {

    const chart1 = useQuery(GET_AUCTION)
    const chart2 = useQuery(GET_ROUND_PERFORMANCE2)

    const size = useWindowSize()

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        tabIndex: 0,
        amount: 1,
        price: 1,
        total: "",
        place_bid: false,
        bidModal: false,
        show_chart: false,
        selectLabel: options[0],
    })

    // set chart type
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



    // get round performance 2
    const { data: roundPerformance2 } = useQuery(GET_ROUND_PERFORMANCE2)
    const { data: roundChance } = useQuery(GET_ROUND_CHANCE)
    let round_perform2 = roundPerformance2?.getRoundPerform2.map((item) => {
        let newArr = []
        newArr.push("Round " + item.roundNumber, item.min, item.max, item.std)
        return newArr
    })
    let round_chance = roundChance?.getRoundChance.map((item) => {
        let newArr = []
        newArr.push("Round " + item.roundNumber, item.winRate, item.failedRate)
        return newArr
    })
    round_chance?.unshift(["Category", "Win Rate", "Failed Rate"])
    round_perform2?.unshift(["Category", "Max", "Min", "Std"])

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
                        ) && (
                            <div className="timeframe-bar">
                                <div
                                    className="timeleft"
                                    style={{
                                        width:
                                            (percentage > 0 && percentage < 101 ? percentage : 0) +
                                            "%",
                                        background: "#464646",
                                    }}
                                >
                                    <div className="timeleft__value">
                                        {numberWithLength(
                                            parseInt(
                                                getTimeDiffOverall(
                                                    fnSelectedRoundData()?.startedAt,
                                                    fnSelectedRoundData()?.endedAt
                                                ) /
                                                    (60 * 60)
                                            )
                                        )}
                                        :
                                        {numberWithLength(
                                            parseInt(
                                                (getTimeDiffOverall(
                                                    fnSelectedRoundData()?.startedAt,
                                                    fnSelectedRoundData()?.endedAt
                                                ) %
                                                    (60 * 60)) /
                                                    60
                                            )
                                        )}
                                        :
                                        {numberWithLength(
                                            parseInt(
                                                getTimeDiffOverall(
                                                    fnSelectedRoundData()?.startedAt,
                                                    fnSelectedRoundData()?.endedAt
                                                ) % 60
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
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
                        {place_bid && (
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
                                    max={fnSelectedRoundData()?.totalToken}
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
                                    PlaceBid({
                                        variables: {
                                            roundId: fnSelectedRoundData()?.auctionId,
                                            tokenAmount: amount,
                                            tokenPrice: price,
                                            payment: 1,
                                            cryptoType: "String",
                                        },
                                    })
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
                                <div className="d-flex align-items-center ">
                                    <div style={{width: "430px"}}>
                                        <Select
                                            className=""
                                            options={options}
                                            value={selectLabel}
                                            onChange={(v) => setState({ selectLabel: v })}
                                        />

                                    </div>
                                    <img src={Qmark} alt="question" className="ms-3"/>
                                </div>
                                <div className="d-flex align-items-center" 
                                style={{ 
                                    justifyContent: "space-between",
                                    paddingTop: "10px",
                                    width: "430px"
                                }}>
                                    <button
                                        className={`btn-small ${
                                            reser_price ? "btn-disabled" : ""
                                        }`}
                                        onClick={() => {
                                            if(!reser_price) {
                                                setReserPrice(true)
                                                setSoldPrice(true)
                                                setPerformance(false)
                                            }
                                        }}
                                        style={{
                                            width: "140px"
                                        }}
                                        
                                    >
                                        Reserved Price
                                    </button>
                                    <button
                                        className={`btn-small ${
                                            sold_price ? "btn-disabled" : ""
                                        }`}
                                        onClick={() => {
                                            if(!sold_price) {
                                                setReserPrice(true)
                                                setSoldPrice(true)
                                                setPerformance(false)
                                            }
                                        }}
                                        style={{
                                            width: "140px"
                                        }}
                                        
                                    >
                                        Price Sold
                                    </button>
                                    <button
                                        className={`btn-small ${
                                            performance ? "btn-disabled" : ""
                                        }`}
                                        onClick={() => {
                                            if(!performance) {
                                                setReserPrice(false)
                                                setSoldPrice(false)
                                                setPerformance(true)
                                            }
                                        }}
                                        style={{
                                            width: "140px"
                                        }}
                                        
                                    >
                                        Performance
                                    </button>
                                </div>
                            </div>
                            {/* <p className="select-label">{selectLabel.label}</p> */}
                            {selectLabel.value === "round_performance2" && round_perform2 && reser_price && sold_price && (
                                <Linechart data={chart1}/>
                                // <ReactECharts
                                //     option={{
                                //         tooltip: {
                                //             className: "echarts-tooltip",
                                //         },
                                //         color: ["#23C865", "#8F8F8F", "#FFFFFF"],
                                //         dataset: {
                                //             source: [
                                //                 ["Category", "Max", "Min", "Std"],
                                //                 ["Round 5", 1.79, 0, 0],
                                //                 ["Round 4", 30, 45, 10.606601717798213],
                                //                 ["Round 3", 30, 55, 10],
                                //                 ["Round 2", 15, 55, 10],
                                //                 ["Round 1", 15, 425, 0],
                                //                 ["Round 6", 65, 65, 0],
                                //             ],
                                //         },
                                //         xAxis: { type: "category" },
                                //         yAxis: {},
                                //         series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
                                //     }}
                                //     style={{ height: "450px", width: "100%" }}
                                //     className="echarts-for-echarts"
                                // />
                            )}
                            {selectLabel.value === "round_performance2" && round_perform2 && performance && (
                                <Candlestick data={chart2}/>
                            )}
                            {selectLabel.value === "round_change" && round_chance && (
                                // <Candlestick data={chart2}/>
                                <ReactECharts
                                    option={{
                                        tooltip: {},
                                        color: ["#23C865", "#E8503A"],
                                        dataset: {
                                            source: round_chance,
                                        },
                                        xAxis: { type: "category" },
                                        yAxis: {},
                                        series: [{ type: "bar" }, { type: "bar" }],
                                    }}
                                    style={{ height: "450px", width: "100%" }}
                                    className="echarts-for-echarts"
                                />
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
                            min={0}
                            max={10000}
                            step={100}
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
                            min={0}
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
