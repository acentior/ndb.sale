import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import NumberFormat from 'react-number-format';
import { device } from '../../../../utilities/device';

const TierComponent = ({tier = {}}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [threshold, setThreshold] = useState(tier.threshold);
    return (
        <>
            <Container className='component'>
                <div className='image'>
                    <img src={tier.image} alt={tier.name} />
                </div>
                <div className='name'>
                    <p>{tier.name}</p>
                </div>
                <div className='threshold'>
                    <NumberFormat
                        value={tier.threshold}
                        displayType={'text'}
                        thousandSeparator={true}
                        renderText={(value, props) => <p {...props}>{value}</p>}
                    />
                    <p><span><Icon icon="clarity:note-edit-line" onClick={() => setModalIsOpen(true)}/></span></p>
                </div>
            </Container>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                className="pwd-reset-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={tier.image} alt={tier.name} style={{width: 30, marginRight: 10}} />
                        <p className='text-uppercase'>{tier.name} Tier</p>
                    </div>
                    <div
                        onClick={() => setModalIsOpen(false)}
                        onKeyDown={() => setModalIsOpen(false)}
                        role="button"
                        tabIndex="0"
                    >
                        <Icon icon="ep:close-bold" />
                    </div>
                </div>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <div className='input'>
                        <p className='mt-4' style={{fontSize: 12}}>Threshold</p>
                        <NumberFormat className='black_input'
                            placeholder='Enter number'
                            thousandSeparator={true}
                            allowNegative={false}
                            value={threshold}
                            onValueChange={values => setThreshold(values.value)}
                        />
                    </div>                  
                    <div className="pwd-modal__footer mt-5">
                        <button
                            className="btn previous"
                            onClick={() => setModalIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button className='btn next'>
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default TierComponent;

const Container = styled.div`
    min-height: 75px;
    border: 1px solid #464646;
    border-top: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>div.image {
        width: 7%;
        img {
            width: 45px;
            height: 45px;
            display: block;
            margin: auto;
        }
    }
    &>div.name {
        width: 43%;
    }
    &>div.threshold {
        width: 50%;
        display: flex;
        justify-content: space-between;
        padding-right: 2%;
        p span {
            font-size: 22px;
            color: #23c865;
            cursor: pointer;
        }
    }
    @media screen and (max-width: ${device['laptop-md']}){
        &>div.image {width: 10%}
        &>div.name {width: 40%}
        &>div.threshold {
            width: 10%
            p span {
                font-size: 18px;
            }
        }
    }
    @media screen and (max-width: ${device['tablet']}){
        &>div.image {width: 12%}
        &>div.name {width: 38%}
    }
    @media screen and (max-width: ${device['phone']}){
        &>div.image {
            width: 15%;
            img {
                width: 30px;
                height: 30px;
            }
        }
        &>div.name {width: 45%;}
        &>div.threshold {width: 40%;}
    }
`;
