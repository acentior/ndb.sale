import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "gatsby"
import { Icon } from '@iconify/react';
import validator from "validator";
import NumberFormat from "react-number-format";

import Seo from "../../../components/seo"
import Stepper from "../../../components/admin/Stepper";
import LayoutForCreate from "../../../components/admin/LayoutForCreate";
import { secondsToDhms } from "../../../utilities/number";

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDateTimePicker   } from '@mui/lab';
import Select from 'react-select';
import { fetch_Avatars } from './../../../redux/actions/avatarAction';
import AvatarImage from './../../../components/admin/shared/AvatarImage';
import { create_Auction } from "../../../redux/actions/auctionAction";

const IndexPage = () => {
    const dispatch = useDispatch();
    const avatars = useSelector(state => state.data);
    const Avatars = Object.values(avatars).map(item => {
        return { value: item.id, label: item.surname };
    });

    useEffect(() => {
        dispatch(fetch_Avatars());
    }, [dispatch]);

    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [pending, setPending] = useState(false);
    const totalTokenAmount = 100000000;
    const prevReservedPrice = 5000;

    //------- Round Data and Validation
    // Round Data
    const initialRoundData = { roundNumber: '', startTime: Date.now(), endTime: Date.now() };
    const [roundData, setRoundData] = useState(initialRoundData);
    const duration = useMemo(() => {
        if(!roundData.startTime || !roundData.endTime) return '';
        if(new Date(roundData.endTime) <= new Date(roundData.startTime)) return '';
        return new Date(roundData.endTime) - new Date(roundData.startTime) + 1000;
    }, [roundData]);

    // Round Data Validation
    const roundDataError = useMemo(() => {
        if(!roundData.roundNumber) return {roundNumber: 'Round Number is required'};
        if(!roundData.startTime) return {startTime: 'Round Start Time is required'};
        if(!validator.isDate(new Date(roundData.startTime))) return {startTime: 'Round Start Time is invalid'};        
        if(!roundData.endTime) return {endTime: 'Round End Time is required'};
        if(!validator.isDate(new Date(roundData.endTime))) return {endTime: 'Round End Time is invalid'};
        if(Math.round((new Date(roundData.endTime) - new Date(roundData.startTime))) <= 0) return {endTime: 'Round End Time must be after Start Time'};
        return {};
    }, [roundData]);

    //-------- Token Data and Validation
    // Token Data
    const initialTokenData = { tokenAmount: '', ReservedPrice: '' };
    const [tokenData, setTokenData] = useState(initialTokenData);

    // Token Data Validation
    const tokenDataError = useMemo(() => {
        if(!tokenData.tokenAmount) return {tokenAmount: 'Token Amount is required'};
        if(!validator.isNumeric(tokenData.tokenAmount)) return {tokenAmount: 'Token Amount must be number'};
        if(!tokenData.ReservedPrice) return {ReservedPrice: 'Reserved Price is required'};
        if(!validator.isNumeric(tokenData.ReservedPrice)) return {ReservedPrice: 'Reserved Price must be number'};
        return {};
    }, [tokenData]);

    //--------- Avatar Data
    const [avatar, setAuctionAvatar] = useState({});
    const [avatarToken, setAvatarToken] = useState('');

    const avatarError = useMemo(() => {
        if(!avatar.label) return {avatar: 'Please select a avatar'};
        if(!avatarToken) return {avatarToken: 'Avatar Token is required'};
        return {};
    }, [avatar, avatarToken]);

    const setIDAndTime = () => {
        if(Object.values(roundDataError)[0]) {
            setShowError(true);
            return;
        }
        setCurrentStep(2);
        setShowError(false);
    };

    const setTokenAmountPrice = () => {
        if(Object.values(tokenDataError)[0]) {
            setShowError(true);
            return;
        }
        setCurrentStep(3);
        setShowError(false);
    };

    const setAvatar = () => {
        if(Object.values(avatarError)[0]) {
            setShowError(true);
            return;
        }
        setCurrentStep(4);
        setShowError(false);
    };

    const handleSubmit = async () => {
        setPending(true);
        const createData = {
            round: Number(roundData.roundNumber),
            startedAt: Number(roundData.startTime),
            duration: Number(duration),
            totalToken: Number(tokenData.tokenAmount),
            minPrice: Number(tokenData.ReservedPrice),
            avatar: avatars[avatar.value]?.avatarSet.map(item => {
                return {groupId: item.groupId, compId: item.compId};
            }),
            token: Number(avatarToken),
        };
        await dispatch(create_Auction(createData));
        // console.log(createData)
        setPending(false);
    };

    return (
        <>
            <Seo title="Create Auction" />
            <main className="create-auction-page">
                <LayoutForCreate>
                    <Link className="close" to="/admin"><Icon icon="codicon:chrome-close" /></Link>
                    <p className="subtitle">Create Auction</p>
                    <Stepper currentStep={currentStep} texts={['ID & Time', 'Token', 'Avatar']}/>
                    {currentStep === 1 && (
                        <>
                            <div className="input_div">
                                {showError? (Object.values(roundDataError)[0]? <Alert severity="error">{Object.values(roundDataError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="div1">
                                    <div>
                                        <p>Round ID</p>
                                        <input className="black_input disabled" placeholder="Auto-Generated" disabled />
                                    </div>
                                    <div>
                                        <p>Round Number</p>
                                        <NumberFormat className={`black_input ${showError && roundDataError.roundNumber? 'error': ''}`}
                                            placeholder='Enter number'
                                            thousandSeparator={true}
                                            allowNegative={false}
                                            value={roundData.roundNumber}
                                            onValueChange={({ value }) => {
                                                setRoundData({...roundData, roundNumber: value});
                                            }}
                                            isAllowed={({floatValue}) => Number.isInteger(floatValue)}
                                        />
                                    </div>
                                </div>
                                <div className="div2 mt-4">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <div>           
                                            <p className={`${showError && roundDataError.startTime? 'error': ''}`}>Round Start Time</p>                             
                                            <MobileDateTimePicker  
                                                className="datePicker1"
                                                showTodayButton = {true}
                                                value={roundData.startTime}
                                                onChange={(newValue) => {
                                                    setRoundData({...roundData, startTime: newValue});
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />                                        
                                        </div>
                                        <div>    
                                            <p className={`${roundDataError.endTime? 'error': ''}`}>Round End Time</p>                                     
                                            <MobileDateTimePicker  
                                                showTodayButton
                                                value={roundData.endTime}
                                                onChange={(newValue) => {
                                                    setRoundData({...roundData, endTime: newValue});
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </div>
                                        <div>          
                                            <p>Total Time</p>                              
                                            <input className="white_input" readOnly
                                                value={secondsToDhms(duration / 1000)} 
                                            />                                     
                                        </div>
                                    </LocalizationProvider>
                                </div>                                        
                            </div>                                    
                            <div className="button_div">
                                <Link className="btn previous" to="/admin">Cancel</Link>
                                <button className="btn next" onClick={setIDAndTime}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="input_div">
                            {showError? (Object.values(tokenDataError)[0]? <Alert severity="error">{Object.values(tokenDataError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="div1">
                                    <div>
                                        <p>Token Amount</p>
                                        <input className={`black_input ${showError && tokenDataError.tokenAmount? 'error': ''}`} 
                                            value={tokenData.tokenAmount}
                                            onChange={e => setTokenData({...tokenData, tokenAmount: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <p>Reserved Price</p>
                                        <input className={`black_input ${showError && tokenDataError.ReservedPrice? 'error': ''}`} 
                                            value={tokenData.ReservedPrice}
                                            onChange={e => setTokenData({...tokenData, ReservedPrice: e.target.value})}
                                        />
                                    </div>                                    
                                </div>
                                <div className="div1 mt-4">
                                    <div>           
                                        <p>Total Token Amount</p>  
                                        <div className="token_div">
                                            <input className="white_input" value={totalTokenAmount} readOnly/>
                                            <div>
                                                {[5, 10, 20, 50].map(value => {
                                                    return (<button key={value} onClick={() => setTokenData({...tokenData, tokenAmount: String(totalTokenAmount * value / 100)})}>{value}%</button>);
                                                })}
                                            </div>
                                        </div>                                                               
                                    </div>
                                    <div>    
                                        <p>Previous Reserved Price</p>                                     
                                        <div className="token_div">
                                            <input className="white_input" value={prevReservedPrice+'$'} readOnly/>
                                            <div>
                                                {[5, 10, 20, 50].map(value => {
                                                    return (<button key={value} onClick={() => setTokenData({...tokenData, ReservedPrice: String(prevReservedPrice * value / 100)})}>{value}%</button>);
                                                })}
                                            </div>
                                        </div>                                     
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(1)}>Previous</button>
                                <button className="btn next" onClick={setTokenAmountPrice}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <div className="input_div">
                            {showError? (Object.values(avatarError)[0]? <Alert severity="error">{Object.values(avatarError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="avatar_div mt-4">
                                    <div className="row">
                                        <div className="avatarImage_div col-sm-4">
                                            <AvatarImage avatar={avatars[avatar?.value]} />
                                        </div>                                   
                                        <div className="select_div col-sm-4">
                                            <p>Avatar</p>
                                            <Select
                                                id="select_avatar"
                                                value={avatar}
                                                onChange={selected => {
                                                    setAuctionAvatar(selected);
                                                }}
                                                options={Avatars}
                                                styles={customSelectStyles}
                                                placeholder="Select Avatar"
                                            />
                                        </div> 
                                        <div className="select_div col-sm-4">
                                            <p>Avatar Token</p>
                                            <NumberFormat className={`black_input ${showError && avatarError.avatarToken? 'error': ''}`}
                                                placeholder='Enter number'
                                                thousandSeparator={true}
                                                allowNegative={false}
                                                value={avatarToken}
                                                onValueChange={({ value }) => {
                                                    setAvatarToken(value);
                                                }}
                                            />
                                        </div> 
                                    </div>                                                                      
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(2)}>Previous</button>
                                <button className="btn next" onClick={setAvatar}>Next</button>
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
                                                <p>Round ID</p>
                                                <p>********</p>
                                            </div>                                        
                                            <div className="item">
                                                <p>Round Number</p>
                                                <p>{roundData.roundNumber}</p>
                                            </div>                                        
                                            <div className="item">
                                                <p>Round Time</p>
                                                <p>{secondsToDhms(duration / 1000)}</p>
                                            </div>                                        
                                        </div>
                                        <div className="col-sm-5 col-6">
                                            <div className="item">
                                                <p>Token Amount</p>
                                                <p>{tokenData.tokenAmount}</p>
                                            </div>  
                                            <div className="item">
                                                <p>Reserved Price</p>
                                                <p>{tokenData.ReservedPrice}</p>
                                            </div>  
                                            <div className="item">
                                                <p>Avatar Token</p>
                                                <p>{avatarToken}</p>
                                            </div>  
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="item">
                                                <p>Avatar</p>
                                                <p>{avatar.label}</p>
                                            </div>  
                                            <div className="item">
                                                <AvatarImage avatar={avatars[avatar?.value]} />
                                            </div>  
                                        </div>
                                    </div>
                                </div>                                
                                <div className="for_phone">
                                    <div className="row">
                                        <div className="col-sm-3 mb-4">
                                            <div className="item">
                                                <AvatarImage avatar={avatars[avatar?.value]} />
                                            </div>  
                                            <div className="item text-center">
                                                <p>Avatar</p>
                                                <p>{avatar.label}</p>
                                            </div>                                              
                                        </div>
                                        <div className="col-sm-4 col-6 mb-4">
                                            <div className="item">
                                                <p>Round ID</p>
                                                <p>{roundData.roundId}</p>
                                            </div>
                                            <div className="item">
                                                <p>Round Number</p>
                                                <p>{roundData.roundNumber}</p>
                                            </div>                                        
                                            <div className="item">
                                                <p>Round Time</p>
                                                <p>{secondsToDhms(duration / 1000)}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 col-6">
                                            <div className="item">
                                                <p>Token Amount</p>
                                                <p>{tokenData.tokenAmount}</p>
                                            </div>
                                            <div className="item">
                                                <p>Reserved Price</p>
                                                <p>{tokenData.ReservedPrice}</p>
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
    }),
    input: provided => ({
        ...provided,
        color: 'white'
    }),
    placeholder: provided => ({
        ...provided,
        color: 'dimgrey'
    })
};