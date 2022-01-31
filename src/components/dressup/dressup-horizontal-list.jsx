import React, { useEffect } from "react"

export default function DressupHorizontalList({
    list,
    title,
    selectedItem,
    setSelectedItem,
    secondRow,
}) {
    const isScrollable = list.length >= 3

    useEffect(() => {
        let item = document.getElementById(`items-list-view-${secondRow ? "2" : "1"}`)
    
                    return (
                        <div
                            key={index}
                            style={{
                                marginTop: "-1px",
                            }}
                            onClick={() => setSelectedItem(item.index)}
                            role="presentation"
                            className={`border border-4 text-center cursor-pointer ${
                                selectedItem === item.index
                                    ? "border-success"
                                    : "border-transparent"
                            }`}
                        >
                            <img src={item.icon} alt="Avatar" />
                            <div>
                                {item.price}
                                <span className="text-success">{item.unit}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
