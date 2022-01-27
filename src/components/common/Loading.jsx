import React from "react"

const Loading = ({ position }) => {
    const style = position ? {
        position
    } : null;

    return (
        <div style={style} className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading
