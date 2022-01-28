import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';
import KYCAMLComponent from './KYC_AML_Component';
import WalletBalance from './WalletBalance';
import AuctionRound from './AuctionRound';
import DirectPurchase from './DirectPurchase';
import NDBTokenStaking from './NDBTokenStaking';
import Loading from './../../shared/Loading';
import { fetch_Task_Setting } from './../../../../redux/actions/tasksAction';

const UserTiersPanel = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function() {
            setLoading(true);
            await dispatch(fetch_Task_Setting());
            setLoading(false);
        })();
    }, [dispatch]);

    return loading?
    <Loading />:
    (
        <>
            <TableHead>
                <div className='task'>TASK</div>
                <div className='threshold'>THRESHOLD</div>
                <div className='points'>POINTS</div>
                <div className='edit'></div>
            </TableHead>
            <div className='task_table custom_scrollbar'>
                <KYCAMLComponent />
                <WalletBalance />
                <AuctionRound />
                <DirectPurchase />
                <NDBTokenStaking />
            </div>
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
    &>div.task {width: ${width.task}; padding-left: 16px;}
    &>div.threshold {width: ${width.threshold};}
    &>div.points {width: ${width.points};}
    &>div.edit {width: ${width.edit};}
    @media screen and (max-width: ${device['phone']}){
        &>div.threshold, &>div.points {display: none;}
    }
`;
