import React, { useReducer, useState } from "react"
import Header from "../components/common/header"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { Link } from "gatsby"
import Select from "react-select"
import Modal from "react-modal"
import { Tesla, CloseIcon, Bronze } from "../utilities/imgImport"
import ProfileChangePasswordModal from "./profile/change-password-modal"
import DeleteAccountTab from "./profile/delete-account-tab"
import SignOutTab from "./profile/sign-out-tab"
import { profile_tabs, wallets } from "../utilities/staticData"
import { GET_USER } from "../apollo/graghqls/querys/Auth"
import { useQuery } from "@apollo/client"
import NotificationSetting from "./profile/notification-setting-switch"
import NotificationRecent from "./profile/notification-recent-switch"
import Loading from "./common/Loading"

const Profile = () => {
    // Queries and Mutations
    const { data: user_data, loading } = useQuery(GET_USER)
    const user = user_data?.getUser

    // Containers
    const displayName = user?.avatarPrefix + ". " + user?.avatarName
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        pwd: { value: "", error: "" },
        pwd_confirm: { value: "", error: "" },
        pwdModal: false,
        tfaModal: false,
        tabIndex: 0,
        profile_tab: profile_tabs[0],
        walletId: 0,
    })

    const { tfaModal, tabIndex, profile_tab, walletId } = state
    // Methods
    const handleProfileTab = (value) => {
        setState({ profile_tab: value })
        setState({ tabIndex: value.index })
    }

    const getSecurityStatus = (key) => user?.userSecurity?.find((f) => f?.key === key)?.value

    if (loading) return <Loading />
    else
        return (
            <main className="profile-page">
                <Header />
                <section className="container position-relative h-100">
                    <div className="row mt-lg-2">
                        <div className="col-lg-3 profile-page__left">
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
                            <Tabs
                                className="profile-tab"
                                onSelect={(index) => setState({ tabIndex: index })}
                            >
                                <TabList>
                                    {profile_tabs.map((item, idx) => (
                                        <Tab key={idx}>{item.label}</Tab>
                                    ))}
                                </TabList>
                                <Select
                                    options={profile_tabs}
                                    value={profile_tab}
                                    onChange={(v) => handleProfileTab(v)}
                                    className="profile-tab__select mb-3"
                                />
                                <TabPanel>0</TabPanel>
                                <TabPanel>1</TabPanel>
                                <TabPanel>2</TabPanel>
                                <TabPanel>3</TabPanel>
                                <TabPanel>4</TabPanel>
                            </Tabs>
                        </div>
                        <div className="col-lg-9 profile-page__right border-start border-white">
                            {tabIndex === 0 && (
                                <>
                                    <Tabs className="detail-tab">
                                        <TabList>
                                            <Tab>Account detaiLs</Tab>
                                            <Tab>Tier Details</Tab>
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
                                                            {user &&
                                                                user?.userSecurity.filter(
                                                                    (s) => s.value
                                                                ).length}
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
                                                                <p className="security-name">
                                                                    Enable 2FA
                                                                </p>
                                                                <p
                                                                    className="txt-green security-link"
                                                                    onClick={() =>
                                                                        setState({ tfaModal: true })
                                                                    }
                                                                    onKeyDown={() =>
                                                                        setState({ tfaModal: true })
                                                                    }
                                                                    role="presentation"
                                                                >
                                                                    Enabled
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
                                                                    KYC Identity Verificatoin less
                                                                    than 100k CHF withdraw
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
                                    <p className="mt-3 pb-5">
                                        <Link to="/" className="get-verify">
                                            Get verified
                                        </Link>
                                        &nbsp; to collect over 2,000 USD the account should be
                                        verified.
                                    </p>
                                </>
                            )}
                            {tabIndex === 1 && (
                                <div className="notification-set">
                                    <Tabs className="notification-tab">
                                        <TabList>
                                            <Tab>Recent</Tab>
                                            <Tab>Setup</Tab>
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
                                    <h4>select wallet</h4>
                                    <div className="row">
                                        {wallets.map((item, idx) => (
                                            <div
                                                className="col-sm-6"
                                                key={idx}
                                                onClick={() => setState({ walletId: idx })}
                                                onKeyDown={() => setState({ walletId: idx })}
                                                role="presentation"
                                            >
                                                <div
                                                    className={`wallet-item ${
                                                        idx === walletId && "active"
                                                    }`}
                                                >
                                                    <img src={item.icon} alt="wallet icon" />
                                                    <p>{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn-primary">CONNECT</button>
                                </div>
                            )}
                            {tabIndex === 3 && <DeleteAccountTab />}
                            {tabIndex === 4 && <SignOutTab />}
                        </div>
                    </div>
                </section>
                <ProfileChangePasswordModal
                    isPasswordModalOpen={isPasswordModalOpen}
                    setIsPasswordModalOpen={setIsPasswordModalOpen}
                />
                <Modal
                    isOpen={tfaModal}
                    onRequestClose={() => setState({ tfaModal: false })}
                    ariaHideApp={false}
                    className="tfa-modal"
                    overlayClassName="tfa-modal__overlay"
                >
                    <div className="tfa-modal__header">
                        <div
                            onClick={() => setState({ tfaModal: false })}
                            onKeyDown={() => setState({ tfaModal: false })}
                            role="button"
                            tabIndex="0"
                        >
                            <img width="14px" height="14px" src={CloseIcon} alt="close" />
                        </div>
                    </div>
                    <p className="tfa-modal__body my-5">
                        Are you sure you want to disable 2-step verifacation to email?
                    </p>
                    <div className="pwd-modal__footer">
                        <button type="submit" className="btn-primary">
                            Yes
                        </button>
                        <button
                            className="btn-cancel"
                            onClick={() => setState({ tfaModal: false })}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            </main>
        )
}

export default Profile
