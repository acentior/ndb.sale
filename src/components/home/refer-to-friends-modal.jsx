import React from "react"
import Modal from "react-modal"
import { CloseIcon } from "../../utilities/imgImport"

export default function ReferToFriendsModal({ isModalOpen, setIsModalOpen }) {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="refer-modal"
            overlayClassName="refer-modal__overlay"
        >
            <div className="refer-modal__header">
                Invite friends
                <div onClick={() => setIsModalOpen(false)} role="button" tabIndex="0">
                    <img width="14px" height="14px" src={CloseIcon} alt="close" />
                </div>
            </div>
            <div className="refer-modal__body">
                <div className="mt-1">Earn coin together</div>
                <form className="mt-4">
                    <label className="w-100">
                        <span className="refer-modal__body-label">Referral ID</span>
                        <input type="text" placeholder="Referral ID" className="form-control" />
                    </label>

                    <label className="w-100 mt-3">
                        <span className="refer-modal__body-label">Referral link</span>
                        <input type="text" placeholder="Referral link" className="form-control" />
                    </label>
                    <div className="text-center">
                        <div className="refer-modal__body-invite-btn">invite friends</div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
