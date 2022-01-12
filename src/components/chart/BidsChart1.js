import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { numFormatter } from "../../utilities/number"

const colors = ["#C4C4C4", "#23C865"]

const BidsChart1 = ({ data }) => {
    const [total, setTotal] = useState([])
    const [amount, setAmount] = useState([])
    useEffect(() => {
        let tTotal = []
        let tAmount = []
        let list = []
        data?.getBidList.forEach(x => list.push(x))
        list.sort((a, b) => {
            return a.placedAt - b.placedAt
        }).forEach((ele) => {
            tTotal.push({value: [ele.placedAt, ele.totalPrice]})
            tAmount.push({value: [ele.placedAt, ele.tokenAmount]})
        })
        setTotal(
            tTotal
        )
        setAmount(
            tAmount
        )
    }, [data])

    const option = {
        color: colors,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        grid: [
          {
            left: 80,
            right: 10,
            top: "5%",
            height: "50%"
          },
          {
            left: 80,
            right: 10,
            top: "65%",
            height: "30%"
          }
        ],
        axisPointer: {
          link: [
            {
              xAxisIndex: 'all'
            }
          ]
        },
        xAxis: [
            {
                type: "time",
                axisTick: {
                    alignWithLabel: true,
                },
                show: false
            },
            {
                type: "time",
                axisTick: {
                    alignWithLabel: true,
                },
                gridIndex: 1
            }
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: function (value) {
                        return numFormatter(value, 0)
                    }
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#23C865",
                        formatter: function (value) {
                            return numFormatter(value, 0)
                        },
                    },
                },
            },
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: function (value) {
                        return numFormatter(value, 0)
                    }
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#23C865",
                    },
                },
                gridIndex: 1
            },
        ],
        series: [
            {
                name: "Price",
                type: "bar",
                data: amount,
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: 30
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
            style={{ height: "500px", width: "100%" }}
            className="echarts-for-echarts"
        />
    )
}

export default BidsChart1
