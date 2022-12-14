/* eslint-disable */

import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"

const ChanceChart = ({ data }) => {
    const [rnd, setRnd] = useState([])
    const [wins, setWins] = useState([])
    const [fails, setFails] = useState([])

    ///////added///////////
    const [winFlag, setWinFlag] = useState(true)
    const [failFlag, setFailFlag] = useState(true)

    useEffect(() => {
        let wins_arr = []
        let fails_arr = []
        let trnd = []
        let tmpdata = data?.getRoundChance.slice()
        tmpdata
            .sort((a, b) => {
                return a.roundNumber - b.roundNumber
            })
            .map((ele) => {
                trnd.push(ele.roundNumber)
                wins_arr.push(ele.winRate)
                fails_arr.push(ele.failedRate)
            })
        setRnd(trnd)
        setWins(wins_arr)
        setFails(fails_arr)
    }, [data, winFlag, failFlag])

    var opt = {
        color: ["#23C865", "#E8503A"],
        plugins: {
            tooltip: {
                filter: function () {
                    return false
                },
            },
            legend: {
                display: false,
            },
        },
        grid: {
            left: "0%",
            right: "3%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            data: rnd,
            offset: 10,
            axisLabel: {
                fontSize: 14,
                margin:20
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: [
            {
                type: "value",
                axisPointer: {
                    label: {
                        backgroundColor: "#23C865",
                        formatter: function ({ value }) {
                            return value * 100 + "%"
                        },
                    },
                },
                axisLabel: {
                    formatter: function (value) {
                        return value * 100
                    },
                    margin: 20,
                },
            },
        ],
        series: [
            {
                name: "Win Rate",
                type: "bar",
                data: wins,
            },
            {
                name: "Fail Rate",
                type: "bar",
                data: fails,
            },
        ],
        left: 0,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 10,
            },
        },
    }
    if (winFlag && !failFlag) {
        opt.series[0].data = wins
        opt.series[1].data = []
    } else if (!winFlag && failFlag) {
        opt.series[0].data = []
        opt.series[1].data = fails
    } else if (winFlag && failFlag) {
        opt.series[0].data = wins
        opt.series[1].data = fails
    } else {
        opt.series[0].data = []
        opt.series[1].data = []
    }

    return (
        <React.Fragment>
            <div className="select-chart-type">
                <div className="d-flex mt-2 gap-1 ">
                    <div className="col-6">
                        <input
                            type="checkbox"
                            className="btn-check"
                            id="btn-wins-outlined"
                            autoComplete="off"
                            onClick={() => {
                                setWinFlag(!winFlag)
                            }}
                        />
                        <label className="_btn _btn-wins-outlined" htmlFor="btn-wins-outlined">
                            Win Rate
                        </label>
                    </div>
                    <div className="col-6">
                        <input
                            type="checkbox"
                            className="btn-check"
                            id="btn-fails-outlined"
                            autoComplete="off"
                            onClick={() => {
                                setFailFlag(!failFlag)
                            }}
                        />
                        <label className="_btn _btn-fails-outlined" htmlFor="btn-fails-outlined">
                            Fail Rate
                        </label>
                    </div>
                </div>
            </div>
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: "10px", left: "5px", color: "white" }}>
                    %
                </div>
                <div style={{ position: "relative" }}>

                    color: "#fff0",
                }}
            >
                Nothing
            </div>
            {/* <div
                style={{
                    bottom: "56px",
                    heigh
    )
}

export default ChanceChart
