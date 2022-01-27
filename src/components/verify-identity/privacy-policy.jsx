import React, { useState } from "react"
import { Link } from "gatsby"
import { Icon } from "@iconify/react"
import Modal from "react-modal"
import InnerHTML from "dangerously-set-html-content"
// import PrivacyHTML from "../../assets/files/Privacy Policy.html"

export default function PrivacyPolicy({ agree, setAgree }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="mt-5 privacy-policy">
            <div className="privacy-policy-checkout">
                <button onClick={() => setAgree(!agree)} className="check-box">
                    {agree && <Icon icon="akar-icons:check" />}
                </button>
                <div className="ms-3">I agree to the above statment, and i have read NDB&nbsp;</div>
            </div>
            <Link to="#" className="txt-green link" onClick={() => setOpen(true)}>
                Privacy Policy
            </Link>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                ariaHideApp={false}
                className="privacy-policy-modal"
                overlayClassName="privacy-policy-modal__overlay"
            >
                {/* <InnerHTML html={PrivacyHTML} className="privacy-policy-modal__content" /> */}
                <div className="privacy-policy-modal__footer">
                    <button
                        className="btn-decline me-2"
                        onClick={() => {
                            setAgree(false)
                            setOpen(false)
                        }}
                    >
                        Decline
                    </button>
                    <button
                        className="btn-accept me-2"
                        onClick={() => {
                            setAgree(true)
                            setOpen(false)
                        }}
                    >
                        Accept
                    </button>
                </div>
            </Modal>
        </div>
    )
}
