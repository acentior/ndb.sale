import React from "react"
import { useQuery } from "@apollo/client"
import { Bronze } from "../../utilities/imgImport"
import { GET_TASK_SETTING, GET_USER_TIER_TASK } from "./profile-queries"
import { useState } from "react"
import CustomSpinner from "../common/custom-spinner"

export default function TierDetailsTab() {
    const [gainPointsData, setGainPointsData] = useState(null)
    const { data: gainPoints } = useQuery(GET_USER_TIER_TASK, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setGainPointsData(gainPoints.getUserTierTask)
        },
    })

    const [taskSettingData, setTaskSettingData] = useState(null)
    const { data: taskSetting } = useQuery(GET_TASK_SETTING, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setTaskSettingData(taskSetting.getTaskSetting)
        },
    })
    const loadingSection = !(gainPointsData && taskSettingData)
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
                            <img src={Bronze} alt="brozne" className="me-3" />
                            Bronze
                        </div>
                    </div>
                    <div className="row w-100 mx-auto">
                        <div className="col-6 br">Point to next tier</div>
                        <div className="col-6 text-end text-sm-start">500</div>
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
