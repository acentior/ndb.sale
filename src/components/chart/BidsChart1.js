import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"
import { getDataOnPeriod, numFormatter, getFormatedDateOnBids } from "../../utilities/number"

const colors = ["#C4C4C4", "#23C865"]

const BidsChart1 = ({ data ,period}) => {
    const [total, setTotal] = useState([])
    const [amount, setAmount] = useState([])
    const [zeroLabel, setZeroLabel]=useState('')
    const [stDate, setStartDate]=useState(0)

    useEffect(() => {
        let tTotal = []
        let tAmount = []
        let list = []
        console.log(data)
        data?.getBidList.forEach((x) => list.push(x))
        list.sort((a, b) => {
            return a.placedAt - b.placedAt
        })

        var tmpData = getDataOnPeriod(list, period)
        setZeroLabel(tmpData.zeroLabel)
        setStartDate(tmpData.fData[0].placedAt)
        tmpData.fData.forEach((ele) => {
            tTotal.push({ value: [new Date(ele.placedAt), ele.totalPrice] })
            tAmount.push({ value: [new Date(ele.placedAt), ele.tokenAmount] })
        })
        
        setTotal(tTotal)
        setAmount(tAmount)
        console.log(tTotal)
        
    }, [data,period])

    const option = {
        color: colors,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
            position:'middle'
        },
        grid: [
            {
                left: 75,
                right: 10,
                top: "5%",
                height: "50%",
            },
            {
                left: 75,
                right: 10,
                top: "65%",
                height: "30%",
            },
        ],
        axisPointer: {
            link: [
                {
                    xAxisIndex: "all",
                },
            ],
        },
        xAxis: [
            {
                type: "time",
                axisTick: {
                    alignWithLabel: true,
                },
                show: false,
                splitNumber:2,
                axisPointer:{
                    label:{
                        show:false
                    }
                },
                axisLabel:{
                    margin:30
                }
            },
            {
                type: "time",
                axisTick: {
                    alignWithLabel: true,
                },
                min:stDate,
                gridIndex: 1,
                splitNumber:2,
                axisPointer:{
                    label:{
                        formatter: function (value,index) {
                        
                            return getFormatedDateOnBids(value.value,period)
                        },
                        width:70,
                        padding:[4,2,2,5]
                    }
                },
                axisLabel:{
                    margin:12,
                },
                scale:true
            }
        ],
        
        yAxis: [
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: function (value) {
                        return numFormatter(value, 0)
                    },
                    margin:30,
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#23C865",
                        color:"#fff",
                        formatter: function (value,index) {
                             return numFormatter(value.value, 0)
                        },
                        width:50,
                        padding:[4,2,2,30]
                    },
                    margin:"10%",
                },
                offset:20,
                position:{
                    align:'right'
                }
            },
            {
                type: "value",
                min: 0,
                axisLabel: {
                    formatter: function (value,index) {
                        return numFormatter(value, 0)
                    },
                    margin:30
                },
                axisPointer: {
                    label: {
                        backgroundColor: "#fff",
                        color:"#7a7a7a",
                        width:70,
                        padding:[4,2,2,10],
                    },
                    margin:"10%",
                    position:{
                        align:'right'
                    }
                },
                offset:20,
                gridIndex: 1,
                name:zeroLabel.toString(),
                nameLocation:"start"
            },
        ],
        series: [
            {
                name: "Price",
                type: "bar",
                data: amount,
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: 15,
            },
            {
                name: "Volume",
                type: "line",
                smooth: "true",
                
                showSymbol: false,
                data: total,
            }
            
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
