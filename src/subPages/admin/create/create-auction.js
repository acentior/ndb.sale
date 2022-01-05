import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import { Icon } from '@iconify/react';
import validator from "validator";

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

const IndexPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const totalTokenAmount = 100000000;
    const prevReservedPrice = 5000;

    //------- Round Data and Validation
    // Round Data
    const initialRoundData = { roundId: '', roundNumber: '', startTime: Date.now(), endTime: Date.now() };
    const [roundData, setRoundData] = useState(initialRoundData);
    const duration = useMemo(() => {
        if(!roundData.startTime || !roundData.endTime) return '';
        if(new Date(roundData.endTime) <= new Date(roundData.startTime)) return '';
        return new Date(roundData.endTime) - new Date(roundData.startTime) + 1000;
    }, [roundData]);

    // Round Data Validation
    let roundDataError = {};
    roundDataError = useMemo(() => {
        if(!roundData.roundId) return {roundId: 'Round ID is required'};
        if(!roundData.roundNumber) return {roundNumber: 'Round Number is required'};
        if(!validator.isNumeric(roundData.roundNumber)) return {roundNumber: 'Round Number must be number'};
        if(!roundData.startTime) return {startTime: 'Round Start Time is required'};
        if(!validator.isDate(new Date(roundData.startTime))) return {startTime: 'Round Start Time is invalid'};        
        if(!roundData.endTime) return {endTime: 'Round End Time is required'};
        if(!validator.isDate(new Date(roundData.endTime))) return {endTime: 'Round End Time is invalid'};
        if(Math.round((new Date(roundData.endTime) - new Date(roundData.startTime))) <= 0) return {endTime: 'Round End Time must be after Start Time'};
        return {};
    }, [roundData]);    

    //-------- Token Data and Validation
    // Token Data
    const initialTokenData = { tokenAmount: '', ReservedPrice: '', totalTokenAmount: '', prevReservedPrice: '' };
    const [tokenData, setTokenData] = useState(initialTokenData);

    // Token Data Validation
    let tokenDataError = {};
    tokenDataError = useMemo(() => {
        if(!tokenData.tokenAmount) return {tokenAmount: 'Token Amount is required'};
        if(!validator.isNumeric(tokenData.tokenAmount)) return {tokenAmount: 'Token Amount must be number'};
        if(!tokenData.ReservedPrice) return {ReservedPrice: 'Reserved Price is required'};
        if(!validator.isNumeric(tokenData.ReservedPrice)) return {ReservedPrice: 'Reserved Price must be number'};
        return {};
    }, [tokenData]);

    //--------- Avatar Data
    const avatars = [
        { value: 'tesla.svg', label: 'Tesla' },
        { value: 'volta.svg', label: 'Volta' },
        { value: 'meitner.svg', label: 'Meitner' },
        { value: 'johnson.svg', label: 'Johnson' },
        { value: 'fermi.svg', label: 'Fermi' },
        { value: 'failla.svg', label: 'Failla' },
        { value: 'curie.svg', label: 'Curie' },
        { value: 'cruto.svg', label: 'Cruto' },
    ];
    const [avatar, setAuctionAvatar] = useState(avatars[0]);
    


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
        setCurrentStep(4);
    };

    const handleSubmit = () => {
        alert('Created Auction Successfully')
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
                                        <input className={`black_input ${showError && roundDataError.roundId? 'error': ''}`}
                                            value={roundData.roundId} 
                                            onChange={e => setRoundData({...roundData, roundId: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <p>Round Number</p>
                                        <input  className={`black_input ${showError && roundDataError.roundNumber? 'error': ''}`}
                                            value={roundData.roundNumber} 
                                            onChange={e => setRoundData({...roundData, roundNumber: e.target.value})}
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
                                <div className="avatar_div">
                                    <div className="row">
                                        <div className="image_div col-sm-4">
                                            <img src={`/avatars/${avatar.value}`} alt={avatar.value} />  
                                        </div>                                   
                                        <div className="select_div col-sm-8">
                                        <p>Avatar</p>
                                        <Select
                                            id="select_avatar"
                                            value={avatar}
                                            onChange={selected => {
                                                setAuctionAvatar(selected);
                                            }}
                                            options={avatars}
                                            styles={customSelectStyles}

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
                                        <div className="col-sm-3">
                                            <div className="item">
                                                <p>Avatar</p>
                                                <p>{avatar.label}</p>
                                            </div>  
                                            <div className="item">
                                                <img src={`/avatars/${avatar.value}`} alt={avatar.label} /> 
                                            </div>  
                                        </div>
                                    </div>
                                </div>                                
                                <div className="for_phone">
                                    <div className="row">
                                        <div className="col-sm-3 mb-4">
                                            <div className="item">
                                                <img src={`/avatars/${avatar.value}`} alt={avatar.label} /> 
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
                                <button className="btn next" onClick={handleSubmit}>Save</button>
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