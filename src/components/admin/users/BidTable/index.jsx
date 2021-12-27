import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import BidDataRow from './BidDataRow';
import { width } from './columnWidth';

const BidTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='name'>Name</div>
                <div className='bidId'>Bid ID</div>
                <div className='time'>Time</div>
                <div className='amount'>Amount</div>
                <div className='total'>Total</div>
                <div className="bid_status">Status</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Bids Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <BidDataRow key={index} datum={datum} />
                })}
            </TableBody>
        </>
    )
};

export default BidTable;

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
    &>div.name {width: ${width.name}; padding-left: 16px;}
    &>div.bidId {width: ${width.bidId};}
    &>div.time {width: ${width.time};}
    &>div.amount {width: ${width.amount};}
    &>div.total {width: ${width.total};}
    &>div.bid_status {width: ${width.bid_status};}

    @media screen and (max-width: ${device['laptop-md']}){
        div.bid_status {
            width: 8%;
        }
    }

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