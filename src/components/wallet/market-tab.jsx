import React, { useReducer, useEffect } from "react"
import axios from "axios"

import { numberSign, numberWithCommas, numFormatter } from "../../utilities/number"
import icons from "base64-cryptocurrency-icons"
import { Icon } from "@iconify/react"
import ReactECharts from "echarts-for-react"
import { useState } from "react"

const QUOTE = "USDT"

const KLINE_ENDPOINT = "https://api.binance.com/api/v3/klines"

const TICKER_24hr = "https://api.binance.com/api/v3/ticker/24hr"

const KLINE_INTERVAL = "1h"

const GREEN = "#23C865"

const RED = "#F6361A"

const market_data = [
    {
        abbr: "ETH",
        name: "Ethereum",
        active: false,
    },
    {
        abbr: "BTC",
        name: "Bitcoin",
        active: true,
    },
    {
        abbr: "BCH",
        name: "Bitcoin Cash",
        active: false,
    },
    {
        abbr: "DOGE",
        name: "Dogecoin",
        active: true,
    },
    {
        abbr: "USDC",
        name: "USD Coin",
        active: false,
    },
    {
        abbr: "LTC",
        name: "Litecoin",
        active: false,
    },
]
const CryptoRow = ({ data }) => {
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        chart: [],
        min: 0,
        percent: "",
        price: "",
        volume: "",
    })
    const { chart, min, price, percent, volume } = state

    useEffect(() => {
        axios
            .get(KLINE_ENDPOINT, {
                params: {
                    symbol: data.abbr + QUOTE,
                    interval: KLINE_INTERVAL,
                    startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
                },
            })
            .then((res) => {
                const data = res.data.map((c) => c[1])

                setState({
                    min: Math.min(data),
                    max: Math.max(data),
                    chart: data,
                })
            })
        const getTicker24hr = () => {
            axios.get(TICKER_24hr, { params: { symbol: data.abbr + QUOTE } }).then((res) => {
                setState({
                    price: numberWithCommas(res.data.lastPrice),
                    percent: res.data.priceChangePercent,
                    volume: numFormatter(res.data.quoteVolume, 2),
                })
            })
        }
        getTicker24hr()
        setInterval(() => {
            getTicker24hr()
        }, 5000)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <tr>
            <td className="d-flex align-items-start ps-2">
                <div>
                    <Icon
                        icon="bx:bxs-star"
                        className={`star-checkbox ${data.active ? "txt-green" : "txt-grey"}`}
                    />
                </div>
                <img src={icons[data.abbr]?.icon} alt="coin" className="me-2" width="30" />
                <div>
                    <p className="coin-abbr">{data.abbr}</p>
                    <p className="coin-name">{data.name}</p>
                </div>
            </td>
            <td>
                <p className="coin-price">${price}</p>
                <p
                    className={
                        numberSign(percent) === "+"
                            ? "coin-percent txt-green"
                            : "coin-percent txt-red"
                    }
                >
                    {numberSign(percent) + percent === undefined ? "0" : percent}%
                </p>
            </td>
            <td className="laptop-not price-chart">
                <ReactECharts
                    option={{
                        color: percent >= 0 ? GREEN : RED,
                        backgroundColor: "#242424",
                        xAxis: {
                            type: "category",
                            show: false,
                        },
                        yAxis: {
                            type: "value",
                            show: false,
                            min: min,
                        },
                        series: [
                            {
                                data: chart,
                                type: "line",
                                smooth: true,
                                showSymbol: false,
                            },
                        ],
                        grid: {
                            show: false,
                            top: "10%",
                            bottom: "10%",
                            left: "0",
                            right: "0",
                        },
                    }}
                    style={{ height: "50px", width: "150px", margin: "auto" }}
                    className="echarts-for-echarts"
                />
            </td>
            <td className="mobile-not text-end">${!volume ? 0 : volume}</td>
            <td className="mobile-not text-end"></td>
        </tr>
    )
}

export default function MarketTab() {
    const [searchValue, setSearchValue] = useState("")
    return (
        <table className="wallet-transaction-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="text-end">Price</th>
                    <th className="laptop-not text-center">Price Chart</th>
                    <th className="mobile-not text-end">Volume (24h)</th>
                    <th className="mobile-not text-end"> </th>
                </tr>
            </thead>
            <div className="search">
                <svg
                    class="search-icon text-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-secondary w-100 border-0"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <tbody className="pe-3">
                {market_data
                    .filter(
                        (item) =>
                            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                            item.abbr.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((item, idx) => (
                        <CryptoRow data={item} key={idx} />
                    ))}
            </tbody>
        </table>
    )
}
