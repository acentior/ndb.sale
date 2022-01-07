import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react"; 
const Candlestick = ({data}) => {  
  const [chart, setChart] = useState([])
  const [rnd, setRnd] = useState([])
  useEffect(() => {
    let trnd = []
    let rdata = [[], [], [], []]
    let tmpdata = data.getRoundPerform2.slice()
    tmpdata.sort((a, b)=> {return a.roundNumber - b.roundNumber}).forEach( (ele) => {
      if(ele.max > 0) {
        trnd.push(ele.roundNumber)
        rdata[0].push(ele.min)
        rdata[1].push(ele.min+ele.std)
        rdata[2].push(ele.max-ele.std)
        rdata[3].push(ele.max)
      }
      }
    )
    console.log("chart2", rdata)

    setRnd(trnd)
    setChart(rdata)
  }, [])
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    xAxis: {
      data: rnd
    },
    yAxis: {},
    series: [
      {
        type: 'candlestick',
        data: chart
      }
    ]
  };
  return (<ReactEcharts option={option} 
    width="100%"
    height="600px"/>)
}; 
export default Candlestick;