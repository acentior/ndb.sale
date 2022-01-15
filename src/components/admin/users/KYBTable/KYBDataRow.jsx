import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const KYBDataRow = ({datum, index}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <DataRow>
                <div className='name'>
                    <Main>
                        <p style={{color: '#ffffff', fontWeight: '700'}}>{datum.name}</p>
                    </Main>
                </div>
                <div className='country'>
                    <Main>
                        <p>{datum.country}</p>
                    </Main>
                </div>
                <div className='company_name'>
                    <Main>
                        <p>{datum.company_name}</p>
                    </Main>
                </div>
                <div className='registration'>
                    <Main>
                        <p>{datum.registration}</p>
                    </Main>
                </div>
                <div className='time'>
                    <Main>
                        <p>{datum.time}</p>
                    </Main>
                </div>
                <div className='attachment'>
                    <Main>
                        <div>
                            {datum.attachment.map((item, index) => {
                                return (
                                    <a href={item} target="_blank" key={index} rel="noreferrer">
                                        <span className='download'><Icon icon="bx:bx-download" /></span>
                                    </a>
                                );
                            })}
                        </div>
                    </Main>
                </div>
                <div className='kyb_status'>
                    <Main>
                        {datum.status === 'complete' && <p style={{color: '#23c865'}}>Complete</p>}
                        {datum.status === 'pending' && <p style={{color: 'dimgrey'}}>Pending</p>}
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p className='text-white' style={{fontSize: 16, fontWeight: '700'}}>{datum.name}</p>
                        </div>
                        <div className='right'>
                            <div style={{fontSize: 24}}>
                                {datum.status === 'complete' && <p style={{color: '#23c865'}}>Complete</p>}
                                {datum.status === 'pending' && <p style={{color: 'dimgrey'}}>Pending</p>}
                            </div>                            
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 16}}>
                                <span><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} data-bs-toggle="collapse" data-bs-target={`#id${index}`} onClick={() => setShow(!show)} /></span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id={`id${index}`} className='collapse'>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Country</p>
                        </div>
                        <div className='right'>
                            <p>{datum.country}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Company Name</p>
                        </div>
                        <div className='right'>
                            <p>{datum.company_name}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Registration Number</p>
                        </div>
                        <div className='right'>
                            <p>{datum.registration}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Time</p>
                        </div>
                        <div className='right'>
                            <p>{datum.time}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Attachment</p>
                        </div>
                        <div className='right'>
                            <div>
                                {datum.attachment.map((item, index) => {
                                    return (
                                        <a href={item} target="_blank" key={index} rel="noreferrer">
                                            <span className='download'><Icon icon="bx:bx-download" /></span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>            
        </>
    )
};

export default KYBDataRow;

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
    span.download {
        font-size: 22px;
        margin: 0 5%;
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
    min-height: 60px;
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
        width: 60%;
    }
    &>div.right {
        div {
            display: flex;
            a {
                margin: 0 5px;
            }
        }
        p {
            text-align: right;            
        }
    }
    span.download {
        font-size: 22px;
        margin: 0 5%;
    }
`;