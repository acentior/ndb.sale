import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { SilverCoin } from "../../utilities/imgImport";




// const data = [["day", "a", "b", "c", "d"]]

// jsonData2.data.getRoundPerform2.forEach( ele => {
//   data.push([ele.roundNumber, ele.min, ele.min+ele.std, ele.max-ele.std,ele.max])
// })

// console.log(data)

const isRising=  (min, max, std) => {

}

const Candlestick = ({data}) => {
  const options = {
    legend: "none",
    backgroundColor: "none",
    hAxis: {
      gridlines: {
          color: 'transparent',
      },
      format: 'short',
    },
    vAxis: {
      format: 'short',
      
      gridlines: {
        color: "#666666",
      },
    },
    'chartArea': {'width': '85%', 'height': '80%'},
    candlestick: {
      fallingColor: { strokeWidth: 1, fill: '#E8503A', stroke: '#E8503A' }, // red
      risingColor: { strokeWidth: 1, fill: '#23C865', stroke:  '#23C865'}   // green
    },
  };

  const [chartdata, setChartdata] = useState([])
  useEffect(() => {
    let rdata = []
    data.data.getRoundPerform2.forEach( (ele) => {
        rdata.push([ele.roundNumber, ele.min, ele.min+ele.std, ele.max-ele.std, ele.max, ele.min + ele.std > ele.max - ele.std ? "#23C865" : "#E8503A"])
      }
    )
    let tmp = rdata.sort((a, b) => {return a[0] - b[0]})
    tmp.unshift(["round number", "min", "min+std", "max-std", "max", {role: 'style', type: 'string'}])
    setChartdata(tmp)
    // console.log("Candlestick: ", tmp)
  }, [])

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={chartdata}
      options={options}
    />
  );
}

export default Candlestick;