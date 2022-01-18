import React, { useEffect, useState } from "react"
import ReactEcharts from "echarts-for-react"

const RoundsChart2 = ({ data,onDispData }) => {
    const [chart, setChart] = useState([])
    const [rnd, setRnd] = useState([])

    var xPoint
    var tmpdata;
    useEffect(() => {
        let trnd = []
        let rdata = []
        tmpdata = data?.getRoundPerform2.slice()
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
  
    useEffect(()=>{
        onDispData(xPoint)

    },[])
   
    const option = {
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
        xAxis: {
            data: rnd,
            axisPointer: {
                label: {
                    backgroundColor: "#eb5454",
                    formatter: function ({ value }) {
                        xPoint = value
                        return value
                    },
                    width:30,
                    padding:[4,5,4,20],
                },
            },
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
