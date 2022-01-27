import { gql } from '@apollo/client';

export const CREATE_NEW_USER = gql`
    mutation CreateNewUser(
        $email: String!
        $country: String!
        $role: String!
        $avatarName: String!
        $shortName: String!
    ) {
        createNewUser(
            email: $email
            country: $country
            role: $role
            avatarName: $avatarName
            shortName: $shortName
        )
    }
`;