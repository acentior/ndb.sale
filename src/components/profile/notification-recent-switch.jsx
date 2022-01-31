import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_NOTIFICATIONS } from "../../apollo/graghqls/querys/Notification"
import { SET_NOTIFICATION_READ_FLAG } from "../../apollo/graghqls/mutations/Notification"
import CustomSpinner from "../common/custom-spinner"

export default function NotificationRecent() {
    const [loadingSection, setLoadingSection] = useState(true)
    const [last, setLast] = useState(null)

    const [NTList, setNTList] = useState([])

    const { data: ntf_list, loading } = useQuery(GET_NOTIFICATIONS, {
        onCompleted: () => setLoadingSection(false),
        fetchPolicy: "network-only",
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
            let ids = [...NTList]
            let index = ids.findIndex(
                (el) => el.timeStamp === data.setNotificationReadFlag.timeStamp
            )
            ids[index] = { ...ids[index], pending: false, read: true }
            setNTList(ids)
        },
    })

    const setRead = (item) => {
        if (item.read) return
        let ids = [...NTList]
        let index = ids.findIndex((el) => el.timeStamp === item.timeStamp)
        ids[index] = { ...ids[index], pending: true }
        setNTList(ids)
        console.log(item)
        setNotificationReadFlag({
            variables: {
                id: item.id,
            },
        })
    }
    if (loadingSection)
        return (
            <div className="d-flex justify-content-center mt-5">
                <CustomSpinner />
            </div>
                                className="recent-item"
                                key={idx}
                                tabIndex={0}
                            </div>
                        ))
                    ) : (
                        <div className="text-light fw-500 text-center text-uppercase py-3">
                            no notification yet
                        </div>
                    )}
                </div>
                {/* {NTList.length && (
                    <div className="w-100 d-flex flex-column align-items-center justify-content-center py-2">
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
                )} */}
            </>
        )
}
