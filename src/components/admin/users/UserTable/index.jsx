import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import UserDataRow from './UserDataRow';
import { width } from './columnWidth';

const UserTable = ({data}) => {
    return (
        <>
            <TableHead>
                <div className='name'>Name</div>
                <div className='contact'>Contact</div>
                <div className='password'>Password</div>
                <div className='country'>Country</div>
                <div className='privilege'>Privilege</div>
                <div id="action">Action</div>
                <div id="brief"></div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Users Data</div>
            </TableHeadForMobile>
            <TableBody>
                {data.map((datum, index) => {
                    return <UserDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    );
};

export default UserTable;

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
    &>div.contact {width: ${width.contact};}
    &>div.password {width: ${width.password};}
    &>div.country {width: ${width.country};}
    &>div.privilege {width: ${width.privilege};}
    &>div#action {width: ${width.action}; padding-left: 25px;}
    &>div#brief {width: ${width.brief};}

    &>div#brief {
        display: none;
    }
    @media screen and (max-width: ${device['laptop-md']}){
        &>div.privilege {width: 13%;}
        &>div#action {
            display: none;
        }
        &>div#brief {
            display: block;
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


