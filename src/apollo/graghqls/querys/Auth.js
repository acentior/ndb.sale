import { gql } from "@apollo/client"

export const GET_USER = gql`
    query getUser {
        getUser {
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
            avatar {
                id
                regDate
                updateDate
                deleted
                purchased
                hairColor
                selected
                prefix
                name
            }
            security {
                id
                regDate
                updateDate
                deleted
                authType
                tfaEnabled
            }
            verify {
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

export const GET_AVATAR_COMPONENT = gql`
    {
        getAvatarComponent(groupId: "expression", compId: 3) {
            groupId
            compId
            tierLevel
            price
            limited
            purchased
            svg
            width
            top
            left
        }
    }
`

export const GET_BALANCES = gql`
    {
        getBalances {
            tokenName
            tokenSymbol
            symbol
            free
            hold
        }
    }
`
