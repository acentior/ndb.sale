import React from "react"
// import styled from 'styled-components';
import Seo from "../../components/seo"
import Header from "../../components/header"
import CountDown from "../../components/common/countdown"

const HomeWithSign = () => {
    return (
        <>
            <Seo title="Purchase and Sign" />
            <main className="purchaseWithSign-page">
                <Header />
                <section className="home-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 clock-div">
                                <h4 className="clock-title">The next Auction round starts in</h4>
                                <CountDown />
                            </div>
                            <div className="col-sm-6 d-flex flex-column justify-content-center">
                                <h4 className="title1 txt-green">Exclusive Sale of</h4>
                                <h3 className="title2">10 ndb tokens!</h3>
                                <p className="text">
                                    Don’t miss an opportunity to buy limited number of NDB Tokens at
                                    the fixed price before the next auction round started.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6"></div>
                            <div className="col-sm-6">
                                <button className="btn btn-green">buy now</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="back-image"></div>
            </main>
        </>
    )
}

export default HomeWithSign

// const TextDiv = styled.div`
//     @media screen and (max-width: 786px) {
//         padding: 3% 20px;
//         margin-top: 20px;
//     }
// `
