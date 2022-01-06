import React, { useEffect } from "react"
import parse from 'html-react-parser'
import styled from "styled-components"
import { EmptyAvatar, BaseHair, BaseExpression } from "../../../utilities/imgImport"
import { hairStyles } from "./dressup-data"

export default function DressupHorizontalList({
    list = [],
    topic,
    title,
    selectedItem,
    setSelectedItem,
    secondRow,
    hairStyle
}) {
    const isScrollable = list.length >= 3

    useEffect(() => {
        let item = document.getElementById(`items-list-view-${secondRow ? "2" : "1"}`)
        item.scrollLeft = selectedItem * 149 - 100
    }, [selectedItem, secondRow])

    return (
        <div className="row m-0">
            <div className="mb-2 ps-0">{title}</div>
            <div
                id={`items-list-view-${secondRow ? "2" : "1"}`}
                className={`row me-4 dress-up-modal-items-horizontal-list border-top border-bottom border-secondary border-1 ${
                    isScrollable ? "d-inline-block" : "d-auto"
                }`}
            >
                {list.length > 0? list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                marginTop: "-1px",
                            }}
                            onClick={() => setSelectedItem(item.id)}
                            role="presentation"
                            className={`border border-4 cursor-pointer ${
                                selectedItem === item.id
                                    ? "border-success"
                                    : "border-transparent"
                            }`}
                        >
                            <div className="image_div">
                            {topic !== "hairColors" && (
                                <>                                
                                    {topic === 'hairStyles' || !topic? <img src={EmptyAvatar} alt="Background Avatar" />: ''}
                                    {topic === 'expressions'? (
                                        <>
                                            <img src={EmptyAvatar} alt="Background Avatar" />
                                            <div style={{top: -10, left: -5}}>
                                                <img src={BaseHair} alt="base hair" />
                                            </div>
                                        </>
                                    ): ''}
                                    {topic === 'hats' || topic === 'others' || topic === 'facialStyles'? (
                                        <>
                                            <img src={EmptyAvatar} alt="Background Avatar" />
                                            <div style={{top: -10, left: -5}}>
                                                <img src={BaseHair} alt="base hair" />
                                            </div>
                                            <div style={{top: 23, left: 23}}>
                                                <img src={BaseExpression} alt="base expression" />
                                            </div>
                                        </>
                                    ): ''}
                                    <div style={{top: list[index].top, left: list[index].left}}>
                                        {parse(list[index].content)}
                                    </div>
                                </>
                            )}
                            {topic === 'hairColors' && (
                                <>
                                    <img src={EmptyAvatar} alt="Background Avatar" />
                                    <Hair hairColor={item.content} style={{top: hairStyles[hairStyle].top, left: hairStyles[hairStyle].left}}>
                                        {parse(hairStyles[hairStyle].content)}
                                    </Hair>
                                </>                                
                            )}
                            </div>
                            {/* <div className="price_div">
                                {item.price}
                                <span className="text-success">{item.unit}</span>
                            </div> */}
                        </div>
                    )
                }): ''}
            </div>
        </div>
    )
}

const Hair = styled.div`
    svg>path {
        fill: ${props => {
            return props.hairColor? props.hairColor: '#626161';
        }}
    }
`;