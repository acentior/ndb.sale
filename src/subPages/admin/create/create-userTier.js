import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "gatsby";
import { Icon } from '@iconify/react';
import parse from 'html-react-parser';
import NumberFormat from "react-number-format";

import Seo from "../../../components/seo"
import Stepper2 from "../../../components/admin/Stepper2";
import LayoutForCreate from "../../../components/admin/LayoutForCreate";

import Alert from '@mui/material/Alert';
import { create_New_UserTier } from "../../../redux/actions/userTierAction";


const IndexPage = () => {
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [pending, setPending] = useState(false);

    //------- Token Details and Validation
    // Token Details
    const [details, setDetails] = useState({
        level: '',
        name: '',
        point: ''
    });

    // Token Details Data Validation
    const detailsError = useMemo(() => {
        if(!details.name) return {name: 'Token Name is required'};
        if(!details.point) return {point: 'Token Threshold is required'};
        if(!details.level) return {level: 'Token Level is required'};
        return {};
    }, [details]);

    //-------- Token Icon and Validation
    // Token Icon
    const initialIconData = {filename: '', svg: ''};
    const [svgFile, setSvgFile] = useState(initialIconData);

    // Token Icon Validation
    const tokenIconError = useMemo(() => {
        if(!svgFile.filename) return 'Please upload the User Tier Icon';
        return '';
    }, [svgFile]);

    const selectTokenIcon = event => {
        event.preventDefault();
        const file = event.target.files[0];

        if(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const svg = e.target.result;
                if (file.type.indexOf('svg') > 0) {
                    setSvgFile({ ...svgFile, svg, filename: file.name});
                    setError('');
                } else {
                    setError('Only SVG file can be uploaded');
                    setSvgFile(initialIconData);
                }
            }
            reader.readAsText(file);
        }
    };
    // console.log(svgFile.svg)

    const setTokenDetailsData = () => {
        if(Object.values(detailsError)[0]) {
            setShowError(true);
            return;
        }
        setCurrentStep(2);
        setShowError(false);
    };

    const setTokenIconData = () => {
        if(tokenIconError) {
            setShowError(true);
            return;
        }
        setCurrentStep(3);
        setShowError(false);
    };

    const handleSubmit = async () => {
        setPending(true);
        await dispatch(create_New_UserTier({
            level: Number(details.level),
            name: details.name,
            point: Number(details.point),
            svg: svgFile.svg
        }));
        setPending(false);
    };

    return (
        <>
            <Seo title="Create Email" />
            <main className="create-userTier-page">
                <LayoutForCreate>
                    <Link className="close" to="/admin"><Icon icon="codicon:chrome-close" /></Link>
                    <p className="subtitle">Add User Tier</p>
                    <Stepper2 currentStep={currentStep} texts={['Details', 'Icon']}/>
                    {currentStep === 1 && (
                        <>
                            <div className="input_div">
                                {showError? (Object.values(detailsError)[0]? <Alert severity="error">{Object.values(detailsError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="div1">
                                    <div>
                                        <p>Tier Name</p>
                                        <input className={`black_input ${showError && detailsError.name? 'error': ''}`}
                                            value={details.name}
                                            onChange={e => setDetails({...details, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <p>Tier Threshold</p>
                                        <NumberFormat className={`black_input ${showError && detailsError.point? 'error': ''}`}
                                            placeholder='Enter number'
                                            thousandSeparator={true}
                                            allowNegative={false}
                                            value={details.point}
                                            onValueChange={values => setDetails({...details, point: values.value})}
                                        />
                                    </div>
                                    <div>
                                        <p>Tier Level</p>
                                        <NumberFormat className={`black_input ${showError && detailsError.level? 'error': ''}`}
                                            placeholder='Enter number'
                                            thousandSeparator={true}
                                            allowNegative={false}
                                            value={details.level}
                                            onValueChange={values => setDetails({...details, level: values.value})}
                                        />
                                    </div>
                                </div>
                            </div>                                    
                            <div className="button_div">
                                <Link className="btn previous" to="/admin">Cancel</Link>
                                <button className="btn next" onClick={setTokenDetailsData}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="input_div row">
                                <div className="col-sm-6">
                                    {showError? (tokenIconError? <Alert severity="error">{tokenIconError}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                    {error? <Alert severity="error">{error}</Alert>: ''}
                                    <div>
                                        <p>Upload User Tier Icon</p>
                                        <div className="upload">
                                            <p className="file_name" title={svgFile.filename}>{svgFile.filename}</p>
                                            <p className="upload_btn">
                                                <label htmlFor="avatar">
                                                    <span><Icon icon="lucide:upload" /></span>
                                                </label>
                                                <input type="file" name="avatar" id="avatar" accept=".svg" hidden 
                                                    onChange={selectTokenIcon}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="preview-icon">
                                        <div>
                                            {parse(svgFile.svg)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(1)}>Previous</button>
                                <button className="btn next" onClick={setTokenIconData}>Next</button>
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <div className="input_div">
                                {showError? (tokenIconError? <Alert severity="error">{tokenIconError}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>): ''}
                                <div className="row">
                                    <div className="col-sm-4 mb-4">
                                        <div className="preview-icon">
                                            <div style={{border: 'none'}}>
                                                {parse(svgFile.svg)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-5 mb-3">
                                        <div className="item">
                                            <p>User Tier Name</p>
                                            <p className="desc">{details.name}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="item">
                                            <p>User Tier Threshold</p>
                                            <p className="desc">{details.point}</p>
                                        </div>  
                                        <div className="item mt-3">
                                            <p>User Tier Level</p>
                                            <p className="desc">{details.level}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(2)}>Previous</button>
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