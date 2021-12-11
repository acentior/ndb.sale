import React from 'react';
import Seo from '../../components/seo';

import Header from '../../components/common/header';

const Home = () => {
    return (
        <>
            <Seo title="Purchase" />
            <main className="purchase-page">
                <Header />
                <section className="home-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7 d-flex flex-column justify-content-center desctription">
                                <h4 className="title1 txt-green">Exclusive Sale of</h4>
                                <h3 className="title2">10 ndb tokens</h3>
                                <p className="text">Don’t miss an opportunity to buy limited number of NDB Tokens at the fixed price before the next auction round started.</p>
                            </div>
                            <div className="col-sm-5 d-flex justify-content-center align-items-center imageDiv">
                                <div className="hero-image" ></div>                            
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7">
                                <button className="btn btn-green">buy now</button>
                            </div>
                            <div className="col-sm-5"></div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;