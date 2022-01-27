import React, { useState, useMemo } from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { device } from '../../utilities/device';

const DeleteConfirmModal = ({isModalOpen, setIsModalOpen, confirmData = '', doAction, pending = false}) => {
    const [input, setInput] = useState('');
    const confirmed = useMemo(() => {
        if(input === confirmData) return true;
        return false;
    }, [input, confirmData]);

    const closeModal = () => {
        setInput('');
        setIsModalOpen(false);
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className="delete-confirm-modal"
            overlayClassName="pwd-modal__overlay"
        >
            <div className="pwd-modal__header">
                <p></p>
                <div
                    onClick={closeModal}
                    onKeyDown={closeModal}
                    role="button"
                    tabIndex="0"
                >
                    <Icon icon="ep:close-bold" />
                </div>
            </div>
            <DeleteConfirm>
                <div className='text-center'>
                    <p>Are you sure you want to delete?</p>
                    <p>Action cannot be undone.</p>
                </div>
                <div className='confirm mt-3'>
                    <p className='description'>
                        Please type <strong>{confirmData}</strong> to confirm.
                    </p>
                    <input className='black_input mt-2'
                        placeholder={confirmData}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>
                <div className="pwd-modal__footer mt-4">
                    <button
                        className={`btn ${confirmed? 'green': ''}`}
                        onClick={doAction}
                        disabled = {!confirmed || pending}
                    >
                        {pending? 'Deleting...': 'Yes'}
                    </button>
                    <button
                        className="btn"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </DeleteConfirm>
        </Modal>
    );
};

export default DeleteConfirmModal;

const DeleteConfirm = styled.div`
    margin-top: 20px;
    p {
        font-size: 18px;
        font-weight: 600;
        &.description {
            font-size: 14px;
            font-weight: 400;
        }
    }
    button.btn {
        color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 0;
        display: block;
        margin: 10px auto;
        width: 150px;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 600;
        &:hover {
            color: #23c865;
        }
    }
    button.green {
        border: 1px solid #23c865;
    }
    div.confirm {
        width: 80%;
        margin: auto;
    }
    @media screen and (max-width: ${device['phone']}){
        p {
            font-size: 14px;
            font-weight: 500;
            &.description {
                font-size: 12px;
            }
        }
        button.btn {
            font-size: 14px;
            font-weight: 500;
        }
        div.confirm {
            width: 100%;
        }
    }
`;