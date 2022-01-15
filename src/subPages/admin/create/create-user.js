import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import { Icon } from '@iconify/react';
import validator from "validator";
import Modal from 'react-modal';
import names from 'random-names-generator';

import Seo from "../../../components/seo"
import Stepper from "../../../components/admin/Stepper";
import LayoutForCreate from "../../../components/admin/LayoutForCreate";

import {Alert, Rating} from '@mui/material';
import Select from 'react-select';
import { countryList } from "../../../utilities/countryAlpha2";
import { capitalizeFirstLetter } from "../../../utilities/string";

import { figures } from './../../../utilities/staticData';
import PaginationBar from "../../../components/admin/PaginationBar";
import { showFailAlarm, showSuccessAlarm } from "../../../components/admin/AlarmModal";

const Countries = countryList.map(item => {
    return {label: item.name, value: item["alpha-2"]};
});

const Roles = [
    {label: 'USER', value: 'user'},
    {label: 'ADMIN', value: 'admin'}
];

const IndexPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //------- Round Data and Validation
    // Round Data
    const initialDetails = {
        email: '',
        country: {},
        role: {}
    };
    const [details, setDetails] = useState(initialDetails);

    // Details Data Validation
    const detailsDataError = useMemo(() => {
        if(!details.email) return {email: 'Email is required'};
        if(!validator.isEmail(details.email)) return {email: 'Email is invalid'};
        if(!details.country.value) return {country: 'Please select country'};
        if(!details.role.value) return {role: 'Please select role'};
        return {};
    }, [details]);    

    //-------- Avatar Data and Validation
    // Avatar Data
    const [avatar, setAvatar] = useState({});

    // Avatar Data Validation
    const avatarDataError = useMemo(() => {
        if(Object.keys(avatar).length === 0) return 'Please select a avatar';
        return '';
    }, [avatar]);

    //-------- User display name and Validation
    const [userName, setUserName] = useState('');
    const userNameError = useMemo(() => {
        if(!userName) return 'User`s display name is required';
        return '';
    }, [userName]);

    const selectAvatar = item => {
        setAvatar(item);
        setModalIsOpen(true);
    };

    const setUserDetails = () => {
        if(Object.values(detailsDataError)[0]) {
            setShowError(true);
            return;
        }
        setCurrentStep(2);
        setShowError(false);
    };

    const setAvatarData = () => {
        if(avatarDataError) {
            setShowError(true);
            return;
        }
        setCurrentStep(3);
        setShowError(false);
    };

    const setUserDispalyName = () => {
        if(userNameError) {
            setShowError(true);
            return;
        }
        setCurrentStep(4);
        setShowError(false);
    };

    const handleSubmit = () => {
        // showSuccessAlarm('User created successfully');
        showFailAlarm('Action failed', 'Ops! Something went wrong. Try again!');
    };

    return (
        <>
            <Seo title="Create User" />
            <main className="create-user-page">
                <LayoutForCreate>
                    <Link className="close" to="/admin"><Icon icon="codicon:chrome-close" /></Link>
                    <p className="subtitle">Create a User</p>
                    <Stepper currentStep={currentStep} texts={['Details', 'Avatar', 'Name']}/>
                    {currentStep === 1 && (
                        <>
                            <div className="input_div">
                                {showError? (Object.values(detailsDataError)[0]? <Alert severity="error">{Object.values(detailsDataError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="div1">
                                    <div>
                                        <p>Email</p>
                                        <input className={`black_input ${showError && detailsDataError.email? 'error': ''}`}
                                            value={details.email} 
                                            onChange={e => setDetails({...details, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <p>Country of residence</p>
                                        <Select
                                            className={`black_input ${showError && detailsDataError.country? 'error': ''}`}
                                            value={details.country}
                                            onChange={selected => {
                                                setDetails({...details, country: selected});
                                            }}
                                            options={Countries}
                                            styles={customSelectStyles}
                                        />
                                    </div>                                    
                                </div>
                                <div className="div1 mt-3">
                                    <div>
                                        <p>Role</p>
                                        <Select
                                            className={`black_input ${showError && detailsDataError.role? 'error': ''}`}
                                            value={details.role}
                                            onChange={selected => {
                                                setDetails({...details, role: selected});
                                            }}
                                            options={Roles}
                                            styles={customSelectStyles}

                                        />
                                    </div>
                                    <div>
                                        <p className="disabled">Password</p>
                                        <input  className='black_input disabled' disabled
                                            placeholder="Auto generated and send to email"
                                        />
                                    </div>                                    
                                </div>
                            </div>
                            <div className="button_div">
                                <Link className="btn previous" to="/admin">Cancel</Link>
                                <button className="btn next" onClick={setUserDetails}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="avatar_div">
                                {showError? (avatarDataError? <Alert severity="error">{avatarDataError}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="avatar_div">
                                    <input className="black_input" placeholder="Search" />
                                    <div className="avatars mt-3">
                                        {figures.map((item, index) => {
                                            return (
                                                <div className={`avatar ${avatar.id === item.id? 'avatar--selected': ''}`}
                                                    key={index} onClick={() => selectAvatar(item)} onKeyDown={() => selectAvatar(item)} role="button" tabIndex={0}
                                                >
                                                    <div className="image">
                                                        <img src={item.avatar} alt="Avatar" />
                                                    </div>
                                                    <p title={item.lastname}>
                                                        {item.lastname}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="pagination">
                                        <PaginationBar />
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(1)}>Previous</button>
                                <button className="btn next" onClick={setAvatarData}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <div className="input_div">
                                {showError? (userNameError? <Alert severity="error">{userNameError}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="display-name">
                                    <div className="d-flex align-items-end justify-content-start">
                                        <h5 className="random-display mb-0 fw-bold me-4">
                                            {avatar.lastname}.
                                        </h5>
                                        <div>
                                            <p className="form-label">Your display name</p>
                                            <input
                                                className="black_input"
                                                type="text"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p
                                            className="random-text"
                                            onClick={() =>
                                                setUserName(names.random().substring(0, 7))
                                            }
                                            onKeyDown={() =>
                                                setUserName(names.random().substring(0, 7))
                                            }
                                            role="presentation"
                                        >
                                            Random generate
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(2)}>Previous</button>
                                <button className="btn next" onClick={setUserDispalyName}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                            <div className="input_div">                               
                                <div className="for_desktop">
                                    <div className="row">
                                        <div className="col-sm-4 col-6">
                                            <div className="item">
                                                <p>Display Name</p>
                                                <p>{userName}</p>
                                            </div>                                        
                                            <div className="item">
                                                <p>Country</p>
                                                <p>{details.country.label}</p>
                                            </div>
                                            <div className="item">
                                                <p>Role</p>
                                                <p>{details.role.label}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 col-6">
                                            <div className="item">
                                                <p>Email</p>
                                                <p>{details.email}</p>
                                            </div>
                                            <div className="item">
                                                <p>Password</p>
                                                <p>********</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="item">
                                                <p>Avatar</p>
                                                <p>{avatar.lastname}</p>
                                            </div>  
                                            <div className="item">
                                                <img src={avatar.avatar} alt={avatar.label} /> 
                                            </div>  
                                        </div>
                                    </div>
                                </div>                                
                                <div className="for_phone">
                                    <div className="row">
                                        <div className="col-sm-3 mb-4">
                                            <div className="item">
                                                <img src={avatar.avatar} alt={avatar.label} /> 
                                            </div>  
                                            <div className="item text-center">
                                                <p>Avatar</p>
                                                <p>{avatar.lastname}</p>
                                            </div>                                              
                                        </div>
                                        <div className="col-sm-4 col-6 mb-4">
                                            <div className="item">
                                                <p>Display Name</p>
                                                <p>{userName}</p>
                                            </div>                                        
                                            <div className="item">
                                                <p>Country</p>
                                                <p>{details.country.label}</p>
                                            </div>                                        
                                            <div className="item">
                                                <p>Role</p>
                                                <p>{details.role.label}</p>
                                            </div>                                     
                                        </div>
                                        <div className="col-sm-5 col-6">
                                            <div className="item">
                                                <p>Email</p>
                                                <p>{details.email}</p>
                                            </div>  
                                            <div className="item">
                                                <p>Password</p>
                                                <p>********</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(3)}>Previous</button>
                                <button className="btn next" onClick={handleSubmit}>Save</button>
                            </div>
                        </>
                    )}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        ariaHideApp={false}
                        className="show-avatar-modal"
                        overlayClassName="pwd-modal__overlay"
                    >
                        <div className="pwd-modal__header">
                            <p></p>
                            <div
                                onClick={() => setModalIsOpen(false)}
                                onKeyDown={() => setModalIsOpen(false)}
                                role="button"
                                tabIndex="0"
                            >
                                <Icon icon="ep:close-bold" />
                            </div>
                        </div>
                        {Object.keys(avatar).length !== 0 && (
                            <div className="preview_div">
                                <p className="name">
                                    {avatar ? 
                                        `${capitalizeFirstLetter(avatar.firstname)} ${capitalizeFirstLetter(avatar.lastname)}`:
                                        "Nicolla Tesla"
                                    }
                                </p>
                                <div className="row avatarStats">
                                    <div className="col-sm-5">
                                        <div className="profile">
                                            <div className="image_div">
                                                <img src={avatar?.avatar} alt="back" />
                                                {/* {avatarItems.hairColor && (<>
                                                    <Hair hairColor={avatarItems.hairColor} style={{top: `${hairStyles[avatarItems.hairStyle].top}%`, left: `${hairStyles[avatarItems.hairStyle].left}%`, width: `${hairStyles[avatarItems.hairStyle].width}%`}}>
                                                        {parse(hairStyles[avatarItems.hairStyle].svg)}
                                                    </Hair>
                                                    <div style={{top: `${expressions[avatarItems.expression].top}%`, left: `${expressions[avatarItems.expression].left}%`, width: `${expressions[avatarItems.expression].width}%`}}>
                                                        {parse(expressions[avatarItems.expression].svg)}
                                                    </div>
                                                    <div style={{top: `${facialStyles[avatarItems.facialStyle].top}%`, left: `${facialStyles[avatarItems.facialStyle].left}%`, width: `${facialStyles[avatarItems.facialStyle].width}%`}}>
                                                        {parse(facialStyles[avatarItems.facialStyle].svg)}
                                                    </div>
                                                    <div style={{top: `${hats[avatarItems.hat].top}%`, left: `${hats[avatarItems.hat].left}%`, width: `${hats[avatarItems.hat].width}%`}}>
                                                        {parse(hats[avatarItems.hat].svg)}
                                                    </div>
                                                    <div style={{top: `${others[avatarItems.other].top}%`, left: `${others[avatarItems.other].left}%`, width: `${others[avatarItems.other].width}%`}}>
                                                        {parse(others[avatarItems.other].svg)}
                                                    </div>
                                                </>)} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        {avatar.stars.map((star, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <div className="col-6">
                                                        <p title={star.type}>{star.type}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={star.rates}
                                                            readOnly
                                                            emptyIcon=" "
                                                            size="small"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="facts">
                                    {avatar.abilities.map((item, index) => {
                                        return (
                                            <div key={index} className="row">
                                                <div className="col-4">
                                                    <p>{item.title}</p>
                                                </div>
                                                <div className="col-8">
                                                    <p>{item.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="details">
                                    <p>{avatar.intro}</p>
                                </div>
                            </div>
                        )}
                    </Modal>
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
      backgroundColor: state.isSelected ? '#23c865' : '#1e1e1e',
      fontSize: 14
    }),
    control: provided => ({
      ...provided,
      backgroundColor: '#1e1e1e',
      border: 'none',
      borderRadius: 0
    }),
    menu: provided => ({
        ...provided,
        backgroundColor: '#1e1e1e',
        border: '1px solid white',
    }),
    singleValue: provided => ({
        ...provided,
        color: 'white',
    }),
    input: provided => ({
        ...provided,
        color: 'white'
    })
};