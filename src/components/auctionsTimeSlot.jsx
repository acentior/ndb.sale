import React, {useEffect, useState} from "react"
import {
    numberWithLength,
    getTimeDiffOverall,
    isInbetween,
    getDiffOverall
} from "../utilities/number"

const AcutionTimeSlot = ({fnSelectedRoundData }) => {

    const [time, setTime] = useState(Date.now());

    

    const distanceToDate = getTimeDiffOverall(
        fnSelectedRoundData()?.startedAt,
        fnSelectedRoundData()?.endedAt
    ) // 86400
    const duration = getDiffOverall(
        fnSelectedRoundData()?.startedAt,
        fnSelectedRoundData()?.endedAt
    ) //getSecTomorrow()
    const percentage = (distanceToDate / duration) * 100

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
          clearInterval(interval);
        };
      }, []);
      
    return (
        <div>
            { isInbetween(fnSelectedRoundData()?.startedAt,
                                                fnSelectedRoundData()?.endedAt) && <div className="timeframe-bar">
                            <div
                                className="timeleft"
                                style={{
                                    width:
                                        (percentage > 0 && percentage < 101 ? percentage : 0) + "%",
                                    background: "#464646",
                                }}
                            >
                                <div className="timeleft__value">
                                    {numberWithLength(
                                        parseInt(
                                            getTimeDiffOverall(
                                                fnSelectedRoundData()?.startedAt,
                                                fnSelectedRoundData()?.endedAt
                                            )/(60 * 60)
                                        )
                                    )}
                                    :
                                    {numberWithLength(
                                        parseInt(
                                            (getTimeDiffOverall(
                                                fnSelectedRoundData()?.startedAt,
                                                fnSelectedRoundData()?.endedAt
                                            ) %
                                                (60 * 60)) /
                                                60
                                        )
                                    )}
                                    :
                                    {numberWithLength(
                                        parseInt(
                                            getTimeDiffOverall(
                                                fnSelectedRoundData()?.startedAt,
                                                fnSelectedRoundData()?.endedAt
                                            ) % 60
                                        )
                                    )}
                                </div>
                            </div>
                        </div>}
        </div>
    )
}

export default AcutionTimeSlot
