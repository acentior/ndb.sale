import { client } from './../../apollo/client';
import * as Query from './../../apollo/graghqls/querys/Tasks';
import * as Mutation from './../../apollo/graghqls/mutations/Tasks';
import * as types from './../actionTypes'
import { showFailAlarm, showSuccessAlarm } from '../../components/admin/AlarmModal';

export const fetch_Task_Setting = () => async dispatch => {
    try {
        const { data } = await client.query({
            query: Query.GET_TASK_SETTINGS
        });
        if(data.getTaskSetting) {
            dispatch({
                type: types.FETCH_TASK_SETTING,
                payload: data.getTaskSetting
            });
        }
    } catch(err) {
        console.log(err.message);
    }
};

export const update_Task_Setting = updateData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.UPDATE_TASK_SETTING,
            variables: { setting: { ...updateData } }
        })
        if(data.updateTaskSetting) {
            showSuccessAlarm('Task Setting updated successfully');
            dispatch({
                type: types.FETCH_TASK_SETTING,
                payload: data.updateTaskSetting
            });
        }
    } catch(err) {
        console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong');
    }
};