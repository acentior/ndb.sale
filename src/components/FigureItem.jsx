import React from "react"
import AvatarImage from "./admin/shared/AvatarImage"

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
                <div className="mt-3 w-100">
                    <AvatarImage avatar={figure.avatar} />
                </div>
            </div>
            <p className="figure-item__name text-center">{figure.lastname}</p>
        </div>
    )
}

export default FigureItem
