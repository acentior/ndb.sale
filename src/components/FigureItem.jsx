import React from "react"

const FigureItem = ({ figure, onFigureSelect, active }) => {
    return (
        <div
            className={`figure-item ${active && "active"}`}
            onClick={() => onFigureSelect(figure.id)}
            onKeyDown={() => onFigureSelect(figure.id)}
            role="button"
            tabIndex="0"
        >
            <div className="figure-item__avatar">
                <img src={figure.avatar} className="w-100" alt="figure item" />
            </div>
            <p className="figure-item__name">{figure.lastname}</p>
        </div>
    )
}

export default FigureItem
