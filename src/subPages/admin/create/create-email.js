import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import { Icon } from '@iconify/react';

import Seo from "../../../components/seo"
import Stepper2 from "../../../components/admin/Stepper2";
import LayoutForCreate from "../../../components/admin/LayoutForCreate";

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDateTimePicker   } from '@mui/lab';
import Select from 'react-select';

const userGroups = [
    { value: 'all', label: 'All Users' },
    { value: 'group1', label: 'Group1' },
    { value: 'group2', label: 'Group2' },
    { value: 'group3', label: 'Group3' },
];

const IndexPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);

    //------- Email and Validation
    // Email
    const [email, setEmail] = useState({ name: '', subject: '', content: '' });

    // Email Data Validation
    const emailError = useMemo(() => {
        if(!email.name) return {name: 'Email Name is required'};
        if(!email.subject) return {subject: 'Email Subject is required'};
        if(!email.content) return {content: 'Email Content is required'};
        return {};
    }, [email]);

    //-------- SendTo Data and Validation
    // SendTo Data
    const [sendTo, setSendTo] = useState({userGroup: {}, time: Date.now()});

    // SendTo Data Validation
    const sendToError = useMemo(() => {
        if(!sendTo.userGroup.value) return {userGroup: 'User Group is required'};
        return {};
    }, [sendTo]);


    const setEmailData = () => {
        if(Object.values(emailError)[0]) {
            setShowError(true);
            return;
        }
        setCurrentStep(2);
        setShowError(false);
    };

    const handleSubmit = () => {
        if(Object.values(sendToError)[0]) {
            setShowError(true);
            return;
        }
        setShowError(false);
        alert('Email Sent Successfully')
    };

    return (
        <>
            <Seo title="Create Email" />
            <main className="create-email-page">
                <LayoutForCreate>
                    <Link className="close" to="/admin"><Icon icon="codicon:chrome-close" /></Link>
                    <p className="subtitle">Create Email</p>
                    <Stepper2 currentStep={currentStep} texts={['New Email', 'Send to']}/>
                    {currentStep === 1 && (
                        <>
                            <div className="input_div">
                                {showError? (Object.values(emailError)[0]? <Alert severity="error">{Object.values(emailError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="div1">
                                    <div>
                                        <p>Email Name</p>
                                        <input className={`black_input ${showError && emailError.name? 'error': ''}`}
                                            value={email.name}
                                            onChange={e => setEmail({...email, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <p>Email Subject</p>
                                        <input  className={`black_input ${showError && emailError.subject? 'error': ''}`}
                                            value={email.subject} 
                                            onChange={e => setEmail({...email, subject: e.target.value})}
                                        />
                                    </div>                                    
                                </div>
                                <div className="div2 mt-4">
                                    <p>Email Content</p>
                                    <textarea className={`black_input ${showError && emailError.content? 'error': ''}`} rows={3}
                                        value={email.content} 
                                        onChange={e => setEmail({...email, content: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>                                    
                            <div className="button_div">
                                <Link className="btn previous" to="/admin">Cancel</Link>
                                <button className="btn next" onClick={setEmailData}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="input_div row">
                                <div className="col-lg-3"></div>
                                <div className="col-lg-6">
                                    {showError? (Object.values(sendToError)[0]? <Alert severity="error">{Object.values(sendToError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                    <div>
                                        <p>Send To</p>
                                        <Select
                                            value={sendTo.userGroup}
                                            onChange={(selected) => {
                                                setSendTo({...sendTo, userGroup: selected});
                                            }}
                                            options={userGroups}
                                            styles={customSelectStyles}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <div className="date_picker">           
                                                <p className={`${showError && sendToError.time? 'error': ''}`}>Mailing Date and Time</p>                             
                                                <MobileDateTimePicker  
                                                    className="datePicker1"
                                                    showTodayButton = {true}
                                                    value={sendTo.time}
                                                    onChange={(newValue) => {
                                                        setSendTo({...sendTo, time: newValue});
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />                                        
                                            </div>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className="col-lg-3"></div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(1)}>Previous</button>
                                <button className="btn next" onClick={handleSubmit}>Send</button>
                            </div>
                        </>
                    )}
                </LayoutForCreate>
            </main>
        </>
    )
}

export default IndexPage;

const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      backgroundColor: state.isSelected ? '#23c865' : '#1e1e1e'
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1e1e1e',
      borderRadius: 0
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1e1e1e',
        border: '1px solid white',
    }),
    singleValue: provided => ({
        ...provided,
        color: 'white',
    })
};