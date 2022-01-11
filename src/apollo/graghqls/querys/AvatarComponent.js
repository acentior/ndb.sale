import { gql } from '@apollo/client';

export const GET_AVATAR_COMPONENTS = gql`
    query {
        getAvatarComponents {
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