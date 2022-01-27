import { client } from './../../apollo/client';
import _ from 'lodash';
import * as Query from './../../apollo/graghqls/querys/KycSetting';
import *  as Mutation  from './../../apollo/graghqls/mutations/kycSetting';
import * as types from './../actionTypes'
import { showFailAlarm, showSuccessAlarm } from '../../components/admin/AlarmModal';

export const fetch_KYC_Settings = () => async dispatch => {
    try {
        const { data } = await client.query({
            query: Query.GET_KYC_SETTINGS
        });
        const dataList = _.mapKeys(data.getKYCSettings, 'kind');
        dispatch({
            type: types.FETCH_KYC_SETTINGS,
            payload: dataList
        });
    } catch(err) {
        console.log(err);
    }
};

export const update_KYC_Setting = updateData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.UPDATE_KYC_SETTING,
            variables: { ...updateData }
        });
        if(data.updateKYCSetting) {
            showSuccessAlarm('Setting updated successfully');
            dispatch({
                type: types.UPDATE_KYC_SETTING,
                payload: updateData
            });
        }
        return null;
    } catch(err) {
        console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong!');
    }
};