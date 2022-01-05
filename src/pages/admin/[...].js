import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";
import Loading from "../../components/common/Loading";

const Dashboard = lazy(() => import("./../../subPages/admin/dashboard"));
const Rounds = lazy(() => import("./../../subPages/admin/rounds"));
const Users = lazy(() => import("./../../subPages/admin/users"));
const Airdrop = lazy(() => import("./../../subPages/admin/airdrop"));
const Setting = lazy(() => import("./../../subPages/admin/setting"));
const CreateAuction = lazy(() => import("./../../subPages/admin/create/create-auction"));
const CreateDirectPurchase = lazy(() => import("./../../subPages/admin/create/create-direct-purchase"));
const CreateAvatar = lazy(() => import("./../../subPages/admin/create/create-avatar"));
const CustomizeAvatar = lazy(() => import("./../../subPages/admin/create/customize-avatar"));
const CreateEmail = lazy(() => import("./../../subPages/admin/create/create-email"));
const NotFound = lazy(() => import("./../404"));

const App = () => {
    const isSSR = typeof window === "undefined";
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
                        <CreateAvatar path="/create/avatar" />
                        <CustomizeAvatar path="/create/customize-avatar" />
                        <CreateEmail path="/create/email" />
                        <NotFound default />
                    </Router>
                </Suspense>
            )}
        </>
    )
};
export default App;
