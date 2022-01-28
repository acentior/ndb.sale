import { gql } from '@apollo/client';

export const UPDATE_TASK_SETTING = gql`
    mutation UpdateTaskSetting(
        $setting: TaskSettingInput!
    ) {
        updateTaskSetting(
            setting: $setting
        ) {
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