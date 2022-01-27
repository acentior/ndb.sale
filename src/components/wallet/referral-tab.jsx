import React from "react"

export default function ReferralTab() {
    return (
        <>
            <div className="text-light my-5 wallet-referral-tab">
                <div className="text-center">
                    <div className="title">Inviate friends</div>
                    <div className="mt-2 subtitle">Earn coins together</div>
                </div>
                <div className="rewards-box col-md-8 mx-auto">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center col-sm-6">
                            <div className="label">You get</div>
                            <div className="value">20%</div>
                        </div>
                        <div className="d-flex flex-column align-items-center col-sm-6">
                            <div className="label">Your friend gets</div>
                            <div className="value">0%</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mx-auto">
                    <div>
                        <div className="mb-1 fs-13">Referral ID</div>
                        <div className="d-flex justify-content-between align-items-center bg-light">
                            <div type="text" className="p-3 text-dark border-0 text-dark">
                                40192842
                            </div>
                            <svg
                                className="duplicate-icon text-dark me-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="mb-1 fs-13">Referral link</div>
                        <div className="d-flex justify-content-between align-items-center bg-light">
                            <div type="text" className="p-3 text-dark border-0 text-dark">
                                https://accounts...h=40192842
                            </div>
                            <svg
                                className="duplicate-icon text-dark me-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-light text-uppercase fw-bold rounded-0 btn-invite">
                            invite friends
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
