import React from 'react';
import styled from 'styled-components';
import TierComponent from './Tier_Component';
import { device } from '../../../../utilities/device';
import { Bronze, SilverCoin, GoldCoin, Platinum, Diamond } from '../../../../utilities/imgImport';

const tiers = [
    { image: Bronze, name: 'Bronze', threshold: 500 },
    { image: SilverCoin, name: 'Silver', threshold: 1500 },
    { image: GoldCoin, name: 'Gold', threshold: 3500 },
    { image: Platinum, name: 'Platinum', threshold: 6000 },
    { image: Diamond, name: 'Diamond', threshold: 10000 },
];

const UserTiersPanel = () => {
    return (
        <>
            <TableHead>
                <div className='name'>TIER NAME</div>
                <div className='threshold'>THRESHOLD</div>
            </TableHead>
            {tiers.map((tier, index) => {
                return <TierComponent key={index} tier={tier} />
            })}
        </>
    );
};

export default UserTiersPanel;

const TableHead = styled.div`
    height: 40px;
    border: 1px solid #464646;
    background-color: #464646;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    &>div {
        padding: 8px 2px;
    }
    &>div.name {width: 50%; padding-left: 16px;}
    &>div.threshold {width: 50%;}
    @media screen and (max-width: ${device['phone']}){
        &>div.threshold {width: 40%;}
    }
`;

