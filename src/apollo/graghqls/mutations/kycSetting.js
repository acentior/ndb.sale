import { gql } from '@apollo/client';

export const UPDATE_KYC_SETTING = gql`
    mutation UpdateKYCSetting(
        $kind: String!
        $withdraw: Float!
        $deposit: Float!
        $bid: Float!
        $direct: Float!
    ) {
        updateKYCSetting(
            kind: $kind
            withdraw: $withdraw
            deposit: $deposit
            bid: $bid
            direct: $direct
        )
    }
`;