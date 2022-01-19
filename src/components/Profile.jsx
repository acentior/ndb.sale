import Select from "react-select"
import Loading from "./common/Loading"
import { Link, navigate } from "gatsby"
import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import Header from "../components/header"
import { ROUTES } from "../utilities/routes"
import SignOutTab from "./profile/sign-out-tab"
import { profile_tabs } from "../utilities/staticData"
import { Tesla, Bronze } from "../utilities/imgImport"
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

const Profile = () => {
    // Containers
    const { data: userData, refetch } = useQuery(GET_USER, {
        onCompleted: () => {
            if (userData.getUser.avatar) {
                const { prefix, name } = userData.getUser.avatar
                if (prefix && name) {
                    setDisplayName(prefix + "." + name)
                    return setLoadingPage(false)
                } else return navigate(ROUTES.selectFigure)
            }
            return navigate(ROUTES.selectFigure)
        },
        fetchPolicy: "network-only",
    })
    const user = userData?.getUser
    const twoStep = user?.security
        ? user.security.filter((f) => f.tfaEnabled).map((m) => m.authType)
        : []

    const dispatch = useDispatch()
    const [tabIndex, setTabIndex] = useState(0)
    const [displayName, setDisplayName] = useState("")
    const [loadingPage, setLoadingPage] = useState(true)
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [currentProfileTab, setCurrentProfileTab] = useState(profile_tabs[0])
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)

    // Methods
    const handleProfileTab = (value) => {
        setCurrentProfileTab(value)
        setTabIndex(value.index)
    }

    const getSecurityStatus = (key) => user?.userSecurity?.find((f) => f?.key === key)?.value

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
                    <div className="row mt-lg-2">
                        <div className="col-lg-3 profile-page__left border-end border-white">
                            <div className="user-info">
                                <img className="user-info__avatar" src={Tesla} alt="tesla" />
                                <p className="user-info__name">
                                    <img src={Bronze} alt="bronze" className="me-3" />
                                    {displayName}
                                </p>
                                <p className="silver-cnt">500p to Silver</p>
                                <div className="timeframe-bar mt-1">
                                    <div
                                        className="timeleft"
                                        style={{
                                            width: "25%",
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
                                                    <h4>
                                                        Increase your account security&nbsp;
                                                        <span className="txt-green">
                                                            {user && user?.security.length}
                                                        </span>
                                                        /4
                                                    </h4>
                                                    <div className="row w-100 mx-auto">
                                                        <div className="col-sm-6 br">
                                                            <div
                                                                className={`status ${
                                                                    getSecurityStatus("2FA")
                                                                        ? "active"
                                                                        : "deactive"
                                                                }`}
                                                            ></div>
                                                            <div className="security-item">
                                                                <p className="security-name">2FA</p>
                                                                <p
                                                                    className="txt-green security-link"
                                                                    onClick={() =>
                                                                        setIs2FAModalOpen(true)
                                                                    }
                                                                    onKeyDown={() =>
                                                                        setIs2FAModalOpen(true)
                                                                    }
                                                                    role="presentation"
                                                                >
                                                                    setup
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div
                                                                className={`status ${
                                                                    getSecurityStatus("KYC")
                                                                        ? "active"
                                                                        : "deactive"
                                                                }`}
                                                            ></div>
                                                            <div className="security-item">
                                                                <p className="security-name">
                                                                    KYC/KYB Verificatoin
                                                                </p>
                                                                <p className="txt-green security-link">
                                                                    Verified
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6 br">
                                                            <div
                                                                className={`status ${
                                                                    getSecurityStatus("mobile")
                                                                        ? "active"
                                                                        : "deactive"
                                                                }`}
                                                            ></div>
                                                            <div className="security-item">
                                                                <p className="security-name">
                                                                    Mobile Verification
                                                                </p>
                                                                <p className="txt-cyan security-link">
                                                                    Setup
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div
                                                                className={`status ${
                                                                    getSecurityStatus("AML")
                                                                        ? "active"
                                                                        : "deactive"
                                                                }`}
                                                            ></div>
                                                            <div className="security-item">
                                                                <p className="security-name">
                                                                    AML Identity Verificatoin more
                                                                    than 100k CHF withdraw
                                                                </p>
                                                                <p className="txt-cyan security-link">
                                                                    Setup
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="tier-details">
                                                <div className="row w-100 mx-auto">
                                                    <div className="col-6 br">Tier</div>
                                                    <div className="col-6 text-end text-sm-start d-flex align-items-center justify-content-end justify-content-sm-start">
                                                        <img
                                                            src={Bronze}
                                                            alt="brozne"
                                                            className="me-3"
                                                        />
                                                        Bronze
                                                    </div>
                                                </div>
                                                <div className="row w-100 mx-auto">
                                                    <div className="col-6 br">
                                                        Point to next tier
                                                    </div>
                                                    <div className="col-6 text-end text-sm-start">
                                                        500
                                                    </div>
                                                </div>
                                                <div className="row w-100 mx-auto pt-5">
                                                    <h4>
                                                        <span className="txt-green">G</span>
                                                        ain Points
                                                    </h4>
                                                    <div className="col-6 d-flex align-items-center br">
                                                        <div className="status me-2 active"></div>
                                                        KYC/AML completion
                                                    </div>
                                                    <div className="col-6 text-end text-sm-start">
                                                        500
                                                    </div>
                                                </div>

                                                <div className="row mx-0">
                                                    <div className="col-6 d-flex align-items-center br">
                                                        <div className="status me-2 deactive"></div>
                                                        Wallet balance
                                                    </div>
                                                    <div className="col-6 text-end text-sm-start">
                                                        500
                                                    </div>
                                                </div>

                                                <div className="row mx-0">
                                                    <div className="col-6 d-flex align-items-center br">
                                                        <div className="status me-2 active"></div>
                                                        Auction participation
                                                    </div>
                                                    <div className="col-6 text-end text-sm-start">
                                                        50
                                                    </div>
                                                </div>
                                            </div>
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
