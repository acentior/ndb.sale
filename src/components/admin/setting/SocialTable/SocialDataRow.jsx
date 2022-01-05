import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const SocailDataRow = ({datum, index}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <DataRow>
                <div className='social'>
                    <Main>
                        <p style={{fontSize: 16, fontWeight: '700'}}>{datum.social}</p>
                    </Main>
                </div>
                <div className='key'>
                    <Main>
                        <p>API Key</p>
                    </Main>
                </div>
                <div className='secret'>
                    <Main>
                        <p>API Secret</p>
                    </Main>
                </div>
                <div className='edit'>
                    <Main>
                        <p><span><Icon icon="clarity:note-edit-line" /></span></p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p className='text-white' style={{fontSize: 16, fontWeight: '700'}}>{datum.social}</p>
                        </div>
                        <div className='right'>
                            <p><span className='edit'><Icon icon="clarity:note-edit-line" /></span></p>
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
                            <p style={{color: 'dimgrey'}}>Key</p>
                        </div>
                        <div className='right'>
                            <p>API Key</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Secret</p>
                        </div>
                        <div className='right'>
                            <p>API Secret</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
        </>
    );
};

export default SocailDataRow;

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

    &>div.social {width: ${width.social}; padding-left: 16px;}
    &>div.key {width: ${width.key};}
    &>div.secret {width: ${width.secret};}
    &>div.edit {
        width: ${width.edit};

        p span {
            color: #23c865;
            font-size: 22px;
        }
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
    min-height: 50px;
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
        width: 70%;
    }
    &>div.right {
        p {
            text-align: right;   
            span.edit {
                color: #23c865;
                font-size: 22px;
            }
        }
    }
`;