import React, {useState, useEffect} from "react";
import ReactEcharts from "echarts-for-react"; 

const  Linechart = ({data}) => {
    console.log("data1", data.getAuctions)  

    const [total, setTotal] = useState([])
    const [sold, setSold] = useState([])
    const [min, setMin] = useState(0)
    useEffect(() => {
        let ttotal = []
        let tsold = []
        let tmin = data.getAuctions.at(0).totalToken
        console.log("data", data)
        data.getAuctions.forEach( (ele) => {
            if (ele.totalToken < tmin) tmin = ele.totalToken
            ttotal.push([ele.totalToken, ele.minPrice * ele.totalToken])
            tsold.push([ele.totalToken, ele.minPrice * ele.sold])
          }
        )
        setTotal(ttotal.sort((a, b) => {return a[0]-b[0]}))
        setSold(tsold.sort((a, b) => {return a[0]-b[0]}))
        setMin(tmin)
        // var tmp = [[],[],[]]
        // rdata.sort((a, b) => {return a[0] - b[0]}).forEach((ele) => {
        //     tmp[0].push(ele[0])
        //     tmp[1].push(ele[1])
        //     tmp[2].push(ele[2])
        // })
        
        // setChartdata(tmp.slice())
        // console.log("rdata111", tmp[0])
    }, [])

    return <ReactEcharts option={{
        tooltip: {
            trigger: 'item',
            axisPointer: {
              axis: 'x',
              type: 'cross',
              // label: {
              //   backgroundColor: "#23C865" 
              // }
            },
            triggerTooltip: true,
          },
          xAxis: {
            splitLine : {
              show: false
            },
            min: min
          },
          yAxis: 
          {
            axisPointer: {
              label: {
                backgroundColor: "#23C865" 
              }
            },
          },
          series: [
            {
              type: "line",
              smooth: true,
              data: total,
              color: "#23C865",
              name: "total",
              tooltip: {
                label: {
                  backgroundColor: "#23C865" 
                }
              }
            },
            {
              type: "line",
              smooth: "true",
              data: sold,
              color: "#FFB800",
              name: "sold"
            }
          ]
    }}
    width="100%"
    height="600px" />;
} 
export default Linechart;