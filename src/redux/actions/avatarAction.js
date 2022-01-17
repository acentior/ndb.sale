import _ from 'lodash';
import * as Query from '../../apollo/graghqls/querys/AvatarComponent';
import * as Mutation from './../../apollo/graghqls/mutations/AvatarComponent';
import { CREATE_AVATAR_COMPONENT, FETCH_AVATAR_COMPONENTS } from "../actionTypes";
import { client } from './../../apollo/client';
import { showFailAlarm, showSuccessAlarm } from '../../components/admin/AlarmModal';

export const create_Avatar_Component = createData => async dispatch => {
    try {
        const { data }  = await client.mutate({
            mutation: Mutation.CREATE_NEW_COMPONENT,
            variables: { ...createData }
        });
        showSuccessAlarm('Avatar Component created successfully');
        dispatch({
            type: CREATE_AVATAR_COMPONENT,
            payload: data.createNewComponent
        });
    } catch(err) {
        console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong!');
    }
};

export const fetch_Avatar_Components = () => async dispatch => {
    try {
        const { data } = await client.query({
            query: Query.GET_AVATAR_COMPONENTS
        });
        const compData = data.getAvatarComponents;
        const hairStyles = _.mapKeys(_.filter(compData, {groupId: 'hairStyle'}), 'compId');
        const facialStyles = _.mapKeys(_.filter(compData, {groupId: 'facialStyle'}), 'compId');
        const expressions = _.mapKeys(_.filter(compData, {groupId: 'expression'}), 'compId');
        const hats = _.mapKeys(_.filter(compData, {groupId: 'hat'}), 'compId');
        const others = _.mapKeys(_.filter(compData, {groupId: 'other'}), 'compId');
        dispatch({
            type: FETCH_AVATAR_COMPONENTS,
            payload: { hairStyles, facialStyles, expressions, hats, others }
        });
    } catch(err) {
        console.log(err.message);
    }
};

export const create_New_Avatar = createData => async dispatch => {
    try {
        const { data } = await client.mutate({
            mutation: Mutation.CREATE_NEW_AVATAR,
            variables: { ...createData }
        });
        showSuccessAlarm('Avatar created successfully');
        console.log(data);
    } catch(err) {
        console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong. Try again!');
    }
};