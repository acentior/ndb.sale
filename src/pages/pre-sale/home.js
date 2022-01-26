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
                        <div className="row flex-row-reverse">
                            <div className="col-sm-7 d-flex flex-column justify-content-center desctription">
                                <h4 className="title1 txt-green">ExcluSive pre-sale of</h4>
                                <h3 className="title2">NDB TOKEN</h3>
                                <p className="text">
                                    Don’t miss an opportunity to get ahold of NDB Tokens before
                                    anyone else at the fixed price before the auction starts.
                                </p>
                                {/* Desktop View Button */}
                                <div className="btn-desktop mt-2">
                                    <div>
                                        <button
                                            className="btn-green"
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
                                    <div
                                        className="position-absolute"
                                        style={{ top: "50%", transform: "translateY(-50%)" }}
                                    >
                                        <p className="token-left text-uppercase mt-4">
                                            7 days Left
                                        </p>
                                        <p className="token-value mt-2 mt-sm-0">
                                            {numberWithCommas(604800, " ")}
                                        </p>
                                        <p className="token-left text-uppercase text-end">
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
                                    className="btn btn-green"
                                    onClick={() => {
                                        navigate("/pre-sale/auction")
                                    }}
                                >
                                    Buy
                                </button>
                            </div>
                            "<div className="text-decoration-underline">Learn more</div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
