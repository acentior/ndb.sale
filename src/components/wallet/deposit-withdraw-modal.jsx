/* eslint-disable */

import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import Modal from "react-modal"
import { GET_BALANCES } from "../../apollo/graghqls/querys/Auth"
import { CloseIcon, DestinationWallet, WalletQRCode } from "../../utilities/imgImport"
import { TRANSACTION_TYPES } from "../../utilities/staticData"
import CustomSpinner from "../common/custom-spinner"

export default function DepositWithdrawModal({ showModal, setShowModal, transactionType }) {
    // Webservice
    const { data: balances } = useQuery(GET_BALANCES, {
        fetchPolicy: "network-only",
        onCompleted: () => {
            setMyAssets(
                balances.getBalances.map((item) => {
                    return {
                        icon: item.symbol,
                        abbr: item.tokenSymbol,
                        name: item.tokenName,
                        amount: item.free + item.hold,
                    }
                })
            )
        },
    })

    // Containers
    const [type, setType] = useState(transactionType)
    const [myAssets, setMyAssets] = useState(null)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [selectedPercent, setSelectedPercent] = useState(25)
    const [withdrawAmount, setWithdrawAmount] = useState()
    const loadingSection = !myAssets

    // Methods
    const toggleAssetsList = () => {
        const item = document.querySelector(".assets-list")
        item.classList.toggle("d-none")
        item.classList.toggle("d-block")
    }

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            className="deposit-widthdraw-modal"
            overlayClassName="deposit-widthdraw-modal__overlay"
            ariaHideApp={false}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div className="fw-bold h4 text-light">Desposits and withdrawals</div>
                <img
                    className="cursor-pointer"
                    src={CloseIcon}
                    alt="Cross"
                    onClick={() => setShowModal(false)}
                    onKeyDown={() => setShowModal(false)}
                    role="presentation"
                />
            </div>
            {loadingSection ? (
                <div className="text-center mt-5 mb-4">
                    <CustomSpinner />
                </div>
            ) : (
                <div>
                    <div className="position-relative col-12 mt-3 bg-transparent text-white rounded-0">
                        <button
                            className="d-flex justify-content-between align-items-center btn p-3 text-light w-100 rounded-0 border-1-white"
                            onClick={() => toggleAssetsList()}
                        >
                            <div>
                                {selectedAsset ? (
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="me-2"
                                            dangerouslySetInnerHTML={{ __html: selectedAsset.icon }}
                                        />
                                        <div>{selectedAsset.amount + " " + selectedAsset.name}</div>
                                    </div>
                                ) : (
                                    <>Select Asset...</>
                                )}
                            </div>
                            <svg
                                className="duplicate-icon cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div className="assets-list position-absolute col-12 z-999 start-0 d-none text-light">
                            {myAssets.map((item) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setSelectedAsset(item)
                                            toggleAssetsList()
                                        }}
                                        className="bg-black border-1-white border-top-0 p-3 d-flex align-items-center hover:bg-dark cursor-pointer"
                                    >
                                        <div
                                            className="me-2"
                                            dangerouslySetInnerHTML={{ __html: item.icon }}
                                        />
                                        <div>{item.amount + " " + item.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="btn-group d-flex justify-content-between mt-3 align-items-center">
                        <div
                            className={`btn ${
                                type === TRANSACTION_TYPES.deposit
                                    ? "btn-light"
                                    : "btn-outline-secondary"
                            } rounded-0 col-sm-6 fw-bold py-2`}
                            role="presentation"
                        >
                            Deposit
                        </div>
                        <div
                            className={`btn ${
                                type === TRANSACTION_TYPES.withdraw
                                    ? "btn-light"
                                    : "btn-outline-light"
                            } rounded-0 col-sm-6 fw-bold py-2`}
                            onClick={() => setType(TRANSACTION_TYPES.withdraw)}
                            onKeyDown={() => setType(TRANSACTION_TYPES.withdraw)}
                            role="presentation"
                        >
                            Withdraw
                        </div>
                    </div>

                    {type === TRANSACTION_TYPES.deposit && (
                        <div>
                            <select className="col-12 mt-3 bg-transparent text-white p-3 form-select rounded-0">
                                <option className="bg-black" value="Network">
                                    Network
                                </option>
                                <option className="bg-black" value="Foo Network">
                                    Foo Network
                                </option>
                                <option className="bg-black" value="Bar Network">
                                    Bar Network
                                </option>
                            </select>
                            <div className="col-12 mt-3 p-3 d-flex justify-content-between align-items-center border-1-white">
                                <div className="text-light">
                                    Deposit Address
                                    <br />
                                    JF9042JF308JFDO093JFI
                                </div>
                                <div>
                                    <svg
                                        className="text-light duplicate-icon cursor-pointer"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <div>
                                    <img src={WalletQRCode} alt="Wallet Qr Code" />
                                </div>
                                <div className="text-light fw-normal mt-3 fs-12px">
                                    Send only Bitcoin to this deposit address
                                </div>
                            </div>
                            <div className="btn btn-light col-12 rounded-0 mt-3 fw-bold py-12px">
                                Share Address
                            </div>
                        </div>
                    )}
                    {type === TRANSACTION_TYPES.withdraw && selectedAsset && (
                        <div>
                            <div className="mt-3 text-light">
                                <div className="border border-light d-flex justify-content-between align-items-center">
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="Withdraw amount"
                                        className="bg-transparent p-3 text-light placeholder:text-light border-0 w-100"
                                    />
                                    {selectedAsset && (
                                        <div
                                            className="me-3"
                                            dangerouslySetInnerHTML={{ __html: selectedAsset.icon }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="text-light d-flex justify-content-between text-center mt-3">
                                {[25, 50, 75, 100].map((item) => (
                                    <button
                                        onClick={() => {
                                            setSelectedPercent(item)
                                            setWithdrawAmount((selectedAsset.amount * item) / 100)
                                        }}
                                        className={`btn ${
                                            item === selectedPercent
                                                ? "btn-light"
                                                : "btn-outline-light"
                                        } rounded-0 py-1 px-5 fw-500`}
                                    >
                                        {item}%
                                    </button>
                                ))}
                            </div>
                            <div className="text-light mt-3 fs-12px">
                                <div className="d-flex justify-content-between border-bottom border-light">
                                    <div>Available balance</div>
                                    {selectedAsset && (
                                        <div>{selectedAsset.amount + " " + selectedAsset.abbr}</div>
                                    )}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>Minimum transfer</div>
                                    <div>0.00200 NDB</div>
                                </div>
                            </div>
                            <div className="mt-3 text-light">
                                <div className="border border-light d-flex justify-content-between align-items-center">
                                    <input
                                        type="text"
                                        placeholder="Destination wallet"
                                        className="bg-transparent p-3 text-light placeholder:text-light border-0 w-100"
                                    />
                                    <div className="me-3">
                                        <img src={DestinationWallet} alt="Destination Wallet" />
                                    </div>
                                </div>
                            </div>
                            <select className="col-12 mt-3 bg-transparent text-white p-3 form-select rounded-0">
                                <option className="bg-black" value="Network">
                                    Network
                                </option>
                                <option className="bg-black" value="Foo Network">
                                    Foo Network
                                </option>
                                <option className="bg-black" value="Bar Network">
                                    Bar Network
                                </option>
                            </select>
                            <div className="btn btn-light col-12 rounded-0 mt-3 fw-bold py-12px">
                                Withdraw
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Modal>
    )
}
