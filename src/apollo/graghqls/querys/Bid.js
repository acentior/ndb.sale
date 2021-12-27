import { gql } from "@apollo/client"

export const GET_BID = gql`
    query getBidListByRound($round: Int!) {
        getBidListByRound(round: $round) {
            userId
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
