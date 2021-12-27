import React, { useState } from "react"

const Accordion = ({ question, answer }) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        const activeAccordions = document.querySelectorAll(".accordion.active")
        activeAccordions.forEach((accordion) => accordion.classList.remove("active"))

        setActive(!active)
    }

    return (
        <div className={`accordion ${active ? "active" : ""}`}>
            <button
                type="button"
                className="accordion__toggler w-100 d-flex justify-content-between"
                onClick={() => handleClick()}
            >
                <span>{question}</span>
                <span className="sign" />
            </button>

            <div className="accordion__content">{answer}</div>
        </div>
    )
}

export default Accordion
