import { gql } from "@apollo/client"

export const GET_USER = gql`
    query getUser {
        getUser{
            id
            regDate
            updateDate
            deleted
            email
            name
            country
            phone
            birthday
            lastLoginDate
            role
            tierLevel
            tierPoint
            provider
            providerId
            notifySetting
            avatar{
                id
                regDate
                updateDate
                deleted
                purchased
                selected
                prefix
                name
            }
            security{
                id
                regDate
                updateDate
                deleted
                authType
                tfaEnabled
            }
            verify{
                id
                regDate
                updateDate
                deleted
                emailVerified
                phoneVerified
                kycVerified
                amlVerified
                kybVerified
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
