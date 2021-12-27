import React from 'react';
import AMLComponent from './AML_Component';

const contents = {
    withdraw: 'not required',
    deposit: 'not required',
    bid: 'threshold: 100 000',
    direct_purchase: 'not required',
};

const AMLTabPanel = () => {
    return (
        <>
            <AMLComponent icon="fe:upload" topic="Withdraw" content={contents.withdraw} />
            <AMLComponent icon="fe:download" topic="Deposit" content={contents.deposit} />
            <AMLComponent icon="uil:university" topic="Bid" content={contents.bid} />
            <AMLComponent icon="grommet-icons:basket" topic="Direct purchase round" content={contents.direct_purchase} />
        </>
    );
};

export default AMLTabPanel;