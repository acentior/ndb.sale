import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const BidDataRow = ({datum}) => {
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
                <div className='bidId'>
                    <Main>
                        <p>1032</p>
                        <p style={{color: 'dimgrey'}}>Round 3</p>
                    </Main>
                </div>
                <div className='time'>
                    <Main>
                        <p>10:20</p>
                        <p style={{color: 'dimgrey'}}>2022/01/08</p>
                    </Main>
                </div>
                <div className='amount'>
                    <Main>
                        <p>300 ETH</p>
                        <p style={{color: 'dimgrey'}}>300 T</p>
                    </Main>
                </div>
                <div className='total'>
                    <Main>
                        <p>30 000 $</p>
                        <p style={{color: 'dimgrey'}}>100 / T</p>
                    </Main>
                </div>
                <div className='bid_status'>
                    <Main>
                        <div className='status_desktop'>
                            {datum.status === 'active' && <p style={{color: '#23c865'}}>Active</p>}
                            {datum.status === 'pending' && <p style={{color: 'dimgrey'}}>Pending</p>}
                        </div>                        
                        <div className='status_laptop-md'>
                            {datum.status === 'active' && <span style={{color: '#23c865'}}><Icon icon="akar-icons:circle-fill" /></span>}
                            {datum.status === 'pending' && <span style={{color: 'lightgrey'}}><Icon icon="akar-icons:circle-fill" /></span>}
                        </div>                        
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
                            <p className='text-white'>300 ETH</p>
                            <p style={{color: 'dimgrey'}}>300 T</p>
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 24}}>
                                {datum.status === 'active' && <span style={{color: '#23c865'}}><Icon icon="akar-icons:circle-fill" /></span>}
                                {datum.status === 'pending' && <span style={{color: 'lightgrey'}}><Icon icon="akar-icons:circle-fill" /></span>}
                            </p>                            
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
                            <p style={{color: 'dimgrey'}}>Bid ID</p>
                        </div>
                        <div className='right'>
                            <p>1032 / Round3</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Time</p>
                        </div>
                        <div className='right'>
                            <p>10:20 / 2022/01/08</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Total</p>
                        </div>
                        <div className='right'>
                            <p>30 000 $ / 100 / T</p>
                        </div>
                    </UnitRowForMobile>
                </ToggleForMobile>
            </DataRowForMobile>
        </>
    )
};

export default BidDataRow;

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
    &>div.bidId {width: ${width.bidId};}
    &>div.time {width: ${width.time};}
    &>div.amount {width: ${width.amount};}
    &>div.total {width: ${width.total};}
    &>div.bid_status {width: ${width.bid_status};}

    @media screen and (max-width: ${device['laptop-md']}){
        div.bid_status {
            width: 8%;
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
    div.status_laptop-md {
        display: none;
        span {
            font-size: 24px;
        }
    }    
    @media screen and (max-width: ${device['laptop-md']}){
        div.status_desktop {
            display: none;
        }
        div.status_laptop-md {
            display: block;
        }
    }
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