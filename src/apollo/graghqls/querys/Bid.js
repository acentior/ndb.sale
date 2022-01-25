import { gql } from "@apollo/client"

export const GET_BID = gql`
    query getBid($round: Int!) {
        getBid(roundId: $round) {
            userId
            tokenAmount
            tokenPrice
            totalPrice
        }
    }
`

export const GET_BIDLIST_BY_ROUND = gql`
    query getBidListByRound($round: Int!) {
        getBidListByRound(round: $round) {
            userId
            prefix
            name
            roundId
            tokenAmount
            totalPrice
            tokenPrice
            tempTokenAmount
            tempTokenPrice
            delta
            pendingIncrease
            holdings {
                key
                value {
                    crypto
                    usd
                }
            }
            payType
            cryptoType
            placedAt
            updatedAt
            status
        }
    }
`

export const GET_BID_LIST_BY_USER = gql`
    query GetBidListByUser {
        getBidListByUser {
            roundId
            tokenAmount
            placedAt
            status
        }
    }
`

export const GET_BID_LIST = gql`
    query GetBidList {
        getBidList {
            tokenAmount
            totalPrice
            placedAt
        }
    }
`
