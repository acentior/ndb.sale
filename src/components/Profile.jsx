import Select, { useStateManager } from "react-select"
import Loading from "./common/Loading"
import { Link, navigate } from "gatsby"
import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import Header from "../components/header"
import { ROUTES } from "../utilities/routes"
import SignOutTab from "./profile/sign-out-tab"
import { profile_tabs } from "../utilities/staticData"
import { Bronze } from "../utilities/imgImport"
import TwoFactorModal from "./profile/two-factor-modal"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { GET_USER } from "../apollo/graghqls/querys/Auth"
import ConnectWalletTab from "./profile/connect-wallet-tab"
import React, { useEffect, useState } from "react"
import DeleteAccountModal from "./profile/delete-account-modal"
import { setCurrentAuthInfo } from "../redux/actions/authAction"
import NotificationRecent from "./profile/notification-recent-switch"
import NotificationSetting from "./profile/notification-setting-switch"
import ProfileChangePasswordModal from "./profile/change-password-modal"
import TierDetailsTab from "./profile/tier-details-tab"
import Avatar from "../components/dress-up/avatar"
import { GET_USER_TIERS } from "./profile/profile-queries"
const Profile = () => {
    const dispatch = useDispatch()
    const [userDataLoading, setUserDataLoading] = useState(true)
    const [userTiersLoading, setUserTiersLoading] = useState(true)
    const [tabIndex, setTabIndex] = useState(0)
    const [displayName, setDisplayName] = useState("")
    const [userTiersData, setUserTiersData] = useState(null)
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [currentProfileTab, setCurrentProfileTab] = useState(profile_tabs[0])
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
    // Webservice
    const { data: userData, refetch } = useQuery(GET_USER, {
        onCompleted: (res) => {
            if (userData.getUser.avatar) {
                const { prefix, name } = userData.getUser.avatar
                if (prefix && name) {
                    setDisplayName(prefix + "." + name)
                    return setUserDataLoading(false)
                } else return navigate(ROUTES.selectFigure)
            }
            return navigate(ROUTES.selectFigure)
        },
        fetchPolicy: "network-only",
    })
    const { data: userTiers } = useQuery(GET_USER_TIERS, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setUserTiersData(userTiers.getUserTiers)
            return setUserTiersLoading(false)
        },
    })

    const loadingPage = userDataLoading || userTiersLoading
    // Containers
    const user = userData?.getUser
    const twoStep = user?.security
        ? user.security.filter((f) => f.tfaEnabled).map((m) => m.authType)
        : []

    const currentTier = userTiersData?.filter((item) => item?.level === user?.tierLevel)
    const nextTier = userTiersData?.filter((item) => item?.level === user?.tierLevel + 1)

    // Methods
    const handleProfileTab = (value) => {
        setCurrentProfileTab(value)
        setTabIndex(value.index)
    }

    const getSecurityStatus = (key) =>
        user?.security?.find((f) => f?.authType === key && f?.tfaEnabled)

    const Tfa_Config = ({ title, method }) => {
        const config = !!getSecurityStatus(method)

        return (
            <>
                <div className={`status ${config ? "active" : "deactive"}`}></div>
                <div className="security-item">
                    <p className="security-name">{title}</p>

                    {!config && (
                        <p
                            className="txt-green security-link"
                            onClick={() => setIs2FAModalOpen(true)}
                            onKeyDown={() => setIs2FAModalOpen(true)}
                            role="presentation"
                        >
                            setup
                        </p>
                    )}
                </div>
                {config && (
                    <div className="security-item-disable">
                        <p
                            className="txt-red security-link"
                            onClick={() => setIs2FAModalOpen(true)}
                            onKeyDown={() => setIs2FAModalOpen(true)}
                            role="presentation"
                        >
                            disable
                        </p>
                    </div>
                )}
            </>
        )
    }

    useEffect(() => dispatch(setCurrentAuthInfo(user)), [dispatch, user])
    if (loadingPage) return <Loading />
    else
        return (
            <main className="profile-page">
                <TwoFactorModal
                    is2FAModalOpen={is2FAModalOpen}
                    setIs2FAModalOpen={setIs2FAModalOpen}
                    email={user?.email}
                    phone={user?.phone}
                    twoStep={twoStep}
                    onResult={(res) => {
                        if (res) {
                            refetch()
                        }
                    }}
                />
                <Header />
                <section className="container position-relative h-100">
                    <div className="row">
                        <div className="col-lg-3 profile-page__left border-end border-white">
                            <div className="user-info">
                                <div className="my-5 user-info__avatar">
                                    <Avatar />
                                </div>
                                <p className="user-info__name">
                                    {currentTier?.length > 0 ? (
                                        <div
                                            className="me-3"
                                            dangerouslySetInnerHTML={{
                                                __html: currentTier[0]?.svg,
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {displayName}
                                </p>
                                <p className="silver-cnt">
                                    {nextTier.length > 0 &&
                                        nextTier[0].point -
                                            user.tierPoint +
                                            "p to " +
                                            nextTier[0].name}
                                </p>
                                <div className="timeframe-bar mt-1">
                                    <div
                                        className="timeleft"
                                        style={{
                                            width: `${(user.tierPoint / nextTier[0].point) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <Tabs className="profile-tab" onSelect={(index) => setTabIndex(index)}>
                                <TabList>
                                    {profile_tabs.map((item, idx) => (
                                        <Tab key={idx}>{item.label}</Tab>
                                    ))}
                                </TabList>
                                <Select
                                    options={profile_tabs}
                                    value={currentProfileTab}
                                    onChange={(v) => handleProfileTab(v)}
                                    className="profile-tab__select mb-3"
                                />
                                <TabPanel>0</TabPanel>
                                <TabPanel>1</TabPanel>
                                <TabPanel>2</TabPanel>
                                <TabPanel>3</TabPanel>
                            </Tabs>
                        </div>
                        <div className="col-lg-9 profile-page__right">
                            {tabIndex === 0 && (
                                <>
                                    <Tabs className="detail-tab">
                                        <TabList>
                                            <Tab>
                                                <div className="pt-3">account detaiLs</div>
                                            </Tab>
                                            <Tab>
                                                <div className="pt-3">tier Details</div>
                                            </Tab>
                                        </TabList>
                                        <TabPanel>
                                            <div className="account-details">
                                                <div className="account-detail">
                                                    <div className="row w-100 mx-auto">
                                                        <div className="col-6 br">Display name</div>
                                                        <div className="col-6 text-end text-sm-start">
                                                            {displayName}
                                                        </div>
                                                    </div>
                                                    <div className="row w-100 mx-auto">
                                                        <div className="col-6 br">email</div>
                                                        <div className="col-6 text-end text-sm-start text-lowercase">
                                                            {user && user?.email}
                                                        </div>
                                                    </div>
                                                    <div className="row w-100 mx-auto change-password">
                                                        <div className="col-6 br">Password</div>
                                                        <div className="col-6 justify-content-sm-between justify-content-end">
                                                            <p>********</p>
                                                            <button
                                                                className="btn-primary"
                                                                onClick={() =>
                                                                    setIsPasswordModalOpen(true)
                                                                }
                                                            >
                                                                Change Password
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="account-security">
                                                    <h4>Increase your account security</h4>
                                                    <div className="row w-100 mx-auto">
                                                        <div className="col-sm-6 br">
                                                            <Tfa_Config
                                                                title="2FA Email"
                                                                method="email"
                                                            />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div
                                                                className={`status ${
                                                                    user?.verify?.kycVerified
                                                                        ? "active"
                                                                        : "deactive"
                                                                }`}
                                                            ></div>
                                                            <div className="security-item">
                                                                <p className="security-name">
                                                                    KYC Verificatoin
                                                                </p>
                                                                {user?.verify.kybVerified &&
                                                                user?.verify.kycVerified ? (
                                                                    <p className="txt-green">
                                                                        verified
                                                                    </p>
                                                                ) : (
                                                                    <Link
                                                                        to={ROUTES.verifyId}
                                                                        className="security-link"
                                                                    >
                                                                        setup
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6 br">
                                                            <Tfa_Config
                                                                title="2FA Mobile"
                                                                method="phone"
                                                            />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <Tfa_Config
                                                                title="2FA Authentication app"
                                                                method="app"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <TierDetailsTab />
                                        </TabPanel>
                                    </Tabs>
                                    <div className="verify-delete mt-3 pb-5">
                                        <p>
                                            <Link to="/" className="get-verify">
                                                Get verified.
                                            </Link>{" "}
                                            To buy, deposit or withdraw the account should be
                                            verified
                                        </p>
                                        <p
                                            className="delete-account-link"
                                            onClick={() => setIsDeleteAccountModalOpen(true)}
                                            onKeyDown={() => setIsDeleteAccountModalOpen(true)}
                                            role="presentation"
                                        >
                                            Delete account
                                        </p>
                                    </div>
                                </>
                            )}
                            {tabIndex === 1 && (
                                <div className="notification-set">
                                    <Tabs className="notification-tab">
                                        <TabList>
                                            <Tab>
                                                <div className="pt-3 pb-2">Recent</div>
                                            </Tab>
                                            <Tab>
                                                <div className="py-3 pb-2">Setup</div>
                                            </Tab>
                                        </TabList>
                                        <TabPanel>
                                            <NotificationRecent />
                                        </TabPanel>
                                        <TabPanel>
                                            <NotificationSetting />
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            )}
                            {tabIndex === 2 && (
                                <div className="connect-wallet">
                                    <h4 className="pt-3">select wallet</h4>
                                    <ConnectWalletTab />
                                </div>
                            )}
                            {tabIndex === 3 && <SignOutTab />}
                        </div>
                    </div>
                </section>
                <ProfileChangePasswordModal
                    isPasswordModalOpen={isPasswordModalOpen}
                    setIsPasswordModalOpen={setIsPasswordModalOpen}
                />
                <DeleteAccountModal
                    isDeleteAccountModalOpen={isDeleteAccountModalOpen}
                    setIsDeleteAccountModalOpen={setIsDeleteAccountModalOpen}
                />
            </main>
        )
}

export default Profile
