import React from "react"

export default function CustomSpinner({ color = "white" }) {
    return (
        <div
            className={`spinner-border text-${color}`}
            style={{ borderWidth: "2px" }}
            role="status"
        ></div>
    )
}
