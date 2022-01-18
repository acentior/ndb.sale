import React from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { EmptyAvatar } from '../../../../utilities/imgImport';

const AvatarComponent = ({avatar = {}}) => {
    const { avatarComponents } = useSelector(state => state);
    console.log(avatar)
    return (
        <>
            <Container className='component'>
                <div className='image'>
                    <div className='image_div'>
                        <img src={EmptyAvatar} alt="back" />
                        {avatar.avatarSet && avatar.avatarSet.map((item, index) => {
                            if(item.groupId === 'hairStyle') {
                                return (
                                    <Hair key={index} hairColor={avatar.hairColor} style={{top: `${avatarComponents.hairStyles[item.compId].top}%`, left: `${avatarComponents.hairStyles[item.compId].left}%`, width: `${avatarComponents.hairStyles[item.compId].width}%`}}>
                                        {parse(avatarComponents.hairStyles[item.compId].svg)}
                                    </Hair>
                                );
                            } else {
                                return (
                                    <div key={index} style={{top: `${avatarComponents[`${item.groupId}s`][item.compId].top}%`, left: `${avatarComponents[`${item.groupId}s`][item.compId].left}%`, width: `${avatarComponents[`${item.groupId}s`][item.compId].width}%`}}>
                                        {parse(avatarComponents[`${item.groupId}s`][item.compId].svg)}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className='name'>
                    <p style={{textTransform: 'uppercase'}}>{avatar.surname}</p>
                </div>
                <div className='edit'>
                    <p><span><Icon icon="akar-icons:eye" /></span></p>
                    <p><span className='edit'><Icon icon="clarity:note-edit-line" /></span></p>
                </div>
            </Container>
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

const Hair = styled.div`
    svg>path {
        fill: ${props => {
            return props.hairColor? props.hairColor: '#626161';
        }}
    }
`;