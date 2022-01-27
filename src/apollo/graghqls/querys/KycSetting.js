import { gql } from '@apollo/client';

export const GET_KYC_SETTINGS = gql`
    query {
        getKYCSettings {
            kind
            withdraw
            deposit
            bid
            direct
        }
    }
`;