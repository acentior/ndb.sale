import React from "react"
import Seo from "../components/seo"
import Header from "../components/header"
import { NdbToken } from "../utilities/imgImport"

const IndexPage = () => {
    return (
        <div
            style={{
                background:
                    "radial-gradient(54.07% 44.7% at 47.35% 51.98%, rgba(0, 0, 0, 0) 0%, #000000 100%)",
            }}
        >
            <Seo title="Direct Purchase" />
            <main className="home-page">
                <Header />
                <div className="container col-lg-10 mx-auto gap-5">
                    <div
                        className="direct-purchase"
                        style={{
                            backgroundImage: `url(${NdbToken})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left center",
                        }}
                    >
                        <div className="d-flex align-items-center">
                            <div className="col-md-6 d-xl-flex flex-xl-column align-items-xl-center">
                                <div className="next-auction-label">
                                    <div>the next auction round starts in</div>
                                    <div className="text-end">7 days</div>
                                </div>
                                <div className="tokens-amount">604 800</div>
                            </div>
                            <div className="col-md-6 d-flex flex-column align-items-center">
                                <div>
                                    <div className="exclusive-label">exlusive sale of</div>
                                    <div className="ndb-tokens-label">10 ndb tokens</div>
                                    <div className="miss-label">
                                        Don't miss an opportunity to buy limited number of NDB
                                        Tokens at the fixed price before the next auction round
                                        started.
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-green btn-buy-now">
                                            buy now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default IndexPage
