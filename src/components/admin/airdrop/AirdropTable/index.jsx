import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import AirdropDataRow from './AirdropDataRow';
import { width } from './columnWidth';

const AirdropTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='name'>Name</div>
                <div className='airdrop'>Airdrop</div>
                <div className='gain'>Gain</div>
                <div className='airdrop_status'>Status</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Airdrop Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <AirdropDataRow key={index} datum={datum} />
                })}
            </TableBody>
        </>
    )
};

export default AirdropTable;

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
    &>div.airdrop {width: ${width.airdrop};}
    &>div.gain {width: ${width.gain};}
    &>div.airdrop_status {width: ${width.airdrop_status};}

    @media screen and (max-width: ${device['laptop-md']}){
        div.airdrop_status {
            width: 10%;
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