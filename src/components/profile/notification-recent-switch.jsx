import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_NOTIFICATIONS } from "../../apollo/graghqls/querys/Notification"
import { SET_NOTIFICATION_READ_FLAG } from "../../apollo/graghqls/mutations/Notification"
import CustomSpinner from "../common/custom-spinner"

const NOTIFICATION_PAGE_LIMIT = 8

export default function NotificationRecent() {
    const [last, setLast] = useState(null)

    const [NTList, setNTList] = useState([])

    const { data: ntf_list, loading } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            stamp: last?.timeStamp,
            limit: NOTIFICATION_PAGE_LIMIT,
        },
    })

    const tempList = ntf_list?.getNotifications

    useEffect(() => {
        if (!tempList) return
        setNTList((d) => [...d, ...tempList])
    }, [tempList])

    const loadMore = () => {
        if (tempList.length > 0) setLast(tempList ? NTList.slice(-1)[0] : null)
    }

    const [setNotificationReadFlag] = useMutation(SET_NOTIFICATION_READ_FLAG, {
        onCompleted: (data) => {
            console.log("Receive data", data.setNotificationReadFlag)
            let ids = [...NTList]
            let index = ids.findIndex(
                (el) => el.timeStamp === data.setNotificationReadFlag.timeStamp
            )
            ids[index] = { ...ids[index], pending: false, read: true }
            console.log("LIST", index, ids)
            setNTList(ids)
        },
        onError: (error) => {},
    })

    const setRead = (item) => {
        if (item.read) return
        let ids = [...NTList]
        let index = ids.findIndex((el) => el.timeStamp === item.timeStamp)
        ids[index] = { ...ids[index], pending: true }
        console.log("REEED", index)
        setNTList(ids)
        setNotificationReadFlag({
            variables: {
                stamp: item.timeStamp,
            },
        })
    }

    return (
        <>
            <div className="recent-notification-wrapper">
                {NTList &&
                    NTList.map((item, idx) => (
                        <div
                            className="recent-item"
                            key={idx}
                            tabIndex={0}
                            role="button"
                            onClick={() => setRead(item)}
                            onKeyDown={() => setRead(item)}
                        >
                            <div
                                className={`status ${
                                    item?.pending ? "pending" : item?.read ? "deactive" : "active"
                                }`}
                            ></div>
                            <p>{item?.msg}</p>
                        </div>
                    ))}
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center py-5">
                <button
                    className="btn-primary d-flex align-items-center justify-content-center py-2"
                    onClick={(e) => loadMore()}
                >
                    <div className={`${loading ? "opacity-1" : "opacity-0"}`}>
                        <CustomSpinner />
                    </div>
                    <div className={`${loading ? "ms-3" : "pe-4"}`}>Load More</div>
                </button>
            </div>
        </>
    )
}
