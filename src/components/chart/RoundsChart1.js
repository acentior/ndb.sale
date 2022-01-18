import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { numFormatter } from "../../utilities/number"

const RoundsChart1 = ({ data }) => {
    const [total, setTotal] = useState([])
    const [sold, setSold] = useState([])
    useEffect(() => {
        let ttotal = []
        let tsold = []
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
        // tooltip: {
        //     trigger: "axis",
        //     axisPointer: {
        //         type: "cross",
        //     },
            
        // },
        grid: {
            left: "3%",
            right: "3%",
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
                        return numFormatter(value, 0)
                    },
                },
            },
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
                },
            },
            axisLabel: {
                formatter: function (value) {
                    return numFormatter(value, 2)
                },
            },
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
            style={{ height: "500px", width: "100%" }}
            className="echarts-for-echarts"
        />
    )
}

export default RoundsChart1
