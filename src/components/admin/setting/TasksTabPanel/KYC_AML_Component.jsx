import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import { Alert } from '@mui/material';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';
import { update_Task_Setting } from './../../../../redux/actions/tasksAction';

const KYC_AML_Component = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state);

    const [show, setShow] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [points, setPoints] = useState(tasks.verification);
    const [showError, setShowError] = useState(false);
    const [pending, setPending] = useState(false);

    const error = useMemo(() => {
        if(!points) return 'Input is required';
        return '';
    }, [points]);

    const handleSubmit = async () => {
        if(error) {
            setShowError(true);
            return;
        }
        setPending(true);        
        setShowError(false);
        const updateData = {
            verification: points,
            wallet: tasks.wallet.map(item => ({amount: item.amount, point: item.point})),
            auction: tasks.auction,
            direct: tasks.direct,
            staking: tasks.staking.map(item => ({expiredTime: item.expiredTime, ratio: item.ratio}))
        };
        await dispatch(update_Task_Setting(updateData));
        setPending(false);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setPoints(tasks.verification);
        setShowError(false);
    };

    return (
        <>
            <DataRow>
                <div className='task'>
                    <Main>
                        <p>KYC/AML COMPLETION</p>
                    </Main>
                </div>
                <div className='threshold'></div>
                <div className='points'>
                    <Main>
                        <p>{tasks.verification}</p>
                    </Main>
                </div>
                <div className='edit'>
                    <Main>
                        <p><span><Icon icon="clarity:note-edit-line" onClick={() => setModalIsOpen(true)} /></span></p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p>KYC/AML COMPLETION</p>
                        </div>
                        <div className='right'>
                            <p>
                                <span className='edit'><Icon icon="clarity:note-edit-line" onClick={() => setModalIsOpen(true)} /></span>
                            </p>
                        </div>
                        <div className='right'>
                            <p style={{fontSize: 16}}>
                                <span><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} data-bs-toggle="collapse" data-bs-target='#kyc_aml'  onClick={() => setShow(!show)} /></span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id='kyc_aml' className='collapse'>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Points</p>
                        </div>
                        <div className='right'>
                            <p>{tasks.verification}</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="pwd-reset-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>KYC/AML Completion</p>
                    </div>
                    <div
                        onClick={closeModal}
                        onKeyDown={closeModal}
                        role="button"
                        tabIndex="0"
                    >
                        <Icon icon="ep:close-bold" />
                    </div>
                </div>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <div className='input'>
                        {showError? (error? <Alert severity="error">{error}</Alert>: <Alert severity="success">Success! Please click Save Button</Alert>): ''}
                        <p className='mt-2' style={{fontSize: 12}}>Points</p>
                        <NumberFormat className={`black_input ${showError && error? 'error': ''}`}
                            placeholder='Enter number'
                            thousandSeparator={true}
                            allowNegative={false}
                            value={points}
                            onValueChange={values => setPoints(values.value)}
                        />
                    </div>                  
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
                </form>
            </Modal>
        </>
    );
};

export default KYC_AML_Component;

const DataRow = styled.div`
    min-height: 60px;
    border: 1px solid #464646;
    border-top: none;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    svg {
        cursor: pointer;
    }

    &>div.task {width: ${width.task}; padding-left: 16px;}
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

    @media screen and (max-width: ${device['phone']}){
        display: none;
    }
`;

const Main = styled.div`
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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