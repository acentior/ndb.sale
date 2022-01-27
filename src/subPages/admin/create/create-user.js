import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "gatsby"
import { Icon } from '@iconify/react';
import validator from "validator";
import names from 'random-names-generator';

import Seo from "../../../components/seo"
import Stepper from "../../../components/admin/Stepper";
import LayoutForCreate from "../../../components/admin/LayoutForCreate";

import { Alert } from '@mui/material';
import Select from 'react-select';
import { countryList } from "../../../utilities/countryAlpha2";

import PaginationBar from "../../../components/admin/PaginationBar";
import { fetch_Avatars } from './../../../redux/actions/avatarAction';
import { set_Page } from "../../../redux/actions/paginationAction";
import AvatarImage from "../../../components/admin/shared/AvatarImage";
import ShowAvatarModal from "../../../components/admin/shared/ShowAvatarModal";
import { create_New_User } from "../../../redux/actions/userAction";

const Countries = countryList.map(item => {
    return {label: item.name, value: item["alpha-2"]};
});

const Roles = [
    {label: 'USER', value: 'ROLE_USER'},
    {label: 'ADMIN', value: 'ROLE_ADMIN'}
];

const IndexPage = () => {
    const dispatch = useDispatch();
    const avatars = useSelector(state => state.data);
    const { page, limit } = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(set_Page(1, 8));
        dispatch(fetch_Avatars());
    }, [dispatch]);

    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [isShowAvatarOpen, setIsShowAvatarOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [avatarsPerPage, setAvatarsPerPage] = useState([]);

    useEffect(() => {
        setAvatarsPerPage(Object.values(avatars).slice((page - 1) * limit, page * limit));
    }, [avatars, page, limit]);

    //------- Round Data and Validation
    // Round Data
    const initialDetails = {
        email: '',
        country: {},
        role: Roles[0]
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
        setAvatar({})
        setAvatar(item);
        setIsShowAvatarOpen(true);
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

    const handleSubmit = async () => {
        setPending(true);
        const createData = {
            email: details.email,
            country: details.country.value,
            role: details.role.value,
            avatarName: avatar.surname,
            shortName: `${avatar.surname}.${userName}`,
        };
        await dispatch(create_New_User(createData));
        setPending(false);
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
                                        {avatarsPerPage.map((item, index) => {
                                            return (
                                                <div className={`avatar ${avatar.id === item.id? 'avatar--selected': ''}`}
                                                    key={index} onClick={() => selectAvatar(item)} onKeyDown={() => selectAvatar(item)} role="button" tabIndex={0}
                                                >
                                                    <div className="image">
                                                        <AvatarImage avatar={item} />
                                                    </div>
                                                    <p title={item.surname}>
                                                        {item.surname}
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
                                            {avatar.surname}.
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
                                                <p>{avatar.surname}.{userName}</p>
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
                                                <p>{avatar.surname}</p>
                                            </div>  
                                            <div className="item">
                                                <AvatarImage avatar={avatar} />
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                                <div className="for_phone">
                                    <div className="row">
                                        <div className="col-sm-3 mb-4">
                                            <div className="item">
                                                <AvatarImage avatar={avatar} />
                                            </div>  
                                            <div className="item text-center">
                                                <p>Avatar</p>
                                                <p>{avatar.surname}</p>
                                            </div>                                              
                                        </div>
                                        <div className="col-sm-4 col-6 mb-4">
                                            <div className="item">
                                                <p>Display Name</p>
                                                <p>{avatar.surname}.{userName}</p>
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
                                <button className="btn next" onClick={handleSubmit} disabled={pending}>{pending? 'Saving. . .': 'Save'}</button>
                            </div>
                        </>
                    )}
                    <ShowAvatarModal isModalOpen={isShowAvatarOpen} setIsModalOpen={setIsShowAvatarOpen} avatar={avatar} />
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