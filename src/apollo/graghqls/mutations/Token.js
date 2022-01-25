import { gql } from '@apollo/client';

export const CREATE_TOKEN = gql`
    mutation CreateTokenAsset(
        $tokenName: String!
        $tokenSymbol: String!
        $network: String!
        $address: String!
        $symbol: String!
    ) {
        createTokenAsset(
            tokenName: $tokenName
            tokenSymbol: $tokenSymbol
            network: $network
            address: $address
            symbol: $symbol
        )
    }
`;

export const DELETE_TOKEN = gql`
    mutation DeleteTokenAsset(
        $id: Int!
    ) {
        deleteTokenAsset(
            id: $id
        )
    }
`;