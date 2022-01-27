import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "gatsby"
import { Icon } from '@iconify/react';
import Select from 'react-select';
import Alert from '@mui/material/Alert';

import { countryList } from "../../../utilities/countryAlpha2";
import Seo from "../../../components/seo"
import LayoutForCreate from "../../../components/admin/LayoutForCreate";
import { add_Disallowed_Country } from "../../../redux/actions/geoLocationAction";

const Countries = countryList.map(item => {
    return {label: item.name, value: item["alpha-2"]};
});

const IndexPage = () => {
    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);
    const [pending, setPending] = useState(false);
    const [geoData, setGeoData] = useState({});

    const geoDataError = useMemo(() => {
        if(!geoData.value) return 'Please select Geo Location';
        return '';
    }, [geoData]);

    const handleSubmit = async () => {
        if(geoDataError) {
            setShowError(true);
            return;
        }
        setPending(true);
        const createData = {
            country: geoData.label,
            countryCode: geoData.value
        };
        await dispatch(add_Disallowed_Country(createData));
        setPending(false);
    };

    return (
        <>
            <Seo title="Create Geo" />
            <main className="create-geo-page">
                <LayoutForCreate>
                    <Link className="close" to="/admin"><Icon icon="codicon:chrome-close" /></Link>
                    <p className="subtitle">Add Geo Location</p>
                    <div className="input_div">
                        {showError? (geoDataError? <Alert severity="error">{geoDataError}</Alert>: <Alert severity="success">Success! Please click Save Button</Alert>): ''}
                        <p>Geo Location</p>
                        <Select
                            className={`black_input ${showError && geoDataError? 'error': ''}`}
                            value={geoData}
                            onChange={selected => setGeoData(selected)}
                            options={Countries}
                            styles={customSelectStyles}
                        />
                    </div>
                    <div className="button_div">
                        <Link className="btn previous" to="/admin/">Cancel</Link>
                        <button className="btn next" onClick={handleSubmit} disabled={pending}>{pending? 'Saving. . .': 'Save'}</button>
                    </div>
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