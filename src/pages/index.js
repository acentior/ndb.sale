import React from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"
import { Hero2 } from "../utilities/imgImport"
import CountDown from "../components/common/countdown"
import Header from "../components/common/header"
import { numberWithCommas } from "../utilities/number"

const IndexPage = () => {
    return (
        <div
            style={{
                background: "radial-gradient(54.07% 44.7% at 47.35% 51.98%, rgba(0, 0, 0, 0) 0%, #000000 100%)",
            }}>
            <Seo title="Home" />
            <main className="home-page">
                <Header />
                <section className="home-section">
                    <div className="container h-100">
                        <div className="row">
                            <div className="left-part col-md-6">
                                <h3 className="home-title ">
                                    <span className="txt-green">Round 20</span> Ends in
                                </h3>
                                <div className="d-flex justify-content-end">
                                    <CountDown />
                                </div>
                                <p className="token-left text-uppercase mt-4">Token Left</p>
                                <p className="token-value">{numberWithCommas(604800, " ")}</p>
                                <button className="btn btn-green">Place a bid</button>
                                <br />
                                <Link to="/" className="learn-more">
                                    Learn more
                                </Link>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="right-part col-md-5">
                                <img src={Hero2} alt="home hero" className="hero-image img-fluid" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default IndexPage
