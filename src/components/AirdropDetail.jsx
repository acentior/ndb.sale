import React from "react"
import { Link } from "gatsby"
import CountDown from "./common/countdown"

const AirdropDetail = ({ clsName, airdrop, onJoinClick }) => {
    return (
        <div className={`airdrop-detail ${clsName}`}>
            <div className="row h-100">
                <div className="col-md-7 airdrop-detail__left">
                    <div className="detail-header">
                        <img src={airdrop.icon} alt="coin icon" className="detail-header__icon" />
                        <div>
                            <p>Participants</p>
                            <p className="value">{airdrop.participants}</p>
                        </li>
                        <li
                    <div className="detail-footer">
                        <h6>How to participate?</h6>
                        <ul>
                            <li>Connect your MetaMask wallet</li>
                            <li>
                                Connect your BitMEX API key via{" "}
                                <a
                                    className="txt-green"
                                    href="https://aluna.social/my/account/api_keys"
                              /li>
                        </ul>
                    </div>
                    <Link className="read-more" to="/">
                        Read more
                    </Link>
                </div>
                <div className="col-md-5 airdrop-detail__right">
                    <div className="time-remaining">
                        <h5 className="pt-4">Time remaining</h5>
                        <CountDown />
                        <button className="btn-primary mb-4" onClick={() => onJoinClick()}>
                            Join airdrop
                        </button>
                    </div>
                    <div className="about-company">
                        <h6>About the company</h6>
                        <p>
                            ICON Foundation is leading ICON project, one of the largest blockchain
                            networks in the world, launched in 2017 with the vision of ‘Hyperconnect
                            the World’...
                        </p>
                        <Link className="read-more" to="/">
                            Read more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AirdropDetail
