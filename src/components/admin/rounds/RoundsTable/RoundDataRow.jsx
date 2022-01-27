import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const Status = {
    '0': 'pending',
    '1': 'countdown',
    '2': 'started',
    '3': 'ended',
};

const RoundDataRow = ({ datum }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <DataRow>
                <div className='round'>
                    <Main>
                        <p className='first'>Round {datum.round}</p>
                        <p className='second'>Id: {datum.id}</p>
                    </Main>
                </div>
                <div className='time'>
                    <Main>
                        <p>Start: {new Date(datum.startedAt).toISOString()}</p>
                        <p>End: {new Date(datum.endedAt).toISOString()}</p>
                    </Main>
                </div>
                <div className='token'>
                    <Main>
                        <p className='first'>Total: {datum.totalToken}</p>
                        <p className='second'>Avatar: {datum.token}</p>
                    </Main>
                </div>
                <div className='price'>
                    <Main>
                        <p className='first'>{datum.minPrice}</p>
                    </Main>
                </div>
                <div className='sold'>
                    <Main>
                        <p>{datum.sold}</p>
                    </Main>
                </div>
                <div className='stats'>
                    <Main>
                        <p className='second'>QTY: {datum.stats?.qty}</p>
                        <p className='second'>Win: {datum.stats?.win}</p>
                        <p className='second'>Fail: {datum.stats?.fail}</p>
                    </Main>
                </div>
                <div className='round_status'>
                    <Main>
                        <p className={`
                            ${Status[datum.status] === 'pending'? 'pending': ''}
                            ${Status[datum.status] === 'countdown'? 'countdown': ''}
                            ${Status[datum.status] === 'started'? 'started': ''}
                            ${Status[datum.status] === 'ended'? 'ended': ''}
                        `} style={{textTransform: 'uppercase'}}>
                            {Status[datum.status]}
                        </p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{fontSize: 16, fontWeight: 700, color: 'white'}}>Round {datum.round}</p>
                            <p className={`
                                ${Status[datum.status] === 'pending'? 'pending': ''}
                                ${Status[datum.status] === 'countdown'? 'countdown': ''}
                                ${Status[datum.status] === 'started'? 'started': ''}
                                ${Status[datum.status] === 'ended'? 'ended': ''}
                            `} style={{textTransform: 'uppercase'}}>
                                {Status[datum.status]}
                            </p>
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 16, fontWeight: 700, color: 'white'}}>Id: {datum.id}</p>
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 16}}>
                                <span><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} data-bs-toggle="collapse" data-bs-target={`#id${datum.id}`} onClick={() => setShow(!show)} /></span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id={`id${datum.id}`} className="collapse">
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Start Time</p>
                        </div>
                        <div className='right'>
                            <p>{new Date(datum.startedAt).toISOString()}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>End Time</p>
                        </div>
                        <div className='right'>
                            <p>{new Date(datum.endedAt).toISOString()}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Total Token</p>
                        </div>
                        <div className='right'>
                            <p>{datum.token}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Avatar Token</p>
                        </div>
                        <div className='right'>
                            <p>{datum.token}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Min Price</p>
                        </div>
                        <div className='right'>
                            <p>{datum.minPrice}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Sold</p>
                        </div>
                        <div className='right'>
                            <p>{datum.sold}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Status</p>
                        </div>
                        <div className='right'>
                            <p>QTY: {datum.stats?.qty}</p>
                            <p>Win: {datum.stats?.win}</p>
                            <p>Fail: {datum.stats?.fail}</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
        </>
    );
};

export default RoundDataRow;

const DataRow = styled.div`
    min-height: 80px;
    padding: 8px 2px;
    border-bottom: 1px solid #464646;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    svg {
        cursor: pointer;
    }


    &>div.round {width: ${width.round}; padding-left: 16px;}
    &>div.time {width: ${width.time};}
    &>div.token {width: ${width.token};}
    &>div.price {width: ${width.price};}
    &>div.sold {width: ${width.sold};}
    &>div.stats {width: ${width.stats};}
    &>div.round_status {width: ${width.round_status};}

    p {
        &.pending {color: #f32d2d}
        &.countdown {color: white}
        &.started {color: #23c865}
        &.ended {color: dimgray}
    }

    @media screen and (max-width: ${device['phone']}){
        display: none;
    }
`;

const Main = styled.div`
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

// For Mobile
const DataRowForMobile = styled.div`
    min-height: 80px;
    border-bottom: 1px solid #464646;
    padding: 16px;
    display: none;    
    svg {
        cursor: pointer;
    }
    @media screen and (max-width: ${device['phone']}){
        display: flex;
        flex-direction: column;
    } 
`;

const UnitRowForMobile = styled.div`
    display: flex;
    justify-content: space-between;
    &>div.left {
        width: 40%;
    }
    &>div.right {
        p {
            text-align: right;
        }
    }
    p {
        &.pending {color: #f32d2d!important}
        &.countdown {color: white!important}
        &.started {color: #23c865!important}
        &.ended {color: dimgray!important}
    }
`;