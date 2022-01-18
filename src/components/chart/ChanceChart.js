import React, { useState, useEffect } from "react"
import ReactEcharts from "echarts-for-react"

const ChanceChart = ({ data }) => {
    const [rnd, setRnd] = useState([])
    const [wins, setWins] = useState([])
    const [fails, setFails] = useState([])

    ///////added///////////
    const [option, setOption]=useState({})
    const [winFlag, setWinFlag] = useState(true)
    const [failFlag, setFailFlag] = useState(true)

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
    }, [data,winFlag,failFlag])

    var opt = {
        color: ["#23C865", "#E8503A"],
        plugins: {
            tooltip: {
                filter: function () {
                    return false;
                }
            },
            legend: {
                display: false
            }
        },
        grid: {
            left: "0%",
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
        left: 0
    }
    if (winFlag && !failFlag){
        opt.series[0].data = wins
        opt.series[1].data = []
    }else if (!winFlag && failFlag){
        opt.series[0].data = []
        opt.series[1].data = fails
    }else if (winFlag && failFlag ){
        opt.series[0].data = wins
        opt.series[1].data = fails
    }else{
        opt.series[0].data = []
        opt.series[1].data = []
    }
    
    return (
        <React.Fragment>
            <div className="select-chart-type">
                <div className="d-flex justify-content-between mt-2 ">
                    <div>
                        <input type="checkbox" class="btn-check" id="btn-wins-outlined" autocomplete="off"   
                            onClick={
                                ()=>{setWinFlag(!winFlag)}
                            }
                        />
                        <label class="_btn _btn-wins-outlined" for="btn-wins-outlined">Win Rate</label>
                    </div>
                    <div >
                        <input type="checkbox" class="btn-check" id="btn-fails-outlined" autocomplete="off"   
                            onClick={
                                ()=>{setFailFlag(!failFlag)}
                            }
                        />
                        <label class="_btn _btn-fails-outlined" for="btn-fails-outlined">Fail Rate</label>
                    </div>
                    
                </div>
            </div>
            <ReactEcharts
                option={opt}
                style={{ height: "500px", width: "100%" }}
                className="echarts-for-echarts"
            />
        </React.Fragment>
    )
}

export default ChanceChart
