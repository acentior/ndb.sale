import React from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import Seo from "./../../components/seo";
import LayoutWithMenu from "../../components/admin/LayoutWithMenu";
import PaginationBar from './../../components/admin/PaginationBar';
import UserTable from "../../components/admin/users/UserTable";
import BidTable from "../../components/admin/users/BidTable";
import WalletTable from "../../components/admin/users/WalletTable";
import FiatTable from "../../components/admin/users/FiatTable";
import KYBTable from "../../components/admin/users/KYBTable";

const users = [
    {name: 'Amy Matthews', avatar: 'Tesla.12', email: 'amy.matthers@mail.com', phone: '+32 932 429 32', password: '********', country: 'USA', privilege: 'user', 
    ext_wallet_provider: 'ext_wallet_provider', ext_wallet_address: 'ext_wallet_address', terms_signed: 'terms_signed', birth: '1988/12/12', currency: 'Silver'},
    {name: 'Amira Kandovsky', avatar: 'Voltapancake', email: 'amira.k@mail.com', phone: '+32 932 429 32', password: '********', country: 'FRA', privilege: 'Admin', 
    ext_wallet_provider: 'ext_wallet_provider', ext_wallet_address: 'ext_wallet_address', terms_signed: 'terms_signed', birth: '1988/12/12', currency: 'Silver'},
    {name: 'Bernard Lane', avatar: 'CutieCurry', email: 'amy.matthers@mail.com', phone: '+32 932 429 32', password: '********', country: 'USA', privilege: 'user', 
    ext_wallet_provider: 'ext_wallet_provider', ext_wallet_address: 'ext_wallet_address', terms_signed: 'terms_signed', birth: '1988/12/12', currency: 'Silver'},
    {name: 'Joseph Martini', avatar: 'Johnson Johnson', email: 'joseph1988@mail.com', phone: '+32 932 429 32', password: '********', country: 'GER', privilege: 'user', 
    ext_wallet_provider: 'ext_wallet_provider', ext_wallet_address: 'ext_wallet_address', terms_signed: 'terms_signed', birth: '1988/12/12', currency: 'Silver'},
    {name: 'Tom Jager', avatar: 'Cruto1431', email: 'Hunter999@mail.com', phone: '+32 932 429 32', password: '********', country: 'SWE', privilege: 'user', 
    ext_wallet_provider: 'ext_wallet_provider', ext_wallet_address: 'ext_wallet_address', terms_signed: 'terms_signed', birth: '1988/12/12', currency: 'Silver'},
];

const bids = [
    {name: 'Amy Matthews', avatar: 'Tesla.12', status: 'active' },
    {name: 'Amira Kandovsky', avatar: 'Voltapancake', status: 'pending' },
    {name: 'Bernard Lane', avatar: 'CutieCurry', status: 'pending' },
    {name: 'Joseph Martini', avatar: 'Johnson Johnson', status: 'active' },
    {name: 'Tom Jager', avatar: 'Cruto1431', status: 'active' },
];

const wallets = [
    {name: 'Amy Matthews', avatar: 'Tesla.12' },
    {name: 'Amira Kandovsky', avatar: 'Voltapancake' },
    {name: 'Bernard Lane', avatar: 'CutieCurry' },
    {name: 'Joseph Martini', avatar: 'Johnson Johnson' },
    {name: 'Tom Jager', avatar: 'Cruto1431' },
];

const fiats = [
    {name: 'Amy Matthews', avatar: 'Tesla.12', status: 'complete' },
    {name: 'Amira Kandovsky', avatar: 'Voltapancake', status: 'pending' },
    {name: 'Bernard Lane', avatar: 'CutieCurry', status: 'pending' },
    {name: 'Joseph Martini', avatar: 'Johnson Johnson', status: 'complete' },
    {name: 'Tom Jager', avatar: 'Cruto1431', status: 'complete' },
];

const IndexPage = () => {
    return (
        <>
            <Seo title="Admin Users" />
            <main className="admin-users-page">
                <LayoutWithMenu>
                    <div className="tabs_container">
                        <Tabs>
                            <TabList>
                                <Tab>User</Tab>
                                <Tab>Bid</Tab>
                                <Tab>Wallet</Tab>
                                <Tab>Fiat</Tab>
                                <Tab>KYB</Tab>
                            </TabList>
                            <TabPanel>
                                <UserTable data={users} />
                                <PaginationBar />
                            </TabPanel>
                            <TabPanel>
                                <BidTable data={bids} />
                                <PaginationBar />
                            </TabPanel>
                            <TabPanel>
                                <WalletTable data={wallets} />
                                <PaginationBar />
                            </TabPanel>
                            <TabPanel>
                                <FiatTable data={fiats} />
                                <PaginationBar />
                            </TabPanel>
                            <TabPanel>
                                <KYBTable />
                                <PaginationBar />
                            </TabPanel>
                        </Tabs>
                    </div>                    
                </LayoutWithMenu>
            </main>
        </>
    )
}

export default IndexPage
