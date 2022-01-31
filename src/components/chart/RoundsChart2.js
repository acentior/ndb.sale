/* eslint-disable */

import React, { useEffect, useState } from "react"
import ReactEcharts from "echarts-for-react"
var xPoint = 0
var tmpdata = []

const RoundsChart2 = ({ data }) => {
    const [chart, setChart] = useState([])
    const [rnd, setRnd] = useState([])

    const [display, setDisplay] = useState()

    const [loop, setLoop] = useState()
    useEffect(() => {
        let trnd = []
        let rdata = []
        
        tmpdata = data?.getRoundPerform2.slice()
        tmpdata
            .sort((a, b) => {
                return a.roundNumber - b.roundNumber
            })
            .map((ele) => {

        grid: {
            left: 0,
            right: 10,
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            data: rnd,
            axisPointer: {
                show: true,
                label: {
                    backgroundColor: 
            offset:10
        },
            {
                type: "candlestick",
                data: chart,
            },
        ],
    }
    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "relative", top: "-20px" }}>
                <div className="d-flex py-auto" style={{ float: "right" }}>
                    <div className="px-auto">
                        <label class
                    <div className="px-2">
                        <label className="text-white">Rnd:&nbsp;&nbsp;</label>
                        <span className="text-secondary ">{xPoint}</span>
                    </div>

export default RoundsChart2
