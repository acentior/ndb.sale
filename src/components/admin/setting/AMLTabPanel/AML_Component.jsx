import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import { Alert } from '@mui/material';
import Select from 'react-select';
import { device } from '../../../../utilities/device';
import { update_KYC_Setting } from '../../../../redux/actions/kycSettingAction';

const requirementsList = [
    { value: "required", label: "Required" },
    { value: "not_required", label: "Not required" },
];

const AMLComponent = ({icon, prop, topic, thresholds = {}}) => {
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [pending, setPending] = useState(false);

    const InitialRequirement = thresholds[prop]? requirementsList[0]: requirementsList[1];
    const [requirement, setRequirement] = useState(InitialRequirement);

    const [threshold, setThreshold] = useState(!thresholds[prop]? '': thresholds[prop]);
    const thresholdError = useMemo(() => {
        if(requirement.value === 'required' && !threshold) return 'Threshold is required';
        return '';
    }, [requirement, threshold]);

    const handleSubmit = async () => {
        if(thresholdError) {
            setShowError(true);
            return;
        }
        setPending(true);
        const updateData = { ...thresholds, [prop]: Number(threshold) };
        await dispatch(update_KYC_Setting(updateData));
        setPending(false);
        setShowError(false)
    };

    const closeModal = () => {
        setShowError(false);
        setThreshold('');
        setRequirement(InitialRequirement);
        setModalIsOpen(false);
    };

    return (
        <>
            <Container className='component'>
                <div className='icon'>
                    <p><span><Icon icon={icon} /></span></p>
                </div>
                <div className='topic'>
                    <p>{topic}</p>
                </div>
                <div className='thresholds'>
                    <p>
                        {!thresholds[prop]? 'NOT REQUIRED': 'THRESHOLD: ' + thresholds[prop]}
                    </p>
                </div>
                <div className='edit'>
                    <p><span><Icon icon="clarity:note-edit-line" onClick={() => setModalIsOpen(true)}/></span></p>
                </div>
            </Container>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="kyc-aml-modal"
                overlayClassName="pwd-modal__overlay"
            >
                <div className="pwd-modal__header">
                    <p>AML {topic}</p>
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
                    <div className='input_div'>
                        {showError ? (
                            thresholdError ? (
                                <Alert severity="error">{thresholdError}</Alert>
                            ) : (
                                <Alert severity="success">
                                    Success! Please click Next Button
                                </Alert>
                            )
                        ) : (
                            ""
                        )}
                    </div>
                    <div className='input_div'>
                        <div className='input'>
                            <p style={{fontSize: 12}}>Requirement</p>
                            <Select
                                value={requirement}
                                onChange={selected => {
                                    setRequirement(selected); setThreshold('');
                                }}
                                options={requirementsList}
                                styles={customSelectStyles}
                                placeholder=""
                            />
                        </div>  
                        <div className='input'>
                            <p className={requirement.value === 'not_required'? 'disabled': ''} style={{fontSize: 12}}>Threshold</p>
                            <NumberFormat className={`black_input ${requirement.value === 'not_required'? 'disabled': ''}`}
                                disabled={requirement.value === 'not_required'? true: false}
                                placeholder='Enter number'
                                thousandSeparator={true}
                                allowNegative={false}
                                value={threshold}
                                onValueChange={({value}) => setThreshold(value)}
                            />
                        </div>  
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

export default AMLComponent;

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
    &>div.thresholds {
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
        &>div.thresholds {width: 30%}
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
        &>div.thresholds {width: 65%}
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
    input: provided => ({
        ...provided,
        color: 'white'
    })
}