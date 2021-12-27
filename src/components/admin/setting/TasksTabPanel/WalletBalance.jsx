import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import { Alert } from '@mui/material';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';
import NumberFormat from 'react-number-format';

const BalancesData = [
    {threshold: '50', points: 500},
    {threshold: '1k', points: 1000},
    {threshold: '50k', points: 1500},
    {threshold: '100k', points: 2000},
    {threshold: '300k', points: 3000},
    {threshold: '500k', points: 6000},
];

const WalletBalance = () => {
    const [show, setShow] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [balances, setBalances] = useState([]);
    const [showError, setShowError] = useState(false);

    // Balance Data Validation
    const error = useMemo(() => {
        if(!balances.length) return {item: 'noData', desc: 'One Balance is required at least'};
        for(let i = 0; i < balances.length; i++) {
            if(!balances[i].threshold) return {index: i, item: 'threshold', desc: 'Input is required'};
            if(!balances[i].points) return {index: i, item: 'points', desc: 'Input is required'};
        }
        return {};
    }, [balances]);

    const openEditModal = () => {
        setBalances(BalancesData);
        setModalIsOpen(true);
    };

    const handleSubmit = () => {
        if(error.item) {
            setShowError(true);
            return;
        }
        alert('Saved successfully');
        setModalIsOpen(false);
        setShowError(false);
    };

    return (
        <>
            <DataRow>
                <Main>
                    <UnitRow>
                        <div className='task' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p>Wallet Balance <span style={{marginLeft: 15}}><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} /></span></p>
                        </div>
                        <div className='threshold' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p>{BalancesData[0].threshold}</p>
                        </div>
                        <div className='points' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p>{BalancesData[0].points}</p>
                        </div>
                        <div className='edit'>
                            <p><span className='edit'><Icon icon="clarity:note-edit-line" onClick={openEditModal} /></span></p>
                        </div>
                    </UnitRow>                    
                </Main>
                <Toggle show={show}>
                    {BalancesData.map((value, index) => {
                        if(index === 0) return null;
                        return (
                            <UnitRow>
                                <div className='task'></div>
                                <div className='threshold'>
                                    <p key={index}>{value.threshold}</p>
                                </div>
                                <div className='points'>
                                    <p key={index}>{value.points}</p>
                                </div>
                                <div className='edit'></div>
                            </UnitRow>
                        )
                    })}
                </Toggle>                
            </DataRow>

            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p>Ballance Wallet</p>
                        </div>
                        <div className='right'>
                            <p>
                                <span className='edit'><Icon icon="clarity:note-edit-line" onClick={openEditModal} /></span>
                            </p>
                        </div>
                        <div className='right' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p style={{fontSize: 16}}>
                                <span><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} onClick={() => setShow(!show)} /></span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <ToggleForMobile show={show}>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Threshold</p>
                        </div>
                        <div className='right'>
                            <p style={{color: 'dimgray'}}>Points</p>
                        </div>
                    </UnitRowForMobile>
                    {BalancesData.map((value, index) => {
                        return (
                            <UnitRowForMobile key={index}>
                                <div className='left'>
                                    <p style={{fontWeight: 400}}>{value.threshold}</p>
                                </div>
                                <div className='right'>
                                    <p style={{fontWeight: 400}}>{value.points}</p>
                                </div>
                            </UnitRowForMobile>
                        );
                    })}
                </ToggleForMobile>
            </DataRowForMobile>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                className="wallet-balance-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <p>Wallet Balance</p>
                    <div
                        onClick={() => setModalIsOpen(false)}
                        onKeyDown={() => setModalIsOpen(false)}
                        role="button"
                        tabIndex="0"
                    >
                        <Icon icon="ep:close-bold" />
                    </div>
                </div>
                <div className='input'>
                    {showError? (error.item? <Alert severity="error">{error.desc}</Alert>: <Alert severity="success">Success! Please click Save Button</Alert>): ''}
                </div>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <div className='input'>
                        <div className='input_div'>
                            <p style={{fontSize: 12}}>Threshold</p>
                        </div>
                        <div className='input_div'>
                            <p style={{fontSize: 12}}>Points</p>
                        </div>
                    </div>
                    {balances.map((value, index) => {
                        return (
                            <div key={index} className='input'>
                                <div className='input_div'>
                                    <input className={`black_input ${showError && error.index === index && error.item === 'threshold'? 'error': ''}`}
                                        value={value.threshold}
                                        onChange={e => {balances[index].threshold = e.target.value; setBalances([...balances]);}}
                                    />
                                </div>
                                <div className='input_div'>
                                    <NumberFormat className={`black_input ${showError && error.index === index && error.item === 'points'? 'error': ''}`}
                                        placeholder='Enter number'
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        value={value.points}
                                        onValueChange={values => {
                                            balances[index].points = values.value;
                                            setBalances([...balances]);
                                        }}
                                    />
                                </div>
                                <div className='trash_btn'>
                                    <Icon icon="bytesize:trash" onClick={() => {
                                        let array = [...balances]; 
                                        array.splice(index, 1);
                                        setBalances([...array]);
                                    }}/>
                                </div>
                            </div>
                        );
                    })}
                    <div className='input'>
                        <span className='add_balance'><Icon className={error.item === 'noData'? 'error': ''} icon='akar-icons:plus' onClick={() => setBalances([...balances, {threshold: '', points: ''}])}/></span>
                    </div>
                </form>
                <div className="pwd-modal__footer mt-4">
                    <button
                        className="btn previous"
                        onClick={() => {setModalIsOpen(false); setShowError(false);}}
                    >
                        Cancel
                    </button>
                    <button className='btn next' onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </Modal>
        </>
    )
};

export default WalletBalance;

const DataRow = styled.div`
    min-height: 60px;
    border: 1px solid #464646;
    border-top: none;
    flex-flow: row wrap;
    svg {
        cursor: pointer;
    }    
    @media screen and (max-width: ${device['phone']}){
        display: none;
    }
`;

const Main = styled.div`
    height: 60px;
    display: flex;
    justify-content: center;
    p {
        padding: 10px 0!important;
    }
`;

const Toggle = styled.div`
    min-height: 60px;
    display: ${props => {
        return props.show? 'flex': 'none';
    }};
    transition: 0.3s;
    flex-direction: column;
    justify-content: center;
    p {
        margin-bottom: 12px;
    }
`;

const UnitRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    &>div.task {width: ${width.task}; padding-left: 16px}
    &>div.threshold {width: ${width.threshold};}
    &>div.points {width: ${width.points};}
    &>div.edit {
        width: ${width.edit};
        display: flex;
        justify-content: center;
        p span {
            font-size: 22px;
            color: #23c865;
        }
    }
`;

// For Mobile
const DataRowForMobile = styled.div`
    min-height: 60px;
    border: 1px solid #464646;
    border-top: none;
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
        width: 80%;
    }
    &>div.right {
        p {
            text-align: right;
            span.edit {
                font-size: 22px;
                color: #23c865;
            }    
        }
    }
`;