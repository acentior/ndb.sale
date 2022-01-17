import _ from 'lodash';
import * as Mutation from './../../apollo/graghqls/mutations/userTier';
import * as Query from './../../apollo/graghqls/querys/UserTier';
import { client } from '../../apollo/client';
import { showFailAlarm, showSuccessAlarm } from '../../components/admin/AlarmModal';
import { GET_USER_TIERS } from '../actionTypes';

export const create_New_UserTier = createData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.CREATE_USER_TIER,
            variables: { ...createData }
        });
        if(data.addNewUserTier) {
            showSuccessAlarm('User Tier created successfully');
        }
    } catch(err) {
        // console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong. Try again!');
    }
};

export const get_User_Tiers = () => async dispatch => {
    try {
        const { data } = await client.query({
            query: Query.GET_USER_TIERS
        });
        const dataList = _.mapKeys(data.getUserTiers, 'level');
        dispatch({
            type: GET_USER_TIERS,
            payload: dataList
        })
    } catch(err) {
        showFailAlarm('Getting User Tiers failed');
    }
};