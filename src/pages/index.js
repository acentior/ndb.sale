import React, { useState } from "react"
import { navigate } from "gatsby"
import Seo from "../components/seo"
import { Hero2 } from "../utilities/imgImport"
import CountDown from "../components/common/countdown"
import Header from "../components/header"
import { numberWithCommas } from "../utilities/number"
import { useAuth } from "../hooks/useAuth"
import { ROUTES } from "../utilities/routes"
import ReferToFriendsModal from "../components/home/refer-to-friends-modal"

const IndexPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const auth = useAuth()
    const placeABidButtonClick = () =>
        auth?.isLoggedIn() ? navigate(ROUTES.auction) : navigate(ROUTES.signIn)
    return (
        <div
            style={{
                background:
                    "radial-gradient(54.07% 44.7% at 47.35% 51.98%, rgba(0, 0, 0, 0) 0%, #000000 100%)",
            }}
        >
            <Seo title="Home" />
            <main className="home-page">
                <Header />
                <ReferToFriendsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <section className="home-section">
                    <div className="container h-100 d-flex flex-column justify-content-center">
                        <div className="row m-0">
                            <div className="left-part col-md-6">
                                <h3 className="home-title">
                                    <span className="txt-green">round 20</span> ends in
                                    <CountDown />
                                </h3>
                                <div className="tokens-lower-part">
                                    <p className="token-left text-uppercase mt-4">
                                        tokens left in this round
                                    </p>
                                    <p className="token-value">{numberWithCommas(604800, " ")}</p>
                                    <div className="cta">
                                        <button
                                            className="btn btn-green"
                                            onClick={placeABidButtonClick}
                                        >
                                            Place a bid
                                        </button>
                                        <br />
                                        <div
                                            className="learn-more"
                                            onClick={() => setIsModalOpen(true)}
                                            onKeyDown={() => setIsModalOpen(true)}
                                            role="presentation"
                                        >
                                            Refer to friends
                                        </div>
                                    </div>
                                </div>
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
