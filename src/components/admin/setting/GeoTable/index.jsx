import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import GoeDataRow from './GeoDataRow';
import { width } from './columnWidth';

const GeoTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='country'>Not allowed countries</div>
                <div className='note'>Note</div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>GEO Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <GoeDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    )
};

export default GeoTable;

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
    &>div.country {width: ${width.country}; padding-left: 16px;}
    &>div.note {width: ${width.note};}

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