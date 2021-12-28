import { gql } from "@apollo/client"

export const GET_USER = gql`
    query getUser {
        getUser {
            id
            name
            surname
            role
            birthDate
            email
            mobile
            country
            twoStep
            avatarPrefix
            avatarName
            tos
            notifySetting
            lastLogin
            avatar {
                groupId
                compId
            }
            avatarPurchased {
                key
                value
            }
            userExtWallet {
                key
                value
            }
            userSecurity {
                key
                value
            }
            userVerify {
                key
                value
            }
        }
    }
`

export const GET_ALL_UNREAD_NOTIFICATIONS = gql`
    query getUser {
        getUser {
            id
            name
            surname
            role
            birthDate
            email
            mobile
            country
            twoStep
            avatarPrefix
            avatarName
            tos
            notifySetting
            lastLogin
            avatar {
                groupId
                compId
            }
            avatarPurchased {
                key
                value
            }
            userExtWallet {
                key
                value
            }
            userSecurity {
                key
                value
            }
            userVerify {
                key
                value
            }
        }
    }
`
