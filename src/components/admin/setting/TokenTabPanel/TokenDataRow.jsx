import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import svgToDataURL  from 'svg-to-dataurl';
import { Icon } from '@iconify/react';
import { device } from '../../../../utilities/device';
import { width } from './columnWidth';
import DeleteConfirmModal from '../../DeleteConfirmModal';
// import EditTokenModal from '../../editModals/EditTokenModal';
import { delete_Token } from './../../../../redux/actions/tokenAction'

const TokenDataRow = ({ datum = {} }) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    // const [isEditOpen, setIsEditOpen] = useState(false);
    const [deletePending, setDeletePending] = useState(false);

    const deleteToken = async () => {
        setDeletePending(true);
        await dispatch(delete_Token(datum.id));
        setDeletePending(false);
        setIsConfirmOpen(false);
    };

    return (
        <>
            <DataRow>
                <div className='image'>
                    <Main>
                        <img src={svgToDataURL(datum.symbol)} alt="token" />
                    </Main>
                </div>
                <div className='name'>
                    <Main>
                        <p style={{fontSize: 16, fontWeight: '700'}}>{datum.tokenName}</p>
                    </Main>
                </div>
                <div className='symbol'>
                    <Main>
                        <p>{datum.tokenSymbol}</p>
                    </Main>
                </div>
                <div className='network'>
                    <Main>
                        <p>{datum.network}</p>
                    </Main>
                </div>
                <div className='address'>
                    <Main>
                        <p>{datum.address}</p>
                    </Main>
                </div>
                <div className='edit'>
                    <Main>
                        <p>
                            {/* <span className='edit'><Icon icon="clarity:note-edit-line" onClick={() => setIsEditOpen(true)} /></span> */}
                            <span className='delete'><Icon icon="akar-icons:trash-can" onClick={() => setIsConfirmOpen(true)} /></span>
                        </p>
                    </Main>
                </div>
            </DataRow>
            <DataRowForMobile>
                <div>
                    <UnitRowForMobile>
                        <div className='left' style={{width: '10%'}}>
                            <img src={svgToDataURL(datum.symbol)} alt="token" />
                        </div>
                        <div className='left' style={{width: '60%'}}>
                            <p className='text-white' style={{fontSize: 16, fontWeight: '700'}}>{datum.tokenName}</p>
                        </div>
                        {/* <div className='right'>
                            <p>
                                <span className='edit'><Icon icon="clarity:note-edit-line" onClick={() => setIsEditOpen(true)} /></span>
                            </p>
                        </div> */}
                        <div className='right'>
                            <p>
                                <span className='delete'><Icon icon="akar-icons:trash-can" onClick={() => setIsConfirmOpen(true)} /></span>
                            </p>
                        </div>
                        <div className='right'>
                            <p>
                                <span style={{fontSize: 16}}><Icon icon={show? "ant-design:caret-up-filled": "ant-design:caret-down-filled"} data-bs-toggle="collapse" data-bs-target={`#id${datum.id}`} onClick={() => setShow(!show)} /></span>
                            </p>
                        </div>
                    </UnitRowForMobile>
                </div>
                <div id={`id${datum.id}`} className='collapse'>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Symbol</p>
                        </div>
                        <div className='right'>
                            <p>{datum.tokenSymbol}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Network</p>
                        </div>
                        <div className='right'>
                            <p>{datum.network}</p>
                        </div>
                    </UnitRowForMobile>
                    <UnitRowForMobile>
                        <div className='left'>
                            <p style={{color: 'dimgrey'}}>Address</p>
                        </div>
                        <div className='right'>
                            <p>{datum.address}</p>
                        </div>
                    </UnitRowForMobile>
                </div>
            </DataRowForMobile>
            {/* <EditTokenModal isModalOpen={isEditOpen} setIsModalOpen={setIsEditOpen} datum={datum} /> */}
            <DeleteConfirmModal
                isModalOpen={isConfirmOpen}
                setIsModalOpen={setIsConfirmOpen}
                confirmData={datum.tokenName}
                doAction={deleteToken}
                pending={deletePending}
            />
        </>
    );
};

export default TokenDataRow;

const DataRow = styled.div`
    min-height: 80px;
    padding: 8px 2px;
    border-bottom: 1px solid #464646;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    svg {
        cursor: pointer;
    }
    &>div.image {
        width: ${width.image};
        img {
            width: 60%;
            display: block;
            margin: auto;
        }
    }
    &>div.name {width: ${width.name};}
    &>div.symbol {width: ${width.symbol};}
    &>div.network {width: ${width.network};}
    &>div.address {width: ${width.address};}
    &>div.edit {
        width: ${width.edit};

        p {
            display: flex;
            justify-content: space-evenly;
            span {
                font-size: 22px;
                &.edit {
                    color: #23c865;
                }
                &.delete {
                    color: #F32D2D;
                }
            }
        }
    }

    @media screen and (max-width: ${device['phone']}){
        display: none;
    }
`;

const Main = styled.div`
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

// For Mobile
const DataRowForMobile = styled.div`
    min-height: 50px;
    border-bottom: 1px solid #464646;
    padding: 16px;
    display: none;    
    svg {
        cursor: pointer;
    }
    @media screen and (max-width: ${device['phone']}){
        display: flex;
        flex-direction: column;
    } 
`;

const UnitRowForMobile = styled.div`
    display: flex;
    justify-content: space-between;
    &>div.left {
        width: 40%;
    }
    &>div.right {
        p {
            text-align: right;   
            span {
                font-size: 22px;
                &.edit {
                    color: #23c865;
                }
                &.delete {
                    color: #F32D2D;
                }
            }
        }
    }
`;