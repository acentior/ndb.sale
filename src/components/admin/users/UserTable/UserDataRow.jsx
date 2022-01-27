import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import { device } from "../../../../utilities/device";
import { width } from "./columnWidth";
import DeleteConfirmModal from "../../DeleteConfirmModal";

const UserDataRow = ({ datum, index }) => {
    const [show, setShow] = useState(false)
    const [showBtns, setShowBtns] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [email, setEmail] = useState(datum.email)

    const deleteUser = () => {
        setIsConfirmOpen(false)
    }

    return (
        <>
            <DataRow>
                <Main>
                    <div className="name">
                        <p style={{ color: "#ffffff", fontWeight: "700" }}>{datum.name}</p>
                        <p style={{ fontSize: 14, color: "dimgrey" }}>{datum.avatar}</p>
                    </div>
                    <div className="contact">
                        <p>{datum.email}</p>
                        <p>{datum.phone}</p>
                    </div>
                    <div className="password">
                        <p>
                            {datum.password}{" "}
                            <span style={{ fontSize: 18, marginLeft: 20 }}>
                                <Icon
                                    icon="clarity:refresh-line"
                                    onClick={() => {
                                        setEmail(datum.email)
                                        setModalIsOpen(true)
                                    }}
                                />
                            </span>
                        </p>
                    </div>
                    <div className="country">
                        <p>{datum.country}</p>
                    </div>
                    <div className="privilege">
                        <p className="privilege">
                            {datum.privilege}
                            {!show && <Icon icon="whh:avatar" />}
                        </p>
                    </div>
                    <div className="action">
                        <div className="btns">
                            <span className="edit">
                                <Icon icon="clarity:note-edit-line" />
                            </span>
                            <span className="eye">
                                <Icon
                                    icon="akar-icons:eye"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#id${index}`}
                                    onClick={() => setShow(!show)}
                                />
                            </span>
                            <span className="trash">
                                <Icon
                                    icon="akar-icons:trash-can"
                                    onClick={() => setIsConfirmOpen(true)}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="brief">
                        <div>
                            {!show ? (
                                <span>
                                    <Icon
                                        icon={showBtns ? "ep:close-bold" : "bi:three-dots"}
                                        onClick={() => setShowBtns(!showBtns)}
                                    />
                                </span>
                            ) : (
                                <span>
                                    <Icon
                                        icon="ant-design:caret-up-filled"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#id${index}`}
                                        onClick={() => setShow(!show)}
                                    />
                                </span>
                            )}
                        </div>
                        <BtnsContainer show={showBtns}>
                            <Main>
                                <div className="btns">
                                    <span className="edit">
                                        <Icon icon="clarity:note-edit-line" />
                                    </span>
                                    <span className="eye">
                                        <Icon
                                            icon="akar-icons:eye"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#id${index}`}
                                            onClick={() => {
                                                setShow(!show)
                                                setShowBtns(!showBtns)
                                            }}
                                        />
                                    </span>
                                    <span className="trash">
                                        <Icon
                                            icon="akar-icons:trash-can"
                                            onClick={() => setIsConfirmOpen(true)}
                                        />
                                    </span>
                                </div>
                            </Main>
                            <Toggle style={{ display: show ? "flex" : "none" }}>
                                <div className="btns">
                                    <span className="mailbox">
                                        <Icon icon="uil:mailbox" />
                                    </span>
                                    <span className="user">
                                        <Icon icon="ant-design:user-outlined" />
                                    </span>
                                    <span className="phone">
                                        <Icon icon="bi:phone" />
                                    </span>
                                </div>
                            </Toggle>
                        </BtnsContainer>
                    </div>
                </Main>
                <div id={`id${index}`} className="collapse">
                    <Toggle>
                        <div className="name">
                            <p>{datum.ext_wallet_provider}</p>
                        </div>
                        <div className="contact">
                            <p>{datum.ext_wallet_address}</p>
                        </div>
                        <div className="password">
                            <p>{datum.terms_signed}</p>
                        </div>
                        <div className="country">
                            <p>{datum.birth}</p>
                        </div>
                        <div className="privilege">
                            <p>{datum.currency}</p>
                        </div>
                        <div className="action">
                            <div className="btns">
                                <span className="mailbox">
                                    <Icon icon="uil:mailbox" />
                                </span>
                                <span className="user">
                                    <Icon icon="ant-design:user-outlined" />
                                </span>
                                <span className="phone">
                                    <Icon icon="bi:phone" />
                                </span>
                            </div>
                        </div>
                        <div className="brief">
                            <div>
                                <span className="showBtns">
                                    <Icon
                                        icon={showBtns ? "ep:close-bold" : "bi:three-dots"}
                                        onClick={() => setShowBtns(!showBtns)}
                                    />
                                </span>
                            </div>
                        </div>
                    </Toggle>
                </div>
            </DataRow>

            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className="left">
                            <p className="text-white" style={{ fontSize: 16, fontWeight: "700" }}>
                                {datum.name}
                            </p>
                            <p style={{ color: "dimgrey" }}>{datum.avatar}</p>
                        </div>
                        <div className="right" style={{ position: "relative" }}>
                            <p>
                                <span>
                                    <Icon
                                        icon={showBtns ? "ep:close-bold" : "bi:three-dots"}
                                        onClick={() => setShowBtns(!showBtns)}
                                    />
                                </span>
                            </p>
                            <BtnsContainer show={showBtns}>
                                <Main>
                                    <div className="btns">
                                        <span className="edit">
                                            <Icon icon="clarity:note-edit-line" />
                                        </span>
                                        <span className="eye">
                                            <Icon
                                                icon="akar-icons:eye"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#id${index}`}
                                                onClick={() => {
                                                    setShow(!show)
                                                    setShowBtns(!showBtns)
                                                }}
                                            />
                                        </span>
                                        <span className="trash">
                                            <Icon
                                                icon="akar-icons:trash-can"
                                                onClick={() => setIsConfirmOpen(true)}
                                            />
                                        </span>
                                    </div>
                                </Main>
                                <Toggle style={{ display: show ? "flex" : "none" }}>
                                    <div className="btns">
                                        <span className="mailbox">
                                            <Icon icon="uil:mailbox" />
                                        </span>
                                        <span className="user">
                                            <Icon icon="ant-design:user-outlined" />
                                        </span>
                                        <span className="phone">
                                            <Icon icon="bi:phone" />
                                        </span>
                                    </div>
                                </Toggle>
                            </BtnsContainer>
                        </div>
                        <div
                            className="right"
                            data-bs-toggle="collapse"
                            data-bs-target={`#id${index}`}
                            onClick={() => setShow(!show)}
                            onKeyDown={() => setShow(!show)}
                            aria-hidden="true"
                        >
                            <p>
                                <span>
                                    <Icon
                                        icon={
                                            show
                                                ? "ant-design:caret-up-filled"
                                                : "ant-design:caret-down-filled"
                                        }
                                    />
                                </span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id={`id${index}`} className="collapse">
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgrey" }}>Contact</p>
                        </div>
                        <div className="right">
                            <p>{datum.email}</p>
                            <p>{datum.phone}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgrey" }}>Password</p>
                        </div>
                        <div className="right" style={{ width: "50%" }}>
                            <p>
                                ********
                                <span>
                                    <Icon
                                        icon="clarity:refresh-line"
                                        onClick={() => setModalIsOpen(true)}
                                    />
                                </span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgrey" }}>Country</p>
                        </div>
                        <div className="right">
                            <p>{datum.country}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ fontSize: 14, fontWeight: 600 }}>Privilege</p>
                        </div>
                        <div className="right" style={{ width: "50%" }}>
                            <p style={{ textTransform: "uppercase" }}>
                                {datum.privilege}{" "}
                                <span>
                                    <Icon icon="whh:avatar" />
                                </span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgray" }}>External Wallet Privider</p>
                        </div>
                        <div className="right">
                            <p>{datum.ext_wallet_provider}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgray" }}>External Wallet Address</p>
                        </div>
                        <div className="right">
                            <p>{datum.ext_wallet_address}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgray" }}>Terms Signed</p>
                        </div>
                        <div className="right">
                            <p>{datum.terms_signed}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgray" }}>Birthday</p>
                        </div>
                        <div className="right">
                            <p>{datum.birth}</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                className="pwd-reset-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <p>Reset Password</p>
                    <div
                        onClick={() => setModalIsOpen(false)}
                        onKeyDown={() => setModalIsOpen(false)}
                        role="button"
                        tabIndex="0"
                    >
                        <Icon icon="ep:close-bold" />
                    </div>
                </div>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <div className="description">
                        <p>To reset a user's password type in the user's email.</p>
                        <p>They will be sent an email with the new password.</p>
                    </div>
                    <div className="input">
                        <p className="mt-4" style={{ fontSize: 12 }}>
                            Email
                        </p>
                        <input
                            className="black_input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="pwd-modal__footer mt-5">
                        <button className="btn previous" onClick={() => setModalIsOpen(false)}>
                            Cancel
                        </button>
                        <button className="btn next">Reset Password</button>
                    </div>
                </form>
            </Modal>
            <DeleteConfirmModal
                isModalOpen={isConfirmOpen}
                setIsModalOpen={setIsConfirmOpen}
                confirmData={datum.name}
                doAction={deleteUser}
            />
        </>
    )
}

