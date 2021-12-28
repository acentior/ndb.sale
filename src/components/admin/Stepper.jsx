import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const StepperContainer = ({currentStep = 1, texts = []}) => {
    return (
        <Stepper>
            <div className="step">
                <StepLine step={currentStep + 1} />
                <div>
                    {currentStep === 1? <Running />: <Success><Icon icon="ci:check-bold" /></Success>}
                    <StepText step={currentStep + 1}>{texts[0]}</StepText>  
                </div>
            </div>
            <div className="step">
                <StepLine step={currentStep}/>
                <div>
                    {currentStep === 1? <StandBy />: (currentStep === 2? <Running />: <Success><Icon icon="ci:check-bold" /></Success>)}
                    <StepText step={currentStep}>{texts[1]}</StepText>
                </div>
            </div>
            <div className="step">
                <StepLine step={currentStep - 1}/>
                <div>
                    {currentStep <=2? <StandBy />: (currentStep === 3? <Running />: <Success><Icon icon="ci:check-bold" /></Success>)}
                    <StepText step={currentStep - 1}>{texts[2]}</StepText>
                </div>                                    
            </div>
        </Stepper>
    );
};

export default StepperContainer;


const Stepper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 0;
    &>div.step {
        width: 33%;
        margin: 0 0.2%;
        height: 50px;
        div {
            display: flex;
            align-items: center;
        }
        @media screen and (max-width: 768px) {
            margin: 0 1%;
        }
    }
`;

const StepLine = styled.div`
    border: 2px solid ${props => {
            if(props.step <= 1) {
                return "dimgrey";
            } else if(props.step === 2) {
                return "#ffffff";
            } else {
                return "#23c865"
            }
        }
    };
    margin-bottom: 7px;
    transition: 0.3s;
`;

const StandBy = styled.span`
    border: 2px solid lightgray;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
    font-size: 15px;
    color: transparent;
    text-align: center;
    @media screen and (max-width: 768px) {
        border: 1px solid lightgray;
        font-size: 12px;
        width: 15px;
        height: 15px;
    }
`;

const Success = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
    font-size: 15px;
    background-color: #23c865;
    color: #000000;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 12px;
        width: 15px;
        height: 15px;
        line-height: 15px;
    }
`;

const Running = styled.span`
    border: 7px solid #ffffff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
    font-size: 15px;
    color: transparent;
    text-align: center;
    @media screen and (max-width: 768px) {
        border: 5px solid #ffffff;
        font-size: 12px;
        width: 15px;
        height: 15px;
    }
`;

const StepText = styled.span`
    margin-left: 8px;
    color: ${props => {
        return props.step > 1? "#ffffff": "dimgrey";
    }};
    font-size: 14px;
    font-weight: 500;
    @media screen and (max-width: 768px) {
        font-size: 12px;
    }
`