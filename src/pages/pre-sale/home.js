import React from "react"
import { navigate } from "gatsby"
import Seo from "../../components/seo"
import Header from "../../components/header"
import { numberWithCommas } from "../../utilities/number"

const Home = () => {
    return (
        <>
            <Seo title="Purchase" />
            <main className="purchase-page">
                <Header />
                <section className="home-section">
                    <div className="container">
                        <div className="row flex-row-reverse justify-content-around">
                            <div className="col-sm-7 d-flex flex-column justify-content-center align-items-start description">
                                <h4 className="title1 txt-green">ExcluSive pre-sale of</h4>
                                <h3 className="title2">NDB TOKEN</h3>
                                <p className="text">
                                    Don’t miss an opportunity to get ahold of NDB Tokens before
                                    anyone else at the fixed price before the auction starts.
                                </p>
                                {/* Desktop View Button */}
                                <div className="btn-desktop mt-4">
                                    <div>
                                        <button
                                            className="btn-green d-md-none"
                                            onClick={() => {
                                                navigate("/pre-sale/auction")
                                            }}
                                        >
                                            Pre-Order
                                        </button>
                                        <button
                                            className="btn-green d-none d-md-block"
                                            onClick={() => {
                                                navigate("/pre-sale/auction")
                                            }}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                    <div className="col-sm-5"></div>
                                </div>
                            </div>
                            <div className="col-sm-5 d-flex justify-content-center align-items-center imageDiv">
                                <div className="hero-image">
                                    <div>
                                        <p className="text-left text-light text-uppercase mt-4 fw-bold">
                                            7 days Left
                                        </p>
                                        <p className="token-value mt-sm-2 mt-sm-0">
                                            {numberWithCommas(604800, " ")}
                                        </p>
                                        <p className="token-left text-uppercase text-end fw-bold">
                                            TokenS Left
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Mobile View Button */}
                        <div className="btn-mobile">
                            <div className="">
                                <button
                                    className="btn-green"
                                    onClick={() => {
                                        navigate("/pre-sale/auction")
                                    }}
                                >
                                    Buy
                                </button>
                            </div>
                            
                            <div className="py-3 text-decoration-underline text-center text-light">
                                Learn more
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
