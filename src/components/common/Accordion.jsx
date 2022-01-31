import React, { useState } from "react"

const Accordion = ({ question, answer }) => {
    const [active, setActive] = useState(false)

    const handleClick
            >
                <span>{question}</span>
                <span className="sign" />
            </button>

            <div className="accordion__content">{answer}</div>
        </div>
    )
}

export default Accordion
