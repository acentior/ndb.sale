import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import SocialDataRow from './SocialDataRow';
import { width } from './columnWidth';

const SocialTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='social'>Social</div>
                <div className='key'>Key</div>
                <div className='secret'>Secret</div>
                <div className='edit'> </div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Social Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <SocialDataRow key={index} datum={datum} />
                })}
            </TableBody>
        </>
    )
};

export default SocialTable;

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
    &>div.social {width: ${width.social}; padding-left: 16px;}
    &>div.key {width: ${width.key};}
    &>div.secret {width: ${width.secret};}
    &>div.edit {width: ${width.edit};}

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