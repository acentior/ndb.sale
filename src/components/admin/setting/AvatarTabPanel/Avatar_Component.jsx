import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';

const AvatarComponent = ({avatar = {}}) => {
    return (
        <>
            <Container className='component'>
                <div className='image'>
                    <img src={`/avatars/${avatar.image}`} alt={avatar.name} />
                </div>
                <div className='name'>
                    <p>{avatar.name}</p>
                </div>
                <div className='edit'>
                    <p><span><Icon icon="clarity:note-edit-line" /></span></p>
                </div>
            </Container>
        </>
    );
};

export default AvatarComponent;

const Container = styled.div`
    min-height: 75px;
    border-bottom: 1px solid #464646;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>div.image {
        width: 7%;
        img {
            width: 60px;
            height: 60px;
            display: block;
            margin: auto;
        }
    }
    &>div.name {
        width: 84%;
    }
    &>div.edit {
        width: 7%;
        p {
            text-align: center;
            span {
                font-size: 22px;
                color: #23c865;
                cursor: pointer;
            }
        }
    }
    & p {
        font-size: 18px;
        font-weight: 700;
    }
    @media screen and (max-width: ${device['laptop-md']}){
        &>div.image {width: 10%}
        &>div.name {width: 80%}
        &>div.edit {
            width: 10%
            p span {
                font-size: 18px;
            }
        }
    }
    @media screen and (max-width: ${device['tablet']}){
        &>div.image {width: 12%}
        &>div.name {width: 76%}
        &>div.edit {
            width: 12%
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
        &>div.edit {width: 18%}
    }
`;
