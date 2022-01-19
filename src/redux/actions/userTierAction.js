import _ from 'lodash';
import * as Mutation from '../../apollo/graghqls/mutations/UserTier';
import * as Query from './../../apollo/graghqls/querys/UserTier';
import { client } from '../../apollo/client';
import { showFailAlarm, showSuccessAlarm } from '../../components/admin/AlarmModal';
import { GET_USER_TIERS, UPDATE_USER_TIER, DELETE_USER_TIER, CREATE_USER_TIER } from '../actionTypes';

export const create_New_UserTier = createData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.CREATE_USER_TIER,
            variables: { ...createData }
        });
        if(data.addNewUserTier) {
            showSuccessAlarm('User Tier created successfully');
        }
        dispatch({
            type: CREATE_USER_TIER,
            payload: data.addNewUserTier
        });
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

export const update_User_Tier = updateData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.UPDATE_USER_TIER,
            variables: { ...updateData }
        });

        showSuccessAlarm('User Tier updated successfully');
        dispatch({
            type: UPDATE_USER_TIER,
            payload: data.updateUserTier
        });
    } catch(err) {
        // console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong. Try again!');
    }
};

export const delete_User_Tier = level => async dispatch => {
    try {
        await client.mutate({
            mutation: Mutation.DELETE_USER_TIER,
            variables: { level }
        });

        showSuccessAlarm('User Tier deleted successfully');
        dispatch({
            type: DELETE_USER_TIER,
            payload: level
        });
    } catch(err) {
        // console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong. Try again!');
    }
};