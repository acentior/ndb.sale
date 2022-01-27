import { gql } from '@apollo/client';

export const GET_USER_TIERS = gql`
    query GetUserTiers{
        getUserTiers {
            level
            name
            point
            svg
        }
    }
`;