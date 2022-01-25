import React from 'react';
import Modal from 'react-modal';
import { Icon } from '@iconify/react';
import { capitalizeFirstLetter } from '../../../utilities/string';
import { Rating } from '@mui/material';
import AvatarImage from './AvatarImage';

const ShowAvatarModal = ({isModalOpen, setIsModalOpen, avatar = {}}) => {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            ariaHideApp={false}
            className="show-avatar-modal"
            overlayClassName="pwd-modal__overlay"
        >
            <div className="pwd-modal__header">
                <p></p>
                <div
                    onClick={() => setIsModalOpen(false)}
                    onKeyDown={() => setIsModalOpen(false)}
                    role="button"
                    tabIndex="0"
                >
                    <Icon icon="ep:close-bold" />
                </div>
            </div>
            {Object.keys(avatar).length !== 0 && (
                <div className="preview_div">
                    <p className="name">
                        {avatar ? 
                            `${capitalizeFirstLetter(avatar.fname)} ${capitalizeFirstLetter(avatar.surname)}`:
                            "Nicolla Tesla"
                        }
                    </p>
                    <div className="row avatarStats">
                        <div className="col-sm-5">
                            <div className="profile">
                                <AvatarImage avatar={avatar} />
                            </div>
                        </div>
                        <div className="col-sm-7">
                            {avatar.skillSet?.map((item, index) => {
                                return (
                                    <div key={index} className="row">
                                        <div className="col-6">
                                            <p title={item.name}>{item.name}</p>
                                        </div>
                                        <div className="col-6">
                                            <Rating
                                                name="simple-controlled"
                                                value={item.rate}
                                                readOnly
                                                emptyIcon=" "
                                                size="small"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="facts">
                        {avatar.factsSet?.map((item, index) => {
                            return (
                                <div key={index} className="row">
                                    <div className="col-4">
                                        <p>{item.topic}</p>
                                    </div>
                                    <div className="col-8">
                                        <p>{item.detail}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="details">
                        <p>{avatar.details}</p>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ShowAvatarModal;