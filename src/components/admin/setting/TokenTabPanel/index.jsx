import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import TokenDataRow from './TokenDataRow';
import { width } from './columnWidth';
import Loading from './../../shared/Loading';
import PaginationBar from './../../PaginationBar';
import SearchBar from '../../shared/SearchBar';
import { set_Page } from './../../../../redux/actions/paginationAction';
import { get_Tokens } from './../../../../redux/actions/tokenAction';

const TokenTable = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state);
    const { page, limit } = useSelector(state => state.pagination);

    const [loading, setLoading] = useState(false);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        (async function() {
            dispatch(set_Page(1));
            setLoading(true);
            await dispatch(get_Tokens());
            setLoading(false);
        })();
    }, [dispatch]);

    useEffect(() => {
        setPageData(Object.values(data).slice((page - 1) * limit, page * limit));
    }, [dispatch, data, page, limit]);

    return (
        <>
            <TableHead>
                <div className='image'> </div>
                <div className='name'>Token Name</div>
                <div className='symbol'>Symbol</div>
                <div className='network'>Network</div>
                <div className='address'>Address</div>
                <div className='edit'> </div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>Token Data</div>
            </TableHeadForMobile>
            {loading?
                <Loading />:
                <>
                    <TableBody className='custom_scrollbar'>
                        {pageData.map(datum => {
                            return <TokenDataRow key={datum.id} datum={datum} />
                        })}
                    </TableBody>
                    <PaginationBar />
                </>
            }            
        </>
    )
};

export default TokenTable;

const TableHead = styled.div`
    height: 40px;
    border: 1px solid #464646;
    background-color: #464646;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    &>div {
        padding: 8px 2px;
    }
    &>div.image {width: ${width.image};}
    &>div.name {width: ${width.name};}
    &>div.symbol {width: ${width.symbol};}
    &>div.network {width: ${width.network};}
    &>div.address {width: ${width.address};}
    &>div.edit {width: ${width.edit};}

    @media screen and (max-width: ${device['phone']}){
        display: none;
    }    
`;

const TableHeadForMobile = styled.div`
    height: 40px;
    border: 1px solid #464646;
    background-color: #464646;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    &>div.name {padding-left: 16px;}
    display: none;
    @media screen and (max-width: ${device['phone']}){
        display: flex;
    }
`;

const TableBody = styled.div`
    border-left: 1px solid #464646;
    border-right: 1px solid #464646;
    max-height: 70vh;
    overflow: auto;
    @media screen and (max-width: ${device['phone']}){
        max-height: unset;
    }
`;