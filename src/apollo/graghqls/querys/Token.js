import { gql } from '@apollo/client';

export const GET_TOKENS = gql`
    query {
        getTokenAssets {
            id
            tokenName
            tokenSymbol
            network
            address
            symbol
        }
    }
`;