import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TierComponent from './Tier_Component';
import { device } from '../../../../utilities/device';
import { get_User_Tiers } from '../../../../redux/actions/userTierAction';

const UserTiersPanel = () => {
    const dispatch = useDispatch();
    const tiers = useSelector(state => state.userTiers);

    useEffect(() => {
        dispatch(get_User_Tiers());
    }, [dispatch]);
    return (
        <>
            <TableHead>
                <div className='name'>TIER NAME</div>
                <div className='threshold'>THRESHOLD</div>
            </TableHead>
            <TableBody className='custom_scrollbar'>
                {_.map(tiers, (tier, index) => {
                    return <TierComponent key={index} tier={tier} />
                })}
            </TableBody>
        </>
    );
};

export default UserTiersPanel;

const TableHead = styled.div`
    height: 40px;
    border: 1px solid #464646;
    background-color: #464646;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    &>div {
        padding: 8px 2px;
    }
    &>div.name {width: 50%; padding-left: 16px;}
    &>div.threshold {width: 50%;}
    @media screen and (max-width: ${device['phone']}){
        &>div.threshold {width: 40%;}
    }
`;

const TableBody = styled.div`
    overflow: auto;
    max-height: 70vh;
    @media screen and (max-width: ${device['phone']}){
        max-height: unset;
    }
`;