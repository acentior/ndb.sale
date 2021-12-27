import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const WalletDataRow = ({datum}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <DataRow>
                <div className='name'>
                    <Main>
                        <p style={{color: '#ffffff', fontWeight: '700'}}>{datum.name}</p>
                        <p style={{fontSize: 14, color: 'dimgrey'}}>{datum.avatar}</p>
                    </Main>
                </div>
                <div className='currency1'>
                    <Main>
                        <p>1032</p>
                        <p style={{color: 'dimgrey'}}>NDB</p>
                    </Main>
                </div>
                <div className='currency2'>
                    <Main>
                        <p>1200</p>
                        <p style={{color: 'dimgrey'}}>BIT</p>
                    </Main>
                </div>
                <div className='currency3'>
                    <Main>
                        <p>200</p>
                        <p style={{color: 'dimgrey'}}>ETH</p>
                    </Main>
                </div>
                <div className='currency4'>
                    <Main>
                        <p>30 000</p>
                        <p style={{color: 'dimgrey'}}>USD</p>
                    </Main>
                </div>
                <div className='currency5'>
                    <Main>
                        <p>30 000</p>
                        <p style={{color: 'dimgrey'}}>DAI</p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                    <UnitRowForMobile>
                        <div className='left'>
                            <p className='text-white' style={{fontSize: 16, fontWeight: '700'}}>{datum.name}</p>
                            <p style={{color: 'dimgrey'}}>{datum.avatar}</p>
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 16}}>
                                {show? <span><Icon icon="ant-design:caret-up-filled" /></span>: <span><Icon icon="ant-design:caret-down-filled" /></span>}
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <ToggleForMobile show={show}>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Currency 1</p>
                        </div>
                        <div className='right'>
                            <p>1032 NDB</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Currency 2</p>
                        </div>
                        <div className='right'>
                            <p>1200 BIT</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Currency 3</p>
                        </div>
                        <div className='right'>
                            <p>200 ETH</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Currency 4</p>
                        </div>
                        <div className='right'>
                            <p>30 000 USD</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Currency 5</p>
                        </div>
                        <div className='right'>
                            <p>30 000 DAI</p>
                        </div>
                    </UnitRowForMobile>
                </ToggleForMobile>
            </DataRowForMobile>
        </>
    );
};

export default WalletDataRow;

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
    &>div.currency1 {width: ${width.currency1};}
    &>div.currency2 {width: ${width.currency2};}
    &>div.currency3 {width: ${width.currency3};}
    &>div.currency4 {width: ${width.currency4};}
    &>div.currency5 {width: ${width.currency5};}

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

const ToggleForMobile = styled.div`
    display: ${props => {
        return props.show? 'block': 'none';
    }};
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