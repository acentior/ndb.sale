import React, { useState } from "react"
import Modal from "react-modal"
import parse from 'html-react-parser'
import styled from "styled-components"
import { DressupData } from "../../../utilities/dressup-data"
import { CloseIcon, EmptyAvatar } from "../../../utilities/imgImport"
import DressupHorizontalList from "./dressup-horizontal-list"
import { hairStyles, facialStyles, expressions, hats, others, hairColors } from './dressup-data';

export default function DressupModal({ isModalOpen, setIsModalOpen, setDressUpAvatarItems }) {
    const [selectedHairStyle, setSelectedHairStyle] = useState(0)
    const [selectedHairColor, setSelectedHairColor] = useState(0)
    const [selectedFacialStyle, setSelectedFacialStyle] = useState(0)
    const [selectedExpression, setSelectedExpression] = useState(0)
    const [selectedHat, setSelectedHat] = useState(0)
    const [selectedOther, setSelectedOther] = useState(0)

    const [selectedTab, setSelectedTab] = useState(0)

    const saveAvatarItems = () => {
        setDressUpAvatarItems({
            hair: selectedHairStyle,
            hairColor: selectedHairColor,
            facialStyle: selectedFacialStyle,
            expression: selectedExpression,
            hat: selectedHat,
            other: selectedOther
        });
        setIsModalOpen(false);
    }
    // console.log(EmptyAvatar)
    
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
                setIsModalOpen(false)
            }}
            ariaHideApp={false}
            className="dress-up-modal"
            overlayClassName="dress-up-modal__overlay"
        >
            <div className="dress-up-modal__header">
                <div
                    onClick={() => setIsModalOpen(false)}
                    onKeyDown={() => setIsModalOpen(false)}
                    role="button"
                    tabIndex="0"
                >
                    <img
                        width="14px"
                        height="14px"
                        src={CloseIcon}
                        className="mt-3 me-3"
                        alt="close"
                    />
                </div>
            </div>
            <div className="row m-0 py-4 text-white">
                <div className="col-4">
                    <div className="row">
                        <div className="profile">
                            <div className="image_div">
                                <img src={EmptyAvatar} alt="back" />
                                <Hair hairColor={hairColors[selectedHairColor].content} style={{top: hairStyles[selectedHairStyle].top, left: hairStyles[selectedHairStyle].left}}>
                                    {parse(hairStyles[selectedHairStyle].content)}
                                </Hair>
                                <div style={{top: expressions[selectedExpression].top, left: expressions[selectedExpression].left}}>
                                    {parse(expressions[selectedExpression].content)}
                                </div>
                                <div style={{top: facialStyles[selectedFacialStyle].top, left: facialStyles[selectedFacialStyle].left}}>
                                    {parse(facialStyles[selectedFacialStyle].content)}
                                </div>
                                <div style={{top: hats[selectedHat].top, left: hats[selectedHat].left}}>
                                    {parse(hats[selectedHat].content)}
                                </div>
                                <div style={{top: others[selectedOther].top, left: others[selectedOther].left}}>
                                    {parse(others[selectedOther].content)}
                                </div>
                            </div>
                        </div>

                        <span className="text-center dress-up-modal-avatar-name mt-3">Tesla</span>
                        <div className="dress-up-modal-sections-list">
                            {DressupData.tabs.map((item) => (
                                <div
                                    onClick={() => setSelectedTab(item.index)}
                                    onKeyDown={() => setSelectedTab(item.index)}
                                    role="presentation"
                                    key={item.index}
                                    className={`${item.index === selectedTab && "active"}`}
                                >
                                    {item.title}
                                </div>
                            ))}
                          </div>
                        <div className="btn-save" onClick={saveAvatarItems}>save</div>
                    </div>
                </div>
                <div className="col-8 border-start px-5 py-3">
                    {selectedTab === 0 && (
                        <div className="dress-up-modal-hair-section">
                            <DressupHorizontalList
                                topic="hairStyles"
                                title={"hair style"}
                                list={hairStyles}
                                selectedItem={selectedHairStyle}
                                setSelectedItem={setSelectedHairStyle}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                topic="hairColors"
                                title={"hair color"}
                                hairStyle={selectedHairStyle}
                                list={hairColors}
                                selectedItem={selectedHairColor}
                                setSelectedItem={setSelectedHairColor}
                                secondRow
                            />
                        </div>
                    )}
                    {selectedTab === 1 && (
                        <div className="dress-up-modal-hair-section">
                            <DressupHorizontalList
                                topic="facialStyles"
                                title={"facial style"}
                                list={facialStyles}
                                selectedItem={selectedFacialStyle}
                                setSelectedItem={setSelectedFacialStyle}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                topic="expressions"
                                title={"expressions"}
                                list={expressions}
                                selectedItem={selectedExpression}
                                setSelectedItem={setSelectedExpression}
                                secondRow
                            />
                        </div>
                    )}
                    {selectedTab === 2 && (
                        <div className="dress-up-modal-hair-section">
                            <DressupHorizontalList
                                topic="hats"
                                title={"hats"}
                                list={hats}
                                selectedItem={selectedHat}
                                setSelectedItem={setSelectedHat}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                topic="others"
                                title={"others"}
                                list={others}
                                selectedItem={selectedOther}
                                setSelectedItem={setSelectedOther}
                                secondRow
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
};

const Hair = styled.div`
    svg>path {
        fill: ${props => {
            return props.hairColor? props.hairColor: '#626161';
        }}
    }
`;