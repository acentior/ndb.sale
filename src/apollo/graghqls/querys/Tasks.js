import { gql } from '@apollo/client';

export const GET_TASK_SETTINGS = gql`
    query {
        getTaskSetting {
            id
            verification
            wallet {
                amount
                point
            }
            auction
            direct
            staking {
                expiredTime
                ratio
            }
        }
    }
`;