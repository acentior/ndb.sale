import React from "react"
import { useQuery } from "@apollo/client"
import { GET_TASK_SETTING, GET_USER_TIERS, GET_USER_TIER_TASK } from "./profile-queries"
import { useState } from "react"
import CustomSpinner from "../common/custom-spinner"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"

export default function TierDetailsTab() {
    // Webserivce
    const { data: gainPoints } = useQuery(GET_USER_TIER_TASK, {
        fetchPolicy: "network-only",
        onCompleted: () => setGainPointsData(gainPoints.getUserTierTask),
    })

    const { data: taskSetting } = useQuery(GET_TASK_SETTING, {
        fetchPolicy: "network-only",
        onCompleted: () => setTaskSettingData(taskSetting.getTaskSetting),
    })

    const { data: userTiers } = useQuery(GET_USER_TIERS, {
        fetchPolicy: "network-only",
        onCompleted: () => setUserTiersData(userTiers.getUserTiers),
    })

    const { data: user } = useQuery(GET_USER, {
        fetchPolicy: "network-only",
        onCompleted: () => setUserData(user.getUser),
    })

    // Containers
    const [gainPointsData, setGainPointsData] = useState(null)
    const [taskSettingData, setTaskSettingData] = useState(null)
    const [userTiersData, setUserTiersData] = useState(null)
    const [userData, setUserData] = useState(null)
    const loadingSection = !(gainPointsData && taskSettingData && userTiers && userData)
    const currentTier = userTiersData?.filter((item) => item?.level === userData?.tierLevel)
    const nextTier = userTiersData?.filter((item) => item?.level === userData?.tierLevel + 1)
    // Methods

    if (loadingSection)
        return (
            <div className="d-flex justify-content-center my-5">
                <CustomSpinner />
            </div>
        )
    else
        return (
            <>
                <div className="tier-details">
                    <div className="row w-100 mx-auto">
                        <div className="col-6 br">Tier</div>
                        <div className="col-6 text-end text-sm-start d-flex align-items-center justify-content-end justify-content-sm-start">
                            {currentTier?.length > 0 ? (
                                <div
                                    className="me-3"
                                    dangerouslySetInnerHTML={{ __html: currentTier[0]?.svg }}
                                />
                            ) : (
                                <></>
                            )}

                            {currentTier?.length > 0 ? currentTier[0]?.name : ""}
                        </div>
                    </div>
                    <div className="row w-100 mx-auto">
                        <div className="col-6 br">Point to next tier</div>
                        <div className="col-6 text-end text-sm-start">
                            {nextTier?.length > 0 ? nextTier[0]?.point - userData?.tierPoint : ""}
                        </div>
                    </div>
                    <div className="row w-100 mx-auto pt-5">
                        <h4>
                            <span className="txt-green">G</span>
                            ain Points
                        </h4>
                        <div className="col-6 d-flex align-items-center br">
                            <div
                                className={`status me-2 ${
                                    gainPointsData.verification === false ? "deactive" : "active"
                                }`}
                            ></div>
                            KYC/AML completion
                        </div>
                        <div className="col-6 text-end text-sm-start">
                            {taskSettingData.verification}
                        </div>
                    </div>

                    <div className="row mx-0">
                        <div className="col-6 d-flex align-items-center br">
                            <div
                                className={`status me-2 ${
                                    gainPointsData.wallet === 0 ? "deactive" : "active"
                                }`}
                            ></div>
                            Wallet balance
                        </div>
                        <div className="col-6 text-end text-sm-start">500</div>
                    </div>

                    <div className="row mx-0">
                        <div className="col-6 d-flex align-items-center br">
                            <div
                                className={`status me-2 ${
                                    gainPointsData.auctions === null ? "deactive" : "active"
                                }`}
                            ></div>
                            Auction participation
                        </div>
                        <div className="col-6 text-end text-sm-start">
                            {taskSettingData.auction}
                        </div>
                    </div>
                </div>
            </>
        )
}
