import React, { useReducer, useEffect } from "react"
import axios from "axios"

import { numberSign, numberWithCommas, numFormatter } from "../../utilities/number"
import icons from "base64-cryptocurrency-icons"
import { Icon } from "@iconify/react"
import ReactECharts from "echarts-for-react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import CustomSpinner from "../common/custom-spinner"

const QUOTE = "USDT"

const SOCKET_ENDPOINT = "wss://stream.binance.com:9443/stream"

const KLINE_ENDPOINT = "https://api.binance.com/api/v3/klines"

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
    })

    const { chart, min } = state

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
    }, [data.abbr])

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(SOCKET_ENDPOINT)

    const percent = lastJsonMessage?.data?.P
    const price = lastJsonMessage?.data?.c
    const volume = numFormatter(lastJsonMessage?.data?.q, 2)

    useEffect(() => {
        if (readyState !== ReadyState.OPEN) return
        sendJsonMessage({
            method: "SUBSCRIBE",
            params: [`${data.abbr.toLowerCase()}usdt@ticker`],
            id: 1,
        })
    }, [readyState, sendJsonMessage, data.abbr])

    return (
        <tr>
            <td className="d-flex align-items-start ps-2">
                <Icon
                    icon="bx:bxs-star"
                    className={`star-checkbox ${data.active ? "txt-green" : "txt-grey"}`}
                />
                <img src={icons[data.abbr]?.icon} alt="coin" className="me-2" width="30" />
                <div>
                    <p className="coin-abbr">{data.abbr}</p>
                    <p className="coin-name">{data.name}</p>
                </div>
            </td>
            <td>
                {!price ? (
                    <div className="loading">
                        <CustomSpinner />
                    </div>
                ) : (
                    <p className="coin-price">${numberWithCommas(price)}</p>
                )}
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
    return (
        <table>
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
                <Icon icon="akar-icons:search" color="white" className="search-icon" />
            </div>
            <tbody>
                {market_data.map((item, idx) => (
                    <CryptoRow data={item} key={idx} />
                ))}
            </tbody>
        </table>
    )
}
