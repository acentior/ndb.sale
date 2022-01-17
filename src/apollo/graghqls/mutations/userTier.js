import { gql } from "@apollo/client";

export const CREATE_USER_TIER = gql`
    mutation(
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