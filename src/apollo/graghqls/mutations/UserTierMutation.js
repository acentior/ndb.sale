import { gql } from "@apollo/client";

export const CREATE_USER_TIER = gql`
    mutation AddNewUserTier(
        $level: Int!
        $name: String!
        $point: Float!
        $svg: String!
    ) {
        addNewUserTier(
            level: $level
            name: $name
            point: $point
            svg: $svg
        ) {
            level
            name
            point
            svg
        }
    }
`;

export const UPDATE_USER_TIER = gql`
    mutation UpdateUserTier(
        $level: Int!
        $name: String
        $point: Float
        $svg: String!
    ) {
        updateUserTier(
            level: $level
            name: $name
            point: $point
            svg: $svg
        ) {
            level
            name
            point
            svg
        }
    }
`;

export const DELETE_USER_TIER = gql`
    mutation DeleteUserTier(
        $level: Int!
    ) {
        deleteUserTier(
            level: $level
        ) 
    }
`;