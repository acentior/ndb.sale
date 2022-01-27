import React from "react"
import { numberWithLength, getTimeDiffOverall } from "../../utilities/number"

const TimeframeBar = ({ percentage, round }) => (
    <div className="timeframe-bar">
        <div
            className="timeleft"
            style={{
                width: (percentage > 0 && percentage < 101 ? percentage : 0) + "%",
                background: "#464646",
            }}
        >
            <div className="timeleft__value">
                {numberWithLength(
                    parseInt(getTimeDiffOverall(round?.startedAt, round?.endedAt) / (60 * 60))
                )}
                :
                {numberWithLength(
                    parseInt(
                        (getTimeDiffOverall(round?.startedAt, round?.endedAt) % (60 * 60)) / 60
                    )
                )}
                :
                {numberWithLength(
                    parseInt(getTimeDiffOverall(round?.startedAt, round?.endedAt) % 60)
                )}
            </div>
        </div>
    </div>
)

export default TimeframeBar
