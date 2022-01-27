import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import AvatarImage from '../../shared/AvatarImage';
import ShowAvatarModal from '../../shared/ShowAvatarModal';
import EditAvatarModal from '../../editModals/EditAvatarModal';

const AvatarComponent = ({avatar = {}}) => {
    const [isShowOpen, setIsShowOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <Container className='component'>
                <div className='image'>
                    <AvatarImage avatar={avatar} />
                </div>
                <div className='name'>
                    <p style={{textTransform: 'uppercase'}}>{avatar.surname}</p>
                </div>
                <div className='edit'>
                    <p><span><Icon icon="akar-icons:eye" onClick={() => setIsShowOpen(true)} /></span></p>
                    <p><span className='edit'><Icon icon="clarity:note-edit-line" onClick={() => setIsEditOpen(true)}/></span></p>
                </div>
            </Container>
            <ShowAvatarModal isModalOpen={isShowOpen} setIsModalOpen={setIsShowOpen} avatar={avatar} />
            <EditAvatarModal  isEditModalOpen={isEditOpen} setIsEditModalOpen={setIsEditOpen} avatar={avatar} />
        </>
    );
};

export default AvatarComponent;

const Container = styled.div`
    min-height: 100px;
    border-bottom: 1px solid #464646;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>div.image {
        width: 10%;
        div.image_div {
            width: 60px;
            margin: auto;
        }
    }
    &>div.name {
        width: 84%;
    }
    &>div.edit {
        width: 12%;
        display: flex;
        justify-content: space-around;
        p {
            text-align: center;
            span {
                font-size: 22px;
                cursor: pointer;
                &.edit {
                    color: #23c865;
                }
            }
        }
    }
    & p {
        font-size: 18px;
        font-weight: 700;
    }
    @media screen and (max-width: ${device['laptop-md']}){
        &>div.image {width: 12%}
        &>div.name {width: 80%}
        &>div.edit {
            width: 15%
            p span {
                font-size: 18px;
            }
        }
    }
    @media screen and (max-width: ${device['tablet']}){
        &>div.image {width: 14%}
        &>div.name {width: 76%}
        &>div.edit {
            width: 18%
            p span {
                font-size: 18px;
            }
        }
    }
    @media screen and (max-width: ${device['phone']}){
        border-left: 1px solid #464646;
        border-right: 1px solid #464646;
        &>div.image {width: 25%}
        &>div.name {width: 65%}
        &>div.edit {width: 24%}
    }
`;
