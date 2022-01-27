import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import FiatDataRow from './FiatDataRow';
import { width } from './columnWidth';

const FiatTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='name'>Name</div>
                <div className='paymentId'>Payment ID</div>
                <div className='amount'>Amount</div>
                <div className='fiat_status'>Status</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Fiats Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <FiatDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    )
};

export default FiatTable;

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
    &>div.paymentId {width: ${width.paymentId};}
    &>div.amount {width: ${width.amount};}
    &>div.fiat_status {width: ${width.fiat_status};}

    @media screen and (max-width: ${device['laptop-md']}){
        div.fiat_status {
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