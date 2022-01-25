import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_KYC_Settings } from '../../../../redux/actions/kycSettingAction';
import AMLComponent from './AML_Component';
import Loading from './../../shared/Loading';

const AMLTabPanel = () => {
    const dispatch = useDispatch();
    const { kycSettings } = useSelector(state => state);
    const AML = kycSettings['AML'];

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function() {
            setLoading(true);
            await dispatch(fetch_KYC_Settings());
            setLoading(false);
        })();
    }, [dispatch]);

    return loading?
    <Loading />:
    (
        <>
            <AMLComponent icon="fe:upload" prop = 'withdraw' topic="Withdraw" thresholds={AML} />
            <AMLComponent icon="fe:download" prop = 'deposit' topic="Deposit" thresholds={AML} />
            <AMLComponent icon="uil:university" prop = 'bid' topic="Bid" thresholds={AML} />
            <AMLComponent icon="grommet-icons:basket" prop = 'direct' topic="Direct purchase round" thresholds={AML} />
        </>
    );
};

export default AMLTabPanel;