/* eslint-disable */

import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { numFormatter } from "../../utilities/number"

const BidsChart2 = ({ data }) => {
    const [total, setTotal] = useState([])
    const [amount, setAmount] = useState([])
    useEffect(() => {
        let ttotal = []
        let tamount = []

        data?.getBidList.forEach((ele) => {
            ttotal.push(ele.totalPrice)
            tamount.push(ele.tokenAmount)
        })

        setTotal(ttotal)
        setAmount(tamount)
    }, [data])

    const option = {
        color: "#C4C4C4",
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        grid: {
            left: 5,
            right: 10,
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: amount,
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    formatter: function (value) {
                        return numFormatter(value, 2)
                    },
                },
                axisPointer: {
                    label: {
                        padding: [4, 25, 2, 25],
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                axisLine: {
                    show: false,
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#fff",
                        color: "#7a7a7a",
                        padding: [4, 15, 2, 15],
                        formatter: function ({ value }) {
                            return numFormatter(value, 2)
                        },
                    },
                    margin: "10%",
                },
                axisLabel: {
                    formatter: function (value) {
                        return numFormatter(value, 2)
                    },
                    margin: 30,
                },
            },
        ],
        series: [
            {
                name: "Direct",
                type: "bar",
                barWidth: "60%",
                data: total,
            },
        ],
    }
    return (
        <ReactEcharts
            option={option}
            style={{ height: "318px", width: "100%" }}
            className="echarts-for-echarts"
        />
    )
}

export default BidsChart2
