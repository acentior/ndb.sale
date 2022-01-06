import { gql } from "@apollo/client";

export const CREATE_NEW_COMPONENT = gql`
    mutation CreateNewComponent(
        $groupId: String!
        $tierLevel: Int!
        $price: Float!
        $limited: Int!
        $svg: String!
        $width: Int!
        $top: Int!
        $left: Int!
    ) {
        createNewComponent(
            groupId: $groupId
            tierLevel: $tierLevel
            price: $price
            limited: $limited
            svg: $svg
            width: $width
            top: $top
            left: $left
        ) {
            groupId
            compId
            tierLevel
            price
            limited
            svg
            width
            top
            left
        } 
    }
`;