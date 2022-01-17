import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import TokenDataRow from './TokenDataRow';
import { width } from './columnWidth';
import { DAI, ETH, BTC, BCH, USDC } from '../../../../utilities/imgImport';
import SearchBar from '../../shared/SearchBar';

const tokens = [
    {name: 'Ethereum', symbol: 'ETH', network: 'ERC20', address: '0x4206931337dc273a6', svg: ETH},
    {name: 'Bitcoin', symbol: 'BTC', network: 'ERC20', address: '0x4206931337dc273a6', svg: BTC},
    {name: 'Bitcoin Cash', symbol: 'BCH', network: 'ERC20', address: '0x4206931337dc273a6', svg: BCH},
    {name: 'Dai', symbol: 'DAI', network: 'ERC20', address: '0x4206931337dc273a6', svg: DAI},
    {name: 'USD Coin', symbol: 'USDC', network: 'ERC20', address: '0x4206931337dc273a6', svg: USDC},
];

const TokenTable = () => {
    return (
        <>
            <SearchBar />
            <TableHead>
                <div className='image'> </div>
                <div className='name'>Token Name</div>
                <div className='symbol'>Symbol</div>
                <div className='network'>Network</div>
                <div className='address'>Address</div>
                <div className='edit'> </div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Token Data</div>
            </TableHeadForMobile>
            <TableBody>
                {tokens.map((datum, index) => {
                    return <TokenDataRow key={index} datum={datum} index={index} />
                })}
            </TableBody>
        </>
    )
};

export default TokenTable;

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
    &>div.image {width: ${width.image};}
    &>div.name {width: ${width.name};}
    &>div.symbol {width: ${width.symbol};}
    &>div.network {width: ${width.network};}
    &>div.address {width: ${width.address};}
    &>div.edit {width: ${width.edit};}

    @media screen and (max-width: ${device['phone']}){
        display: none;
    }    
`;

const TableHeadForMobile = styled.div`
    height: 40px;
    border: 1px solid #464646;
    background-color: #464646;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    &>div.name {padding-left: 16px;}
    display: none;
    @media screen and (max-width: ${device['phone']}){
        display: flex;
    }
`;

const TableBody = styled.div`
    border-left: 1px solid #464646;
    border-right: 1px solid #464646;
`;