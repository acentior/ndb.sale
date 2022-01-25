import { gql } from '@apollo/client';

export const ADD_DISALLOWED = gql`
    mutation AddDisallowed(
        $country: String!
        $countryCode: String!
    ) {
        addDisallowed(
            country: $country
            countryCode: $countryCode
        ) {
            id
            country
            countryCode
            isAllowed
        }
    }
`;