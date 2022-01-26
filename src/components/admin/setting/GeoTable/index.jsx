import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { device } from '../../../../utilities/device';
import GoeDataRow from './GeoDataRow';
import { width } from './columnWidth';
import Loading from './../../shared/Loading';
import PaginationBar from '../../PaginationBar';
import { get_Disallowed_Countries } from '../../../../redux/actions/geoLocationAction';
import { set_Page } from '../../../../redux/actions/paginationAction';

const GeoTable = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { data } = useSelector(state => state);
    const { page, limit } = useSelector(state => state.pagination);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        (async function() {
            dispatch(set_Page(1, 5));
            setLoading(true);
            await dispatch(get_Disallowed_Countries());
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        setPageData(Object.values(data).slice((page - 1) * limit, page * limit));
    }, [dispatch, data, page, limit]);

    return (
        <>
            <TableHead>
                <div className='country'>Not allowed countries</div>
                <div className='note'>Alpha-2</div>
                <div className='edit'></div>
            </TableHead>
            <TableHeadForMobile>
                <div className='name'>GEO Data</div>
            </TableHeadForMobile>
            {loading? 
                <Loading />:
                <>
                    <TableBody>
                        {pageData.map((datum) => {
                            return <GoeDataRow key={datum.id} datum={datum} />
                        })}
                    </TableBody>
                    <PaginationBar />
                </>
            }
        </>
    )
};

export default GeoTable;

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
    &>div.country {width: ${width.country}; padding-left: 16px;}
    &>div.note {width: ${width.note};}
    &>div.edit {width: ${width.edit};}

    @media screen and (max-width: ${device['laptop-md']}){
        div.bid_status {
            width: 8%;
        }
    }

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
`;