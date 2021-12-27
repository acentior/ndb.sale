import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';

const RoundDataRow = ({datum}) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <DataRow>
                <div className='round'>
                    <Main>
                        <p className='first'>{datum.round_id}</p>
                        <p className='second'>{datum.round_nr}</p>
                    </Main>
                </div>
                <div className='time'>
                    <Main>
                        <p className='first'>{datum.time}</p>
                        <p className='second'>{datum.start_date}</p>
                    </Main>
                </div>
                <div className='amount'>
                    <Main>
                        <p className='first'>{datum.amount}</p>
                        <p className='second'>{datum.percentage}</p>
                    </Main>
                </div>
                <div className='price'>
                    <Main>
                        <p className='first'>{datum.price}</p>
                        <p className='second'>{datum.reserve_price}</p>
                    </Main>
                </div>
                <div className='per_token'>
                    <Main>
                        <p>{datum.avg_price}</p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{fontSize: 16, fontWeight: 700, color: 'white'}}>{datum.round_id}</p>
                            <p style={{color: 'dimgrey'}}>Voltapancake</p>
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 16, fontWeight: 600}}>{datum.round_nr}</p>
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
                            <p>Time</p>
                        </div>
                        <div className='right'>
                            <p>{datum.time}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Amount</p>
                        </div>
                        <div className='right'>
                            <p>{datum.amount}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Total</p>
                        </div>
                        <div className='right'>
                            <p>30 000 $</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Per Token</p>
                        </div>
                        <div className='right'>
                            <p>{datum.avg_price}</p>
                        </div>
                    </UnitRowForMobile>
                </ToggleForMobile>
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
    &>div.amount {width: ${width.amount};}
    &>div.price {width: ${width.price};}
    &>div.per_token {width: ${width.per_token};}

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