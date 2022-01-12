import React, { useEffect, useState } from "react"
import ReactEcharts from "echarts-for-react"

const RoundsChart2 = ({ data }) => {
    const [chart, setChart] = useState([])
    const [rnd, setRnd] = useState([])
    useEffect(() => {
        let trnd = []
        let rdata = []
        let tmpdata = data?.getRoundPerform2.slice()

        tmpdata
            .sort((a, b) => {
                return a.roundNumber - b.roundNumber
            })
            .map((ele) => {
                if (ele.max > 0) {
                    trnd.push(ele.roundNumber)
                    rdata.push([ele.min + ele.std, ele.max - ele.std, ele.min, ele.max])
                }
            })

        setRnd(trnd)
        setChart(rdata)
    }, [data])
    const option = {        
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            }
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            data: rnd,
        },
        yAxis: {},
        series: [
            {
                type: "candlestick",
                data: chart,
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

export default RoundsChart2
