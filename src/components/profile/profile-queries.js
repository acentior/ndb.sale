import { gql } from "@apollo/client"

export const GET_USER_TIER_TASK = gql`
    {
        getUser
            direct
            staking {
                expiredTime
                ratio
            }
        }
    }
`

export const GET_USER_TIERS = gql`
    {
        getUserTiers {
            lev
