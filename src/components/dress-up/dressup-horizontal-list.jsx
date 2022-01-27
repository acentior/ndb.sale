import React, { useEffect } from "react"
import parse from 'html-react-parser'
import styled from "styled-components"
import { EmptyAvatar, BaseHair } from "../../utilities/imgImport"

export default function DressupHorizontalList({
    list = [],
    topic,
    title,
    selectedItem,
    setSelectedItem,
    secondRow,
    hairStyle,
    hairStyles
}) {
    const isScrollable = true

    useEffect(() => {
        let items = document.getElementById(`items-list-view-${secondRow ? "2" : "1"}`)
        items.scrollLeft = selectedItem * 149 - 100
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
                            onClick={() => setSelectedItem(index)}
                            role="presentation"
                            className={`border border-4 cursor-pointer ${
                                selectedItem === index
                                    ? "border-success"
                                    : "border-transparent"
                            }`}
                        >
                            <div className="image_div mx-auto">
                                {topic !== "hairColors" && (
                                    <>                                
                                        {topic === 'hairStyles' || !topic? <img src={EmptyAvatar} alt="Background Avatar" />: ''}
                                        {topic === 'hats' || topic === 'others' || topic === 'facialStyles' || topic === 'expressions'? (
                                            <>
                                                <img src={EmptyAvatar} alt="Background Avatar" />
                                                <div style={{top: '-11%', left: '-4%', width: '109%'}}>
                                                    <img src={BaseHair} alt="base hair" />
                                                </div>
                                            </>
                                        ): ''}
                                        <div compid={list[index].compId} groupid={list[index].groupId} style={{top: `${list[index].top}%`, left: `${list[index].left}%`, width: `${list[index].width}%`}}>
                                            {parse(list[index].svg)}
                                        </div>
                                    </>
                                )}
                                {topic === 'hairColors' && (
                                    <>
                                        <img src={EmptyAvatar} alt="Background Avatar" />
                                        <Hair hairColor={list[index]} style={{top: `${hairStyles[hairStyle].top}%`, left: `${hairStyles[hairStyle].left}%`, width: `${hairStyles[hairStyle].width}%`}}>
                                            {parse(hairStyles[hairStyle].svg)}
                                        </Hair>
                                    </>
                                )}
                            </div>     
                            <div className="price_div">
                                {topic !== 'hairColors' && (
                                    <>
                                        {item.price}
                                        <span className="text-success"> ndb</span>
                                    </>                                    
                                )}                                
                            </div>
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