/* eslint-disable */

import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { numFormatter } from "../../utilities/number"

const RoundsChart1 = ({ data }) => {
    const [total, setTotal] = useState([])
    const [sold, setSold] = useState([])
    useEffect(() => {
        let ttotal = []
        let tsold = []
        // console.log(data.getAuctions)
        data?.getAuctions.forEach((ele) => {
            ttotal.push([ele.totalToken, ele.minPrice * ele.totalToken])
            tsold.push([ele.minPrice, ele.sold])
        })
        setTotal(
            ttotal.sort((a, b) => {
                return a[0] - b[0]
            })
        )
        setSold(
            tsold.sort((a, b) => {
                return a[0] - b[0]
            })
        )
    }, [data])

    const option = {
        tooltip: {
            axisPointer: {
                type: "cross",
            },
        },
        grid: {
            left: 0,
            right: 10,
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            splitLine: {
                show: false,
            },
            min: 0,
            axisLabel: {
                formatter: function (value) {
                    return numFormatter(value, 0)
                },
            },
            axisPointer: {
                label: {
                    backgroundColor: "#8F8F8F",
                    formatter: function ({ value }) {
                        if (value < 1000) {
                            return value.toFixed(0)
                        }
                        return numFormatter(value, 0)
                    },
                    padding: [4, 25, 2, 25],
                },
            },
            offset:10
        },
        yAxis: {
            type: "value",
            min: 0,
            axisLine: {
                show: false,
            },
            axisPointer: {
                label: {
                    backgroundColor: "#23C865",
                    formatter: function ({ value }) {
                        return numFormatter(value, 2)
                    },
                    padding: [4, 15, 2, 15],
                },
            },
            axisLabel: {
                formatter: function (value) {
                    return numFormatter(value, 2)
                },
                margin: 30,
                align:'left'
            },
            position: {
                align: "left",
            },
            offset:40 ,
        },
        series: [
            {
                type: "line",
                smooth: true,
                data: sold,
                color: "#23C865",
                name: "sold",
                showSymbol: false,
                tooltip: {
                    label: {
                        backgroundColor: "#23C865",
                    },
                },
            },
            {
                type: "line",
                data: total,
                color: "#FFB800",
                name: "total",
                showSymbol: false,
                tooltip: {
                    label: {
                        backgroundColor: "#FFB800",
                    },
                },
            },
        ],
    }
    return (
        <ReactEcharts
            option={option}
            style={{ height: "calc(100vh - 350px)", width: "auto" }}
            className="echarts-for-echarts"
        />
    )
}

export default RoundsChart1
