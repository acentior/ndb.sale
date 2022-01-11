import React from "react"
import ReactEcharts from "echarts-for-react"

const option = {
    color: "#C4C4C4",
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
                alignWithLabel: true,
            },
        },
    ],
    yAxis: [
        {
            type: "value",
        },
    ],
    series: [
        {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
        },
    ],
}

const BidsChart2 = () => {
    return (
        <ReactEcharts
            option={option}
            style={{ height: "500px", width: "100%" }}
            className="echarts-for-echarts"
        />
    )
}

export default BidsChart2
