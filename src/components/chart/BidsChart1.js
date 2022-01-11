import React from "react"
import ReactEcharts from "echarts-for-react"

const colors = ["#C4C4C4", "#23C865"]

const BidsChart1 = ({ data }) => {
    const option = {
        color: colors,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
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
                // prettier-ignore
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: "{value}",
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#23C865",
                    },
                },
            },
        ],
        series: [
            {
                name: "Price",
                type: "bar",
                data: [12.6, 25.9, 19.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 46.0, 22.3],
            },
            {
                name: "Volume",
                type: "line",
                smooth: "true",
                showSymbol: false,
                data: [120.0, 42.2, 113.3, 74.5, 86.3, 74.2, 120.3, 123.4, 93.0, 56.5, 112.0, 86.2],
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
