import React from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import Seo from "./../../components/seo";
import LayoutWithMenu from "../../components/admin/LayoutWithMenu";
import SocialTable from '../../components/admin/setting/SocialTable';
import GeoTable from "../../components/admin/setting/GeoTable";
import KYCTabPanel from "../../components/admin/setting/KYCTabPanel";
import AMLTabPanel from "../../components/admin/setting/AMLTabPanel";
import AvatarTabPanel from "../../components/admin/setting/AvatarTabPanel";
import UserTiersPanel from "../../components/admin/setting/UserTiersPanel";
import TasksTabPanel from "../../components/admin/setting/TasksTabPanel";

const socials = [
    {social: 'Facebook'},
    {social: 'Google'},
    {social: 'Twitter'},
    {social: 'LinkedIn'},
    {social: 'Apple'},
];

const geos = [
    {country: 'Iran'},    
    {country: 'USA'},    
    {country: 'North Korea'},    
    {country: 'Syria'},    
    {country: 'Ukraine'},
];

const IndexPage = () => {

    return (
        <>
            <Seo title="Admin Setting" />
            <main className="admin-setting-page">
                <LayoutWithMenu>
                    <div className="tabs_container">
                        <Tabs>
                            <TabList>
                                <Tab>Social</Tab>
                                <Tab>Geo</Tab>
                                <Tab>KYC</Tab>
                                <Tab>AML</Tab>
                                <Tab>Avatar</Tab>
                                <Tab>User Tiers</Tab>
                                <Tab>Tasks</Tab>
                            </TabList>
                            <TabPanel>
                                <SocialTable data={socials} />
                            </TabPanel>
                            <TabPanel>
                                <GeoTable data={geos} />
                            </TabPanel>
                            <TabPanel>
                                <KYCTabPanel />
                            </TabPanel>
                            <TabPanel>
                                <AMLTabPanel />
                            </TabPanel>
                            <TabPanel>
                                <AvatarTabPanel />
                            </TabPanel>
                            <TabPanel>
                                <UserTiersPanel />
                            </TabPanel>
                            <TabPanel>
                                <TasksTabPanel />
                            </TabPanel>
                        </Tabs>
                    </div>
                </LayoutWithMenu>
            </main>
        </>
    )
}

export default IndexPage;
