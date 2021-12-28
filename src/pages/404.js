import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { NotFound } from '../utilities/imgImport';
import { device } from '../utilities/device';

const NotFoundPage = () => {
    const goBackHistory = () => {
        window.history.back();
    };

    return (
        <>
            <NotFoundDiv>
                <div className='not_found'>
                    <h2>404</h2>
                    <div>
                        <img src={NotFound} alt="Not Found" />
                    </div>
                </div>
                <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
                <Button onClick={goBackHistory}>
                    <Icon icon="akar-icons:arrow-back-thick" />
                    Go back
                </Button>
            </NotFoundDiv>
        </>
    )
};

export default NotFoundPage;

const NotFoundDiv = styled.div`
    max-width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    div.not_found {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 35px;
        h2 {
            width: 60%;
            font-size: 72px;
        }
        div {
            width: 40%;
            img {
                width: 100px;
            }
        }
        @media screen and (max-width: ${device['phone']}){
            flex-direction: column;
            h2 {
                width: 100%;
                font-size: 72px;
                line-height: 80px;
            }
            div {
                width: 100%;
                img {
                    width: 100px;
                }
            }
        }
    }
    p {
        padding: 5px;
        margin-bottom: 50px;
        font-size: 14px;
    }
    @media screen and (max-width: ${device['phone']}){
        width: 85%;
    }
`;

const Button = styled.button`
    border: 2px solid white;
    background-color: transparent;
    width: 200px;
    height: 60px;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    svg {
        font-size: 28px;
        margin-right: 10px;
    }
    &:hover {
        border: 2px solid #23c865;
    }
`;