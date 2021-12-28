import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import RoundDataRow from './RoundDataRow';
import { width } from './columnWidth';

const RoundsTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='round'>Round</div>
                <div className='time'>Time</div>
                <div className='amount'>Amount</div>
                <div className='price'>Price</div>
                <div className='per_token'>Per Token</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Rounds Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <RoundDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    )
};

export default RoundsTable;

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
    &>div.round {width: ${width.round}; padding-left: 16px;}
    &>div.time {width: ${width.time};}
    &>div.amount {width: ${width.amount};}
    &>div.price {width: ${width.price};}
    &>div.per_token {width: ${width.per_token};}

    @media screen and (max-width: ${device['phone']}){
        display: none;
    }    
`;

const TableHeadForMobile = styled.div`
    height: 40px;
    border: 1px solid #464646;
    background-color: #464646;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    &>div.name {padding-left: 16px;}
    display: none;
    @media screen and (max-width: ${device['phone']}){
        display: flex;
    }
`;

const TableBody = styled.div`
    border-left: 1px solid #464646;
    border-right: 1px solid #464646;
`;