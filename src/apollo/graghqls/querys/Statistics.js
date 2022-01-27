import { gql } from "@apollo/client"

export const GET_ROUND_PERFORMANCE2 = gql`
    query getRoundPerform2 {
        getRoundPerform2 {
            roundNumber
            min
            max
            std
        }
    }
`
export const GET_ROUND_CHANCE = gql`
    query getRoundChance {
        getRoundChance {
            roundNumber
            winRate
            failedRate
        }
    }
`
