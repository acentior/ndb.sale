import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import Select from 'react-select';
import { device } from '../../../../utilities/device';

const requirementsList = [
    { value: "threshold", label: "Threshold" },
    { value: "required", label: "Required" },
    { value: "not_required", label: "Not required" },
];

const KYCComponent = ({icon, topic, content}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requirement, setRequirement] = useState({item: {}, content: ''});
    // console.log(requirement)
    return (
        <>
            <Container className='component'>
                <div className='icon'>
                    <p><span><Icon icon={icon} /></span></p>
                </div>
                <div className='topic'>
                    <p>{topic}</p>
                </div>
                <div className='content'>
                    <p>{content}</p>
                </div>
                <div className='edit'>
                    <p><span><Icon icon="clarity:note-edit-line" onClick={() => setModalIsOpen(true)}/></span></p>
                </div>
            </Container>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                className="kyc-aml-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <p>KYC {topic}</p>
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
                    <div className='input_div'>
                        <div className='input'>
                            <p style={{fontSize: 12}}>Requirement</p>
                            <Select
                                value={requirement.item}
                                onChange={(selected) => {
                                    setRequirement({...requirement, item: selected})
                                }}
                                options={requirementsList}
                                styles={customSelectStyles}
                                placeholder=""
                            />
                        </div>  
                        <div className='input'>
                            <p className={requirement.item.value === 'not_required'? 'disabled': ''} style={{fontSize: 12}}>Threshold</p>
                            <NumberFormat className={`black_input ${requirement.item.value === 'not_required'? 'disabled': ''}`}
                                disabled={requirement.item.value === 'not_required'? true: false}
                                placeholder='Enter number'
                                thousandSeparator={true}
                                allowNegative={false}
                            />
                        </div>  
                    </div>
                    <div className="pwd-modal__footer mt-4">
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

export default KYCComponent;

const Container = styled.div`
    min-height: 75px;
    border-bottom: 1px solid #464646;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>div.icon {
        width: 7%;
        p {
            text-align: center;
            span {
                font-size: 30px;
            }
        }
    }
    &>div.topic {
        width: 50%;
    }
    &>div.content {
        width: 35%;
    }
    &>div.edit {
        width: 7%;
        p {
            text-align: center;
            span {
                font-size: 22px;
                color: #23c865;
                cursor: pointer;
            }
        }
    }
    & p {
        font-size: 18px;
        font-weight: 700;
    }
    @media screen and (max-width: ${device['tablet']}){
        &>div.icon {
            width: 10%;
            p span {
                font-size: 24px;
            }
        }
        &>div.topic {width: 50%}
        &>div.content {width: 30%}
        &>div.edit {
            width: 10%
            p span {
                font-size: 18px;
            }
        }
    }
    @media screen and (max-width: ${device['phone']}){
        border-left: 1px solid #464646;
        border-right: 1px solid #464646;
        &>div.icon {width: 17%;}
        &>div.topic {display: none;}
        &>div.content {width: 65%}
        &>div.edit {width: 18%}
    }
`;

const customSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: "white",
        backgroundColor: state.isSelected ? "#23c865" : "#1e1e1e",
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "#1e1e1e",
        borderRadius: 0,
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#1e1e1e",
        border: "1px solid white",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
}