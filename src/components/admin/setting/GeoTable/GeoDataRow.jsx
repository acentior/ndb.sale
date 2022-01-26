import React, { useState } from "react"
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { Icon } from "@iconify/react"
import { device } from "../../../../utilities/device"
import { width } from "./columnWidth"
import DeleteConfirmModal from "../../DeleteConfirmModal"
import { make_Allow_Country } from "../../../../redux/actions/geoLocationAction";

const GeoDataRow = ({ datum }) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [deletePending, setDeletePending] = useState(false);

    const deleteCountry = async () => {
        setDeletePending(true);
        await dispatch(make_Allow_Country(datum.id));
        setDeletePending(false);
        setIsConfirmOpen(false);
    }

    return (
        <>
            <DataRow>
                <div className="country">
                    <Main>
                        <p style={{ fontSize: 16, fontWeight: "700" }}>{datum.country}</p>
                    </Main>
                </div>
                <div className="note">
                    <Main>
                        <p>{datum.countryCode}</p>
                    </Main>
                </div>
                <div className="edit">
                    <Main>
                        <p>
                            <span className="delete">
                                <Icon
                                    icon="akar-icons:trash-can"
                                    onClick={() => setIsConfirmOpen(true)}
                                />
                            </span>
                        </p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className="left">
                            <p className="text-white" style={{ fontSize: 16, fontWeight: "700" }}>
                                {datum.country}
                            </p>
                        </div>
                        <div className="right">
                            <p>
                                <span className="delete">
                                    <Icon
                                        icon="akar-icons:trash-can"
                                        onClick={() => setIsConfirmOpen(true)}
                                    />
                                </span>
                            </p>
                        </div>
                        <div className="right">
                            <p style={{ fontSize: 16 }}>
                                <span>
                                    <Icon
                                        icon={
                                            show
                                                ? "ant-design:caret-up-filled"
                                                : "ant-design:caret-down-filled"
                                        }
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#id${datum.id}`}
                                        onClick={() => setShow(!show)}
                                    />
                                </span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id={`id${datum.id}`} className="collapse">
                    <UnitRowForMobile>
                        <div className="left">
                            <p style={{ color: "dimgrey" }}>Alpha-2</p>
                        </div>
                        <div className="right">
                            <p>{datum.countryCode}</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
            <DeleteConfirmModal
                isModalOpen={isConfirmOpen}
                setIsModalOpen={setIsConfirmOpen}
                confirmData={datum.country}
                doAction={deleteCountry}
                pending={deletePending}
            />
        </>
    )
}

export default GeoDataRow

const DataRow = styled.div`
    min-height: 80px;
    padding: 8px 2px;
    border-bottom: 1px solid #464646;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    svg {
        cursor: pointer;
    }

    & > div.country {
        width: ${width.country};
        padding-left: 16px;
    }
    & > div.note {
        width: ${width.note};
    }
    & > div.edit {
        width: ${width.edit};
    }

    span.delete {
        color: #f32d2d;
        font-size: 22px;
    }

    @media screen and (max-width: ${device["phone"]}) {
        display: none;
    }
`

const Main = styled.div`
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

// For Mobile
const DataRowForMobile = styled.div`
    min-height: 50px;
    border-bottom: 1px solid #464646;
    padding: 16px;
    display: none;
    svg {
        cursor: pointer;
    }
    @media screen and (max-width: ${device["phone"]}) {
        display: flex;
        flex-direction: column;
    }
`

const UnitRowForMobile = styled.div`
    display: flex;
    justify-content: space-between;
    & > div.left {
        width: 70%;
    }
    & > div.right {
        p {
            text-align: right;
        }
    }
    span.delete {
        color: #f32d2d;
        font-size: 22px;
    }
`
