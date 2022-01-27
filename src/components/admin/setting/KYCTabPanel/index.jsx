import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_KYC_Settings } from '../../../../redux/actions/kycSettingAction';
import KYCComponent from './KYC_Component';
import Loading from './../../shared/Loading';

const KYCTabPanel = () => {
    const dispatch = useDispatch();
    const { kycSettings } = useSelector(state => state);
    const KYC = kycSettings['KYC'];

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
            <KYCComponent icon="fe:upload" prop = 'withdraw' topic="Withdraw" thresholds={KYC} />
            <KYCComponent icon="fe:download" prop = 'deposit' topic="Deposit" thresholds={KYC} />
            <KYCComponent icon="uil:university" prop = 'bid' topic="Bid" thresholds={KYC} />
            <KYCComponent icon="grommet-icons:basket" prop = 'direct' topic="Direct purchase round" thresholds={KYC} />
        </>
    )
};

export default KYCTabPanel;