export default UserDataRow

const DataRow = styled.div`
    min-height: 80px;
    border-bottom: 1px solid #464646;

    div.name {
        width: ${width.name};
        padding-left: 16px;
    }
    div.contact {
        width: ${width.contact};
    }
    div.password {
        width: ${width.password};
    }
    div.country {
        width: ${width.country};
    }
    div.privilege {
        width: ${width.privilege};
    }
    div.action {
        width: ${width.action};
    }
    div.brief {
        width: ${width.brief};
    }

    div.brief {
        display: none;
        position: relative;
    }
    @media screen and (max-width: ${device["laptop-md"]}) {
        div.privilege {
            width: 13%;
        }
        div.action {
            display: none;
        }
        div.brief {
            display: block;
        }
    }
    @media screen and (max-width: ${device["phone"]}) {
        display: none;
    }
`

const Main = styled.div`
    height: 80px;
    padding: 8px 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p.privilege {
        text-transform: uppercase;
        position: relative;
        svg {
            position: absolute;
            right: 0;
            top: 5px;
        }
    }
    span {
        width: 33%;
        display: inline-block;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
    }
    div.btns {
        width: 100%;
        span.edit {
            color: #2e65f3;
            border-right: 2px solid dimgrey;
        }
        span.eye {
            color: #ffffff;
            border-right: 2px solid dimgrey;
        }
        span.trash {
            color: #f32d2d;
        }
    }
`

const Toggle = styled.div`
    height: 80px;
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    span.showBtns {
        cursor: pointer;
    }
    div.btns {
        width: 100%;
        span {
            width: 33%;
            display: inline-block;
            text-align: center;
            font-size: 20px;
        }
        span.mailbox {
            color: #23c865;
            border-right: 2px solid dimgrey;
        }
        span.user {
            color: #23c865;
            border-right: 2px solid dimgrey;
        }
        span.phone {
            color: dimgrey;
        }
    }
`

const BtnsContainer = styled.div`
    position: absolute;
    width: 200px;
    right: 120%;
    top: -25px;
    border-radius: 5px;
    background: #000000;
    transition: 0.3s;
    display: ${(props) => {
        return props.show ? "block" : "none"
    }};
    &:after {
        content: " ";
        position: absolute;
        bottom: 30px;
        left: 100%;
        margin-top: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: transparent transparent transparent black;
    }
    @media screen and (max-width: ${device["phone"]}) {
        right: 90%;
        top: -15px;
        &::after {
            top: 25px;
            bottom: unset;
        }
    }
`

// For Mobile
const DataRowForMobile = styled.div`
    min-height: 70px;
    border-bottom: 1px solid #464646;
    padding: 16px;
    display: none;

    @media screen and (max-width: ${device["phone"]}) {
        display: flex;
        flex-direction: column;
    }
`

const UnitRowForMobile = styled.div`
    display: flex;
    justify-content: space-between;
    & > div.left {
        width: 90%;
    }
    & > div.right {
        p {
            text-align: right;
            span {
                font-size: 16px;
                margin-left: 20px;
            }
        }
    }
    svg {
        cursor: pointer;
    }
`
