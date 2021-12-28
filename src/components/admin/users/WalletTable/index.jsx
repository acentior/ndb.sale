import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import WalletDataRow from './WalletDataRow';
import { width } from './columnWidth';

const WalletTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='name'>Name</div>
                <div className='currency1'>Currency 1</div>
                <div className='currency2'>Currency 2</div>
                <div className='currency3'>Currency 3</div>
                <div className='currency4'>Currency 4</div>
                <div className="currency5">Currency 5</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Wallets Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <WalletDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    )
};

export default WalletTable;

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
    &>div.currency1 {width: ${width.currency1};}
    &>div.currency2 {width: ${width.currency2};}
    &>div.currency3 {width: ${width.currency3};}
    &>div.currency4 {width: ${width.currency4};}
    &>div.currency5 {width: ${width.currency5};}

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