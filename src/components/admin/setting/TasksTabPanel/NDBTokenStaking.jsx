import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import { Alert } from '@mui/material';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';
import NumberFormat from 'react-number-format';
import { update_Task_Setting } from '../../../../redux/actions/tasksAction';

const WalletBalance = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state);

    const [show, setShow] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [stakings, setStakings] = useState([]);
    const [showError, setShowError] = useState(false);
    const [pending, setPending] = useState(false);

    // Balance Data Validation
    const error = useMemo(() => {
        if(!stakings.length) return {item: 'noData', desc: 'One Balance is required at least'};
        for(let i = 0; i < stakings.length; i++) {
            if(!stakings[i].expiredTime) return {index: i, item: 'expiredTime', desc: 'Input is required'};
            if(!stakings[i].ratio) return {index: i, item: 'ratio', desc: 'Input is required'};
        }
        return {};
    }, [stakings]);

    const openEditModal = () => {
        const staking = tasks.staking.map(item => ({expiredTime: item.expiredTime, ratio: item.ratio}));
        setStakings(staking);
        setModalIsOpen(true);
    };

    const handleSubmit = async () => {
        if(Object.values(error).length) {
            setShowError(true);
            return;
        }
        setPending(true);        
        setShowError(false);
        const updateData = {
            verification: tasks.verification,
            wallet: tasks.wallet.map(item => ({amount: Number(item.amount), point: Number(item.point)})),
            auction: tasks.auction,
            direct: tasks.direct,
            staking: stakings.map(item => ({expiredTime: item.expiredTime, ratio: item.ratio}))
        };
        await dispatch(update_Task_Setting(updateData));
        setPending(false);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setShowError(false);
    };

    return (
        <>
            <DataRow>
                <Main>
                    <UnitRow>
                        <div className='task' data-bs-toggle="collapse" data-bs-target='#ndb_token' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p>Ndb token staking in the wallet <span style={{marginLeft: 15}}><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} /></span></p>
                        </div>
                        <div className='threshold'>
                            <p>{tasks.staking[0]?.expiredTime} Days</p>
                        </div>
                        <div className='points'>
                            <p>{tasks.staking[0]?.ratio} * x tokens * {tasks.staking[0]?.expiredTime}</p>
                        </div>
                        <div className='edit'>
                            <p><span className='edit'><Icon icon="clarity:note-edit-line" onClick={openEditModal} /></span></p>
                        </div>
                    </UnitRow>
                </Main>
                <div id='ndb_token' className='collapse'>
                    <Toggle>
                        {tasks.staking.map((value, index) => {
                            if(index === 0) return null;
                            return (
                                <UnitRow key={index}>
                                    <div className='task'></div>
                                    <div className='threshold'>
                                        <p key={index}>{value.expiredTime} Days</p>
                                    </div>
                                    <div className='points'>
                                        <p key={index}>{value.ratio} * x tokens * {value.expiredTime}</p>
                                    </div>
                                    <div className='edit'></div>
                                </UnitRow>
                            )
                        })}
                    </Toggle>
                </div>                
            </DataRow>

            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>Ndb token staking in the wallet</p>
                        </div>
                        <div className='right'>
                            <p>
                                <span className='edit'><Icon icon="clarity:note-edit-line" onClick={openEditModal} /></span>
                            </p>
                        </div>
                        <div className='right' onClick={() => setShow(!show)} onKeyDown={() => setShow(!show)} aria-hidden="true">
                            <p style={{fontSize: 16}}>
                                <span><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} data-bs-toggle="collapse" data-bs-target='#ndb_token' onClick={() => setShow(!show)} /></span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id='ndb_token' className='collapse'>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>expiredTime {'&'} Points</p>
                        </div>
                    </UnitRowForMobile>
                    {tasks.staking.map((value, index) => {
                        return (
                            <UnitRowForMobile key={index}>
                                <div className='left'>
                                    <p style={{fontWeight: 400, textTransform: 'unset'}}>X tokens in {value.expiredTime} days staking</p>
                                    <p style={{fontWeight: 400, color: 'dimgrey', textTransform: 'unset'}}>{value.ratio} * X tokens * {value.expiredTime}</p>
                                </div>
                            </UnitRowForMobile>
                        );
                    })}
                </div>
            </DataRowForMobile>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="wallet-balance-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <p>Ndb token staking in the wallet</p>
                    <div
                        onClick={closeModal}
                        onKeyDown={closeModal}
                        role="button"
                        tabIndex="0"
                    >
                        <Icon icon="ep:close-bold" />
                    </div>
                </div>
                <div className='input'>
                    {showError? (error.item? <Alert severity="error">{error.desc}</Alert>: <Alert severity="success">Success! Please click Save Button</Alert>): ''}
                </div>
                <form className="form custom_scrollbar" onSubmit={(e) => e.preventDefault()}>
                    <div className='input'>
                        <div className='input_div'>
                            <p style={{fontSize: 12}}>Expire Time (Day)</p>
                        </div>
                        <div className='input_div'>
                            <p style={{fontSize: 12}}>Points</p>
                        </div>
                    </div>
                    {stakings.map((value, index) => {
                        return (
                            <div key={index} className='input'>
                                <div className='input_div'>
                                    <NumberFormat className={`black_input ${showError && error.index === index && error.item === 'expiredTime'? 'error': ''}`}
                                        placeholder='Enter number'
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        value={value.expiredTime}
                                        onValueChange={values => {
                                            stakings[index].expiredTime = values.value;
                                            setStakings([...stakings]);
                                        }}
                                    />
                                </div>
                                <div className='input_div'>
                                    <NumberFormat className={`black_input ${showError && error.index === index && error.item === 'ratio'? 'error': ''}`}
                                        placeholder='Enter number'
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        value={value.ratio}
                                        onValueChange={values => {
                                            stakings[index].ratio = values.value;
                                            setStakings([...stakings]);
                                        }}
                                    />
                                </div>
                                <div className='trash_btn'>
                                    <Icon icon="bytesize:trash" onClick={() => {
                                        let array = [...stakings]; 
                                        array.splice(index, 1);
                                        setStakings([...array]);
                                    }}/>
                                </div>
                            </div>
                        );
                    })}
                    <div className='input'>
                        <span className='add_balance'><Icon className={error.item === 'noData'? 'error': ''} icon='akar-icons:plus' onClick={() => setStakings([...stakings, {expiredTime: '', ratio: ''}])}/></span>
                    </div>
                </form>
                <div className="pwd-modal__footer mt-4">
                    <button
                        className="btn previous"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button className='btn next' onClick={handleSubmit} disabled={pending}>
                        {pending? 'Saving. . .': 'Save'}
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
`;

const Toggle = styled.div`
    min-height: 60px;
    display: flex;
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