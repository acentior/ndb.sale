import { gql } from "@apollo/client"

export const PLACE_BID = gql`
    mutation PlaceBid(
        $roundId: String!
        $tokenAmount: Float!
        $tokenPrice: Float!
        $payment: Int!
        $cryptoType: String
    ) {
        placeBid(
            roundId: $roundId
            tokenAmount: $tokenAmount
            tokenPrice: $tokenPrice
            payment: $payment
            cryptoType: $cryptoType
        ) {
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
