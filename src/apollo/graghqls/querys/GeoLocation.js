import { gql } from '@apollo/client';

export const GET_DISALLOWED = gql`
    query {
        getDisallowed {
            id
            country
            countryCode
            isAllowed
        }
    }
`;