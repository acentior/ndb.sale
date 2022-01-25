import React, { Suspense, lazy } from "react";
import { navigate } from "gatsby";
import { useSelector } from "react-redux";
import { Router } from "@reach/router";
import Loading from "../../components/common/Loading";
import AlarmModal from './../../components/admin/AlarmModal';

const Dashboard = lazy(() => import("./../../subPages/admin/dashboard"));
const Rounds = lazy(() => import("./../../subPages/admin/rounds"));
const Users = lazy(() => import("./../../subPages/admin/users"));
const Airdrop = lazy(() => import("./../../subPages/admin/airdrop"));
const Setting = lazy(() => import("./../../subPages/admin/setting"));
const CreateAuction = lazy(() => import("./../../subPages/admin/create/create-auction"));
const CreateDirectPurchase = lazy(() => import("./../../subPages/admin/create/create-direct-purchase"));
const CreateUser = lazy(() => import("./../../subPages/admin/create/create-user"));
const CreateUserTier = lazy(() => import("./../../subPages/admin/create/create-userTier"));
const CreateAvatar = lazy(() => import("./../../subPages/admin/create/create-avatar"));
const CustomizeAvatar = lazy(() => import("./../../subPages/admin/create/customize-avatar"));
const CreateEmail = lazy(() => import("./../../subPages/admin/create/create-email"));
const CreateToken = lazy(() => import("./../../subPages/admin/create/create-token"));
const CreateGeoLocation = lazy(() => import("./../../subPages/admin/create/create-geo-location"));
const NotFound = lazy(() => import("./../404"));

const App = () => {
    const isSSR = typeof window === "undefined";
    const { user } = useSelector(state => state.auth);
    const isAdmin = user.role?.includes('ROLE_ADMIN');
    
    // if(isAdmin) {
        return (
            <>
                {!isSSR && (
                    <Suspense fallback={<Loading />}>
                        <Router basepath="admin">
                            <Dashboard path="/" />
                            <Rounds path="/rounds" />
                            <Users path="/users" />
                            <Airdrop path="/airdrop" />
                            <Setting path="/setting" />
                            <CreateAuction path="/create/auction" />
                            <CreateDirectPurchase path="/create/direct-purchase" />
                            <CreateUser path="/create/user" />
                            <CreateUserTier path="/create/user-tier" />
                            <CreateAvatar path="/create/avatar" />
                            <CustomizeAvatar path="/create/customize-avatar" />
                            <CreateEmail path="/create/email" />
                            <CreateToken path="/create/token" />
                            <CreateGeoLocation path="/create/geo-location" />
                            <NotFound default />
                        </Router>
                    </Suspense>
                )}
                <AlarmModal />
            </>
        );
    // } else {
    //     alert('You are not permitted to this section');
    //     return null;
    // }
};
export default App;
