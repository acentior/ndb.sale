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
        console.log(tmpdata)
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

    // useEffect(
    //     () => {
    //       setLoop(
    //         setInterval(() => {
    //           console.log("loading");
    //         }, 1000)
    //       );

    //       return function cleanup() {
    //         console.log("cleaning up");
    //         clearInterval(loop);
    //       };
    //     },
    //     []
    //   );

    useEffect(() => {
        var clockId = setInterval(() => {
            console.log("------")
        }, 1000)
        return () => {
            console.log("celadsf")
            clearInterval(clockId)
        }
    }, [])

    const option = {
        tooltip: {
            show: false,
        },

        grid: {
            left: 27,
            right: 10,
            bottom: "3%",
            containLabel: true,
        },
        xAxis: {
            data: rnd,
            axisPointer: {
                show: true,
                label: {
                    backgroundColor: "#eb5454",
                    formatter: function ({ value }) {
                        xPoint = value
                        // setDisplay(tmpdata)
                        // curDisp = tmpdata.filter((item)=>item.roundNumber==xPoint)
                        // for (var i=0;i<tmpdata.length;i++){
                        //     if (tmpdata[i].roundNumber == xPoint){
                        //         console.log(tmpdata[i])
                        //         dispData =tmpdata[i]
                        //     }
                        // }
                        return value
                    },
                    padding: [4, 25, 2, 25],
                },
            },
            axisLabel: {
                margin: 30,
            },
        },
        yAxis: {
            axisPointer: {
                show: false,
            },
            offset: 20,
            axisLabel: {
                margin: 30,
            },
            position: {
                align: "right",
            },
        },
        series: [
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
                        <label className="text-white">Max:&nbsp;&nbsp;</label>
                        <span className="text-secondary">0.034</span>
                    </div>
                    <div className="px-2">
                        <label className="text-white">Min:&nbsp;&nbsp;</label>
                        <span className="text-secondary ">0.034</span>
                    </div>
                    <div className="px-2">
                        <label className="text-white">Std:&nbsp;&nbsp;</label>
                        <span className="text-secondary ">{111}</span>
                    </div>
                    <div className="px-2">
                        <label className="text-white">Rnd:&nbsp;&nbsp;</label>
                        <span className="text-secondary ">{xPoint}</span>
                    </div>
                </div>
                <ReactEcharts
                    option={option}
                    style={{ height: "500px", width: "100%" }}
                    className="echarts-for-echarts"
                />
            </div>
        </div>
    )
}

export default RoundsChart2
