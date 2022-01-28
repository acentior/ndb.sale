import React, { useEffect, useState } from "react"
import { numberWithLength, getSecTomorrow } from "../../utilities/number"

const CountDown = () => {
    const [curTime, setCurTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    useEffect(() => {
        const id = setInterval(() => {
            setCurTime({
                hours: parseInt(getSecTomorrow() / (60 * 60)),
                minutes: parseInt((getSecTomorrow() % (60 * 60)) / 60),
                seconds: parseInt(getSecTomorrow() % 60),
            })
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [])
    return (
        <div className="countdown-wrapper d-flex justify-content-md-end justify-content-center">
            <div className="time-section">
                <p className="time">{numberWithLength(curTime.hours, 2)}</p>
                <small className="time-text">hrs</small>
            </div>
            <div className="time-section">
                <p className="time">&nbsp;:&nbsp;</p>
            </div>
            <div className="time-section">
                <p className="time">{numberWithLength(curTime.minutes, 2)}</p>
                <small className="time-text">min</small>
            </div>
            <div className="time-section">
                <p className="time">&nbsp;:&nbsp;</p>
            </div>
            <div className="time-section">
                <p className="time">{numberWithLength(curTime.seconds, 2)}</p>
                <small className="time-text">sec</small>
            </div>
        </div>
    )
}

export default CountDown
