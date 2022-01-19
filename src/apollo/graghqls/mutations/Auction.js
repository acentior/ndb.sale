import { gql } from '@apollo/client';

export const CREATE_AUCTION = gql`
    mutation CreateAuction(
        $round: Int!
        $startedAt: String!
        $duration: Float!
        $totalToken: Float!
        $minPrice: Float!
        $avatar: [AvatarSetInput]
        $token: Float
    ) {
        createAuction(
            round: $round
            startedAt: $startedAt
            duration: $duration
            totalToken: $totalToken
                minPrice: $minPrice
            avatar: $avatar
            token: $token
        ) {
            id
            round
        }
    }
`;