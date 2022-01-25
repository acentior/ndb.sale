import { showFailAlarm, showSuccessAlarm } from '../../components/admin/AlarmModal';
import { client } from './../../apollo/client';
import _ from 'lodash';
import * as Mutation from './../../apollo/graghqls/mutations/GeoLocation';
import * as Query from './../../apollo/graghqls/querys/GeoLocation';
import * as types from './../actionTypes';

export const add_Disallowed_Country = createData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.ADD_DISALLOWED,
            variables: { ...createData }
        })
        if(data.addDisallowed) {
            showSuccessAlarm('Geo Location created successfully');
        }
    } catch(err) {
        // console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong');
    }
};

export const get_Disallowed_Countries = () => async dispatch => {
    try {
        const { data } = await client.query({
            query: Query.GET_DISALLOWED
        });
        if(data.getDisallowed) {
            const dataList = _.mapKeys(data.getDisallowed, 'id')
            dispatch({
                type: types.FETCH_DATA,
                payload: dataList
            });
        }
    } catch(err) {
        // console.log(err.message);
    }
};