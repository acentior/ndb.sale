/* eslint-disable */

import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { getDataOnPeriod, numFormatter, getFormatedDateOnBids } from "../../utilities/number"

const colors = ["#C4C4C4", "#23C865"]

const BidsChart1 = ({ data, period }) => {
    const [total, setTotal] = useState([])
    const [amount, setAmount] = useState([])
    const [zeroLabel, setZeroLabel] = useState("")
    const [stDate, setStartDate] = useState(0)

    useEffect(() => {
        let tTotal = []
        let tAmount = []
        let list = []

        data?.getBidList.forEach((x) => list.push(x))
        list.sort((a, b) => {
            return a.placedAt - b.placedAt
        })

        var tmpData = getDataOnPeriod(list, period)

        setZeroLabel(tmpData.zeroLabel)
        setStartDate(tmpData.startDate)

        tmpData.fData.forEach((ele) => {
            tTotal.push({ value: [new Date(ele.placedAt), ele.totalPrice] })
            tAmount.push({ value: [new Date(ele.placedAt), ele.tokenAmount] })
        })

        setTotal(tTotal)
        setAmount(tAmount)
    }, [data, period])

    const option = {
        color: colors,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
            position: "middle",
        },
        grid: [
            {
                left: 25,
                right: 10,
                top: "10%",
                height: "60%",
                containLabel:true
            },
            {
                left: 25,
                right: 10,
                top: "70%",
                height: "30%",
                containLabel:true
            },
        ],
        axisPointer: {
            link: [
                {
                    xAxisIndex: "all",
                },
            ],
        },
        xAxis: [
            {
                type: "time",
                axisTick: {
                    alignWithLabel: true,
                },
                show: false,
                splitNumber: 2,
                axisPointer: {
                    label: {
                        show: false,
                    },
                },
                min:stDate
            },
            {
                type: "time",
                axisTick: {
                    alignWithLabel: true,
                },
                min: stDate,
                // nameLocation: "start",
                // name: zeroLabel,
                // nameTextStyle: {
                //     align: "left",
                //     padding: [17, 11, 10, 9],
                //     verticalAlign: "top",
                //     fontSize:13
                // },
                gridIndex: 1,
                splitNumber: 5,
                axisPointer: {
                    label: {
                        formatter: function (value, index) {
                            return getFormatedDateOnBids(value.value, period)
                        },
                        width: 70,
                        padding: [4, 2, 2, 5],
                    },
                },
                axisLabel: {
                    margin: 18,
                    showMinLabel:false,
                    hideOverlap:true,
                },
                scale: true,
            },
        ],

        yAxis: [
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: function (value) {
                        return numFormatter(value, 0)
                    },
                    margin: 30,
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#23C865",
                        color: "#fff",
                        formatter: function (value, index) {
                            return numFormatter(value.value, 2)
                        },
                        width: 50,
                        padding: [4, 2, 2, 20],
                    },
                    margin: "10%",
                },
                offset: 20,
                position: {
                    align: "right",
                },
            },
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: function (value, index) {
                        return numFormatter(value, 0)
                    },
                    margin: 35,
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#fff",
                        color: "#7a7a7a",
                        width: 50,
                        padding: [4, 2, 2, 20],
                        formatter: function (value, index) {
                            return numFormatter(value.value.toFixed(2), 2)
                        },
                    },
                    margin: "10%",
                    position: {
                        align: "right",
                    },
                },
                offset: 20,
                gridIndex: 1,
                splitNumber:2
            },
        ],
        series: [
            {
                name: "Price",
                type: "bar",
                data: amount,
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: 15,
            },
            {
                name: "Volume",
                type: "line",
                smooth: "true",

                showSymbol: false,
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

export default BidsChart1
