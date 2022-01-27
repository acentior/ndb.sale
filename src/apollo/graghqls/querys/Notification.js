import { gql } from "@apollo/client"

export const GET_NOTICATION_TYPES = gql`
    {
        getNotificationTypes {
            type
            index
        }
    }
`

export const GET_NOTIFICATIONS = gql`
    {
        getNotifications {
            id
            userId
            timeStamp
            nType
            read
            title
            msg
        }
    }
`

export const GET_ALL_UNREAD_NOTIFICATIONS = gql`
    {
        getAllUnReadNotifications {
            id
            userId
            timeStamp
            nType
            read
            title
            msg
        }
    }
`
