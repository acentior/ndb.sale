import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import Switch from "react-switch"
import { GET_NOTICATION_TYPES } from "../../apollo/graghqls/querys/Notification"
import { USER_NOTIFICATION_SETTING } from "../../apollo/graghqls/mutations/Notification"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"

import { COLOR_LOAD, COLOR_OFF, COLOR_ON } from "../../utilities/staticData"
import CustomSpinner from "../common/custom-spinner"

export default function NotificationSetting() {
    //Webservice
    const { data: user_data, refetch } = useQuery(GET_USER)
    const { data: notificationTypes } = useQuery(GET_NOTICATION_TYPES, {
        fetchPolicy: "network-only",
        onCompleted: () => setLoadingSection(false),
    })
    const [changeNotifySetting] = useMutation(USER_NOTIFICATION_SETTING, {
        onCompleted: (data) => {
            refetch()
        },
    })

    // Containers
    const [loadingSection, setLoadingSection] = useState(true)
    const setting = user_data?.getUser.notifySetting
    const [tempSetting, setTempSetting] = useState([])
    const notificationTypeList = notificationTypes?.getNotificationTypes

    // Methods
    const setChecked = (i) => {
        const cList = tempSetting.slice()
        cList[i].status = !cList[i].status
        cList[i].loading = true
        setTempSetting(cList)

        changeNotifySetting({
            onCompleted: () => {
                cList[i].status = !cList[i].status
                cList[i].loading = false
                setTempSetting(cList)
            },
            variables: {
                nType: Number(cList[i].index),
                status: cList[i].status,
            },
        })
    }
    const createBinaryString = (nMask) => {
        for (
            var nFlag = 0, nShifted = nMask, sMask = "";
            nFlag < 32;
            nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1
        );
        sMask = sMask.replace(/\B(?=(.{8})+(?!.))/g, " ")
        return sMask
    }
    useEffect(() => {
        setTempSetting(
            notificationTypeList
                ? notificationTypeList.map((n) => {
                      const settingBinaryString = createBinaryString(setting)
                          .slice(35 - notificationTypeList?.length, 35)
                          .split("")
                          .reverse()
                          .join("")
                      return {
                          index: n.index,
                          type: n.type,
                          status: Number(settingBinaryString[n.index]) !== 0,
                          loading: false,
                      }
                  })
                : []
        )
    }, [setting, notificationTypeList])

    // Render
    if (loadingSection)
        return (
            <div className="d-flex justify-content-center my-5">
                <CustomSpinner />
            </div>
        )
    else
        return (
            <>
                {notificationTypeList &&
                    notificationTypeList.map(({ type }, index) => (
                        <div className="notification-item" key={index}>
                            <p>{type}</p>
                            <Switch
                                onColor={tempSetting[index]?.loading ? COLOR_LOAD : COLOR_ON}
                                offColor={tempSetting[index]?.loading ? COLOR_LOAD : COLOR_OFF}
                                height={3}
                                width={35}
                                handleDiameter={12}
                                onHandleColor={tempSetting[index]?.loading ? COLOR_LOAD : COLOR_ON}
                                offHandleColor={
                                    tempSetting[index]?.loading ? COLOR_LOAD : COLOR_OFF
                                }
                                onChange={() => setChecked(index)}
                                checked={tempSetting[index]?.status ? true : false}
                            />
                        </div>
                    ))}
            </>
        )
}
