import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import Switch from "react-switch"
import { GET_NOTICATION_TYPES } from "../../apollo/graghqls/querys/Notification"
import { USER_NOTIFICATION_SETTING } from "../../apollo/graghqls/mutations/Notification"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"

import { COLOR_LOAD, COLOR_OFF, COLOR_ON } from "../../utilities/staticData"

export default function NotificationSetting() {
    const { data: user_data, refetch } = useQuery(GET_USER)
    const setting = user_data?.getUser.notifySetting

    const { data: ntf_type_result } = useQuery(GET_NOTICATION_TYPES)

    const [changeNotifySetting] = useMutation(USER_NOTIFICATION_SETTING, {
        onCompleted: (data) => {
            resetLoading(data.changeNotifySetting)
            refetch()
        },
        onError: (error) => {},
    })

    const [tempSetting, setTempSetting] = useState([])

    const ntfTypeList = ntf_type_result?.getNotificationTypes2

    useEffect(() => {
        setTempSetting(
            ntfTypeList
                ? ntfTypeList.map((n) => {
                      return {
                          type: n.nType,
                          status: (setting & (1 << n.nType)) > 0, // calc from int
                          loading: false,
                      }
                  })
                : []
        )
    }, [setting, ntfTypeList])

    const setChecked = (i) => {
        const cList = tempSetting.slice()
        cList[i].status = !cList[i].status
        cList[i].loading = true
        setTempSetting(cList)
        changeNotifySetting({
            variables: {
                nType: cList[i].type,
                status: cList[i].status,
            },
        })
    }

    const resetLoading = (nType) => {
        const cList = tempSetting.slice()
        const idx = cList.findIndex((c) => c.type === nType)
        cList[idx].loading = false
        setTempSetting(cList)
    }

    return (
        <>
            {ntfTypeList &&
                ntfTypeList.map((ntf_type, i) => (
                    <div className="notification-item" key={i}>
                        <p>{ntf_type.tName}</p>
                        <Switch
                            onColor={tempSetting[i]?.loading ? COLOR_LOAD : COLOR_ON}
                            offColor={tempSetting[i]?.loading ? COLOR_LOAD : COLOR_OFF}
                            height={3}
                            width={35}
                            handleDiameter={12}
                            onHandleColor={tempSetting[i]?.loading ? COLOR_LOAD : COLOR_ON}
                            offHandleColor={tempSetting[i]?.loading ? COLOR_LOAD : COLOR_OFF}
                            onChange={() => setChecked(i)}
                            checked={tempSetting[i]?.status ? true : false}
                        />
                    </div>
                ))}
        </>
    )
}
