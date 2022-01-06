import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({data}) => {
  const options = {
    // title: "Company Performance",
    curveType: "function",
    'width': "100%",
    'height': "100%",
    'chartArea': {'width': '85%', 'height': '80%'},
    // legend: { position: "bottom" },
    backgroundColor: "none",
    colors: ["#23C865", "#FFB800"],
    hAxis: {
      gridlines: {
          color: 'transparent'
      },
      format: 'short',
      
    },
    vAxis: {
      format: 'short',
      gridlines: {
        color: "#666666",
      },
    },
    legend: "none"
  };

  const [chartdata, setChartdata] = useState([])
  useEffect(() => {
    let rdata = []
    data.data.getAuctions.forEach( (ele) => {
        rdata.push([ele.totalToken, ele.minPrice * ele.totalToken, ele.minPrice * ele.sold])
      }
    )
    let tmp = rdata.sort((a, b) => {return a[0] - b[0]})
    tmp.unshift(["total token", "total price", "sold price"])
    setChartdata(tmp)
    console.log("rdata111", tmp)
  }, [])

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartdata}
      options={options}
    />
  );
}

export default LineChart;