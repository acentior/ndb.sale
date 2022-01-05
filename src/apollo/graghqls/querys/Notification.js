import { gql } from "@apollo/client"

export const GET_NOTICATION_TYPES = gql`
query {
    getNotificationTypes2 {
        nType
        tName
        broadcast
    }
}
`

export const GET_NOTIFICATIONS = gql`
query getNotifications (
    $stamp: Float
    $limit: Int!
) {
    getNotifications(
        stamp: $stamp
        limit: $limit
    ) {
        userId
        timeStamp
        nType
        read
        title
        msg
    }
}
`