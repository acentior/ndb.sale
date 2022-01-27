import { gql } from "@apollo/client"

export const GET_USER_TIER_TASK = gql`
    {
        getUserTierTask {
            userId
            verification
            wallet
            auctions
            direct
            staking {
                expiredTime
                amount
            }
        }
    }
`
export const GET_TASK_SETTING = gql`
    {
        getTaskSetting {
            id
            verification
            wallet {
                amount
                point
            }
            auction
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
            level
            name
            point
            svg
        }
    }
`
