import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TierComponent from './Tier_Component';
import { device } from '../../../../utilities/device';
import { get_User_Tiers } from '../../../../redux/actions/userTierAction';
import Loading from './../../shared/Loading';

const UserTiersPanel = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const tiers = useSelector(state => state.userTiers);

    useEffect(() => {
        (async function() {
            setLoading(true);
            await dispatch(get_User_Tiers());
            setLoading(false);
        })();
    }, [dispatch]);

    return (
        <>
            <TableHead>
                <div className='name'>TIER NAME</div>
                <div className='threshold'>THRESHOLD</div>
                <div className='edit'></div>
            </TableHead>
            {loading?
                <Loading />:
                (
                    <TableBody className='custom_scrollbar'>
                        {_.map(tiers, tier => {
                            return <TierComponent key={tier.level} tier={tier} />
                        })}
                    </TableBody>
                )
            }            
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
    &>div.threshold {width: 40%;}
    &>div.edit {width: 10%}
    @media screen and (max-width: ${device['phone']}){
        &>div.edit {width: 0;}
    }
`;

const TableBody = styled.div`
    overflow: auto;
    max-height: 70vh;
    @media screen and (max-width: ${device['phone']}){
        max-height: unset;
    }
`;