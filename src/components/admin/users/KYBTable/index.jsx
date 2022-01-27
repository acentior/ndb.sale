import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import KYBDataRow from './KYBDataRow';
import { width } from './columnWidth';

const kybData = [
    {name: 'Amy Matthews', country: 'USA', company_name: '_Company Name', registration: '123456789a', time: '10:43:57 CET', attachment: ['/sample'], status: 'complete'},
    {name: 'Amy Matthews', country: 'USA', company_name: '_Company Name', registration: '123456789a', time: '10:43:57 CET', attachment: ['/sample', '/sample1'], status: 'pending'},
    {name: 'Amy Matthews', country: 'USA', company_name: '_Company Name', registration: '123456789a', time: '10:43:57 CET', attachment: ['/sample1'], status: 'complete'},
    {name: 'Amy Matthews', country: 'USA', company_name: '_Company Name', registration: '123456789a', time: '10:43:57 CET', attachment: ['/sample'], status: 'complete'},
    {name: 'Amy Matthews', country: 'USA', company_name: '_Company Name', registration: '123456789a', time: '10:43:57 CET', attachment: ['/sample', '/sample1'], status: 'complete'},
];

const KYBTable = () => {
    return (
        <>
            <TableHead>
                <div className='name'>Name</div>
                <div className='country'>Country</div>
                <div className='company_name'>Company Name</div>
                <div className='registration'>Registration Number</div>
                <div className='time'>Time</div>
                <div className='attachment'>Attachment</div>
                <div className='kyb_status'>Status</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>KYB Data</div>
            </TableHeadForMobile>
            <TableBody>
                {kybData.map((datum, index) => {
                    return <KYBDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    )
};

export default KYBTable;

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
    &>div.country {width: ${width.country};}
    &>div.company_name {width: ${width.company_name};}
    &>div.registration {width: ${width.registration};}
    &>div.time {width: ${width.time};}
    &>div.attachment {width: ${width.attachment};}
    &>div.kyb_status {width: ${width.kyb_status};}

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