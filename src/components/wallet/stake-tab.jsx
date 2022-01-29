/* eslint-disable */

import React from "react"
import { useState } from "react"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { BTC, DownArrow, Equity, ETH, USDC } from "../../utilities/imgImport"

export default function StakeTab() {
    // Containers
    const [lockedStakingAssets, setLockedStakingAssets] = useState([])
    if (lockedStakingAssets.length === 0)
        setLockedStakingAssets([
            {
                id: 0,
                label: "btc",
                minAmount: "1 btc",
                apy: "30.77%",
                duration: 0,
            },
            {
                id: 1,
                label: "eth",
                minAmount: "1 eth",
                apy: "0.90%",
                duration: 1,
            },
            {
                id: 2,
                label: "usdc",
                minAmount: "1 usdc",
                apy: "4.49%",
                duration: 0,
            },
        ])
    // Methods
    const changeDurationForAsset = (assetID, durationID) => {
        const fooArray = lockedStakingAssets
        fooArray[assetID].duration = durationID
        setLockedStakingAssets([...fooArray])
        console.log("clicking")
    }
    return (
        <Tabs className="text-light stake-react-list__tab">
            <TabList className="py-3 px-4">
                <Tab>equity value</Tab>
                <Tab>locked staking</Tab>
                <Tab>defi staking</Tab>
            </TabList>
            <TabPanel className="px-4">
                <div className="py-3">
                    <div className="d-flex justify-content-between px-2">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="d-flex align-items-center gap-3">
                                <div className="fs-24px fw-500">Equity value(BTC)</div>
                                <img src={Equity} alt="equity icon" />
                            </div>
                            <div className="txt-green fs-36px lh-25px mt-3">******</div>
                            <div className="text-secondary fs-24px">******</div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between gap-5">
                                <div>
                                    <div className="text-secondary fs-14px fw-500">
                                        30-day profit (BTC)
                                    </div>
                                    <div className="txt-green fs-18px">******</div>
                                </div>
                                <div>
                                    <div className="text-secondary fs-14px fw-500">
                                        Last day PNL (BTC)
                                    </div>
                                    <div className="txt-green fs-18px">******</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-outline-light rounded-0 w-100 fw-bold text-uppercase">
                                    stake to earn
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 overflow-auto">
                        <div className="d-flex gap-3 justify-content-start align-items-center">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                                <div className="fs-14px">All holdings</div>
                                <div>
                                    <img
                                        src={DownArrow}
                                        alt="down arrow"
                                        className="cursor-pointer w-50"
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2">
                                <div className="fs-14px">All coins</div>
                                <div>
                                    <img
                                        src={DownArrow}
                                        alt="down arrow"
                                        className="cursor-pointer w-50"
                                    />
                                </div>
                            </div>
                        </div>
                        <table>
                            <thead className="border-bottom-1px">
                                <tr>
                                    <th>Token</th>
                                    <th className="text-center">Amount</th>
                                    <th className="text-end">APY</th>
                                    <th className="text-end">Interest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { icon: BTC, label: "btc" },
                                    { icon: ETH, label: "eth" },
                                ].map((item) => (
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center fs-16px gap-2">
                                                <img src={item.icon} alt="btc image" />
                                                <div className="fs-16px fw-500 text-uppercase">
                                                    {item.label}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="fs-14px text-center">1 NDB</td>
                                        <td className="fs-14px text-success text-end">30.77%</td>
                                        <td className="fs-14px text-end">0.06251 NDB</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </TabPanel>
            <TabPanel className="px-4">
                <div className="d-flex py-3">
                    <table>
                        <thead className="border-bottom-1px">
                            <tr className="text-center">
                                <th className="text-start">Token</th>
                                <th>Est. APY</th>
                                <th></th>
                                <th>Duration</th>
                                <th></th>
                                <th>Min. amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {lockedStakingAssets.map((asset) => (
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center fs-16px gap-2">
                                            <div className="circle-light"></div>
                                            <div className="fs-16px fw-500 text-uppercase">
                                                {asset.label}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="fs-14px text-success">{asset.apy}</td>
                                    <td className="fs-14px" colSpan={3}>
                                        <div className="stake-duration">
                                            {[
                                                { id: 0, label: "Flexible" },
                                                { id: 1, label: "30 days" },
                                                { id: 2, label: "60 days" },
                                                { id: 3, label: "90 days" },
                                            ].map((item) => (
                                                <div
                                                    className={`bg-black-10 ${
                                                        asset.duration === item.id &&
                                                        "active-duration"
                                                    }`}
                                                    onClick={() =>
                                                        changeDurationForAsset(asset.id, item.id)
                                                    }
                                                >
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="fs-14px text-uppercase">{asset.minAmount}</td>
                                    <td>
                                        <button className="btn btn-outline-light rounded-0 fw-bold text-uppercase w-100 py-1">
                                            stake
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TabPanel>
            <TabPanel className="px-4">
                <div className="d-flex py-3">
                    <table>
                        <thead className="border-bottom-1px">
                            <tr className="text-center">
                                <th className="text-start">Token</th>
                                <th>Est. APY</th>
                                <th>Duration</th>
                                <th>Min. amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {[
                                {
                                    id: 0,
                                    label: "ndb",
                                    minAmount: "1 btc",
                                    apy: "30.77%",
                                    duration: 0,
                                },
                            ].map((asset) => (
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center fs-16px gap-2">
                                            <div className="circle-light"></div>
                                            <div className="fs-16px fw-500 text-uppercase">
                                                {asset.label}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="fs-14px text-success">{asset.apy}</td>
                                    <td className="fs-14px">
                                        <div className="d-flex align-items-center gap-2 justify-content-center">
                                            <svg
                                                className="clock-icon text-success"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                            <div>Flexible</div>
                                        </div>
                                    </td>
                                    <td className="fs-14px text-uppercase">{asset.minAmount}</td>
                                    <td>
                                        <button className="btn btn-outline-light rounded-0 fw-bold text-uppercase w-100 py-1">
                                            stake
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TabPanel>
        </Tabs>
    )
}
