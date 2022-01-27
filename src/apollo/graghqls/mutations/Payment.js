import { gql } from "@apollo/client"

export const CREATE_CRYPTO_PAYMENT = gql`
    mutation CreateCryptoPayment($round: Int!, $amount: Float!) {
        createCryptoPayment(roundId: $round, amount: $amount) {
            addresses {
                key
                value
            }
            pricing {
                key
                value {
                    amount
                    currency
                }
            }
        }
    }
`
