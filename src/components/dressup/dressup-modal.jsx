import React, { useState } from "react"
import Modal from "react-modal"
import { DressupData } from "../../utilities/dressup-data"
import { CloseIcon, EmptyAvatar } from "../../utilities/imgImport"
import DressupHorizontalList from "./dressup-horizontal-list"

export default function DressupModal({ isDressUPModalOpen, setIsDressUPModalOpen }) {
    const [selectedHairStyle, setSelectedHairStyle] = useState(0)
    const [selectedHairColor, setSelectedHairColor] = useState(0)
    const [selectedFacialStyle, setSelectedFacialStyle] = useState(0)
    const [selectedExpression, setSelectedExpression] = useState(0)
    const [selectedHat, setSelectedHat] = useState(0)
    const [selectedOther, setSelectedOther] = useState(0)
    const [selectedTab, setSelectedTab] = useState(0)

    const selectedHairStyleItem = DressupData.hairStyles[selectedHairStyle]
    const selectedHairColorItem = DressupData.hairColors[selectedHairColor]
    const selectedFacialStyleItem = DressupData.facialStyles[selectedFacialStyle]
    const selectedExpressionItem = DressupData.expressions[selectedExpression]
    const selectedHatItem = DressupData.hats[selectedHat]
    const selectedOtherItem = DressupData.others[selectedOther]
    return (
        <Modal
            isOpen={isDressUPModalOpen}
            onRequestClose={() => {
                setIsDressUPModalOpen(false)
            }}
            ariaHideApp={false}
            className="dressup-modal"
            overlayClassName="dressup-modal__overlay"
        >
            <div className="dressup-modal__header">
                <div
                    onClick={() => setIsDressUPModalOpen(false)}
                    onKeyDown={() => setIsDressUPModalOpen(false)}
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
                        <div className="dressup-modal-avatar">
                            {selectedHairStyleItem.isolatedIcon && (
                                <img
                                    src={
                                        selectedHairStyleItem.isolatedIcon[
                                            selectedHairColorItem.color
                                        ]
                                    }
                                    className="isolated-icons"
                                    alt=" Isolated Icon"
                                    style={{
                                        left: selectedHairStyleItem.iconLeft,
                                        top: selectedHairStyleItem.iconTop,
                                    }}
                                />
                            )}
                            {selectedFacialStyleItem?.isolatedIcon && (
                                <img
                                    src={selectedFacialStyleItem.isolatedIcon}
                                    className="isolated-icons"
                                    alt="Isolated Icon"
                                    style={{
                                        left: selectedFacialStyleItem.iconLeft,
                                        top: selectedFacialStyleItem.iconTop,
                                    }}
                                />
                            )}
                            {selectedExpressionItem?.isolatedIcon && (
                                <img
                                    src={selectedExpressionItem.isolatedIcon}
                                    className="isolated-icons"
                                    alt="Isolated Icon"
                                    style={{
                                        left: selectedExpressionItem.iconLeft,
                                        top: selectedExpressionItem.iconTop,
                                    }}
                                />
                            )}
                            {selectedHatItem?.isolatedIcon && (
                                <img
                                    src={selectedHatItem.isolatedIcon}
                                    className="isolated-icons"
                                    alt="Isolated Icon"
                                    style={{
                                        left: selectedHatItem.iconLeft,
                                        top: selectedHatItem.iconTop,
                                    }}
                                />
                            )}
                            {selectedOtherItem?.isolatedIcon && (
                                <img
                                    src={selectedOtherItem.isolatedIcon}
                                    className="isolated-icons"
                                    alt="Isolated Icon"
                                    style={{
                                        left: selectedOtherItem.iconLeft,
                                        top: selectedOtherItem.iconTop,
                                    }}
                                />
                            )}

                            <img src={EmptyAvatar} className="empty-avatar" alt="Avatar" />
                        </div>

                        <span className="text-center dressup-modal-avatar-name mt-3">Tesla</span>
                        <div className="dressup-modal-sections-list">
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
                        <div className="btn-save">save</div>
                    </div>
                </div>
                <div className="col-8 border-start px-5 py-3">
                    {selectedTab === 0 && (
                        <div className="dressup-modal-hair-section">
                            <DressupHorizontalList
                                title={"hair style"}
                                list={DressupData.hairStyles}
                                selectedItem={selectedHairStyle}
                                setSelectedItem={setSelectedHairStyle}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                title={"hair color"}
                                list={DressupData.hairColors}
                                selectedItem={selectedHairColor}
                                setSelectedItem={setSelectedHairColor}
                                secondRow
                            />
                        </div>
                    )}
                    {selectedTab === 1 && (
                        <div className="dressup-modal-hair-section">
                            <DressupHorizontalList
                                title={"facial style"}
                                list={DressupData.facialStyles}
                                selectedItem={selectedFacialStyle}
                                setSelectedItem={setSelectedFacialStyle}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                title={"expressions"}
                                list={DressupData.expressions}
                                selectedItem={selectedExpression}
                                setSelectedItem={setSelectedExpression}
                                secondRow
                            />
                        </div>
                    )}
                    {selectedTab === 2 && (
                        <div className="dressup-modal-hair-section">
                            <DressupHorizontalList
                                title={"hats"}
                                list={DressupData.hats}
                                selectedItem={selectedHat}
                                setSelectedItem={setSelectedHat}
                            />
                            <div className="mt-4"></div>
                            <DressupHorizontalList
                                title={"other"}
                                list={DressupData.others}
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
}
