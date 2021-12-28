import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const GeoDataRow = ({datum, index}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <DataRow>
                <div className='country'>
                    <Main>
                        <p style={{fontSize: 16, fontWeight: '700'}}>{datum.country}</p>
                    </Main>
                </div>
                <div className='note'>
                    <Main>
                        <p>Not allowed because ...</p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p className='text-white' style={{fontSize: 16, fontWeight: '700'}}>{datum.country}</p>
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
                            <p style={{color: 'dimgrey'}}>Note</p>
                        </div>
                        <div className='right'>
                            <p>Not allowed because ...</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
        </>
    );
};

export default GeoDataRow;

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

    &>div.country {width: ${width.country}; padding-left: 16px;}
    &>div.note {width: ${width.note};}

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
        width: 60%;
    }
    &>div.right {
        p {
            text-align: right;            
        }
    }
`;