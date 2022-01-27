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

export const MAKE_ALLOW = gql`
    mutation MakeAllow(
        $locationId: Int!
    ) {
        makeAllow(
            locationId: $locationId
        )
    }
`;