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
                <section className="home-section mt-5 mt-sm-0">
                    <div className="container h-100 d-flex flex-column justify-content-sm-center justify-content-start mt-5 mt-sm-0">
                        <div className="row m-0">
                            <div className="left-part col-md-6 pe-0 pe-sm-auto">
                                <h3 className="home-title d-sm-block d-none">
                                    <div>
                                        <span className="txt-green">round 20</span> ends in
                                    </div>
                                    <CountDown />
                                </h3>
                                <h3 className="home-title-mobile d-sm-none d-block mb-5 mb-sm-0">
                                    <div className="mb-3">
                                        <span className="txt-green">round 20</span> ends in
                                    </div>
                                    <CountDown />
                                </h3>
                                <div className="tokens-lower-part mt-5 mt-sm-0">
                                    <p className="token-value mt-2 mt-sm-0">
                                        {numberWithCommas(604800, " ")}
                                    </p>
                                    <p className="token-left text-uppercase">
                                        tokens left in this round
                                    </p>
                                    <div className="cta mt-5 mt-sm-0 px-4 px-sm-0">
                                        <button
                                            className="btn btn-green"
                                            onClick={placeABidButtonClick}
                                        >
                                            place a bid
                                        </button>
                                        <br />
                                        <div
                                            className="learn-more mt-3 mt-sm-0"
                                            onClick={() => setIsModalOpen(true)}
                                            onKeyDown={() => setIsModalOpen(true)}
                                            role="presentation"
                                        >
                                            Refer to friends
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 d-none d-sm-block"></div>
                            <div className="right-part col-md-5 d-none d-sm-block">
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
