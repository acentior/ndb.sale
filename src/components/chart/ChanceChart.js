import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"

const ChanceChart = ({ data }) => {
    const [rnd, setRnd] = useState([])
    const [wins, setWins] = useState([])
    const [fails, setFails] = useState([])

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
    }, [data])

    const option = {
        color: ["#23C865", "#E8503A"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                label: {
                    show: true,
                },
            },
        },
        legend: {
            data: [{
                name: 'Win Rate',
                // compulsorily set icon as a circle
                icon: 'none',
                // set up the text in red
                textStyle: {
                    color: 'wight'
                },
                itemStyle: {
                    color: "#23C865"
                },
                backgroundColor: "#23C865",
                borderColor: "#23C865",
                borderWidth: "2px",
                brderType: "solid"
            }, {
                name: 'Fail Rate',
                // compulsorily set icon as a circle
                icon: 'none',
                // set up the text in red
                textStyle: {
                    color: 'wight'
                },
                backgroundColor: "#E8503A",
                borderColor: "#23C865",
                borderWidth: "2px",
                brderType: "solid"
            }],
            // data: ["Win Rate", "Fail Rate"],
            left: "0%",
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
                        return value * 100 + "%"
                    },
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
    }
    return (
        <ReactEcharts
            option={option}
            style={{ height: "500px", width: "100%" }}
            className="echarts-for-echarts"
        />
    )
}

export default ChanceChart
