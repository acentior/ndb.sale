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

export const CREATE_NEW_AVATAR = gql`
    mutation CreateNewAvatar(
        $name: String!
        $surname: String!
        $shortName: String!
        $skillSet: [SkillSetInput]!
        $avatarSet: [AvatarSetInput]!
        $factsSet: [FactsInput]!
        $details: String
        $hairColor: String!
    ) {
        createNewAvatar(
            name: $name
            surname: $surname
            shortName: $shortName
            skillSet: $skillSet
            avatarSet: $avatarSet
            factsSet: $factsSet
            details: $details
            hairColor: $hairColor
        ) {
            id
            name
            surname
            shortName
            skillSet {
                skill
                skillRate
            }
            avatarSet {
                groupId
                compId
            }
            factsSet {
                topic
                detail
            }
            details
            hairColor
        }
    }
`;