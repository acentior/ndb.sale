import { gql } from "@apollo/client"

export const USER_NOTIFICATION_SETTING = gql`
    mutation changeNotifySetting(
        $nType: Int!
        $status: Boolean!
    ) {
        changeNotifySetting(
            nType: $nType
            status: $status
        )
    }
`

export const SET_NOTIFICATION_READ_FLAG = gql`
    mutation setNotificationReadFlag(
        $id: Int!
    ) {
        setNotificationReadFlag(
            id: $id
        ){
            userId
            timeStamp
            nType
            read
            title
            msg
        }
    }
`