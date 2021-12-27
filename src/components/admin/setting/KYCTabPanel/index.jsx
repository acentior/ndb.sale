import React from 'react';
import KYCComponent from './KYC_Component';

const contents = {
    withdraw: "threshold: 1,000",
    deposit: "not required",
    bid: "threshold: 2,000",
    direct_purchase: "required",
}

const KYCTabPanel = () => {
    return (
        <>
            <KYCComponent icon="fe:upload" topic="Withdraw" content={contents.withdraw} />
            <KYCComponent icon="fe:download" topic="Deposit" content={contents.deposit} />
            <KYCComponent icon="uil:university" topic="Bid" content={contents.bid} />
            <KYCComponent
                icon="grommet-icons:basket"
                topic="Direct purchase round"
                content={contents.direct_purchase}
            />
        </>
    )
}

export default KYCTabPanel
