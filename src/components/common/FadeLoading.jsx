import React from "react"

const Loading = ({ position }) => {
    const style = position
        ? {
              position,
          }
        : null

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "#1e1e1e80" }}>
            <div style={style} className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading
