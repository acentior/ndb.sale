import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvatarComponent from './Avatar_Component';
import Loading from './../../shared/Loading';
import PaginationBar from './../../PaginationBar';
import { fetch_Avatars } from './../../../../redux/actions/avatarAction';
import { set_Page } from '../../../../redux/actions/paginationAction';


const AvatarTabPanel = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { data } = useSelector(state => state);
    const { page, limit } = useSelector(state => state.pagination);
    const [pageData, setPageData] = useState([]);
    
    useEffect(() => {
        (async function() {
            setLoading(true);
            await dispatch(fetch_Avatars());
            setLoading(false);
            dispatch(set_Page(1));
        })();
    }, [dispatch]);

    useEffect(() => {
        setPageData(Object.values(data).slice((page - 1) * limit, page * limit));
    }, [dispatch, data, page, limit]);

    return (
        <div>
            {loading?
                <Loading />: 
                (
                    <>
                        {pageData.map(avatar => {
                            return <AvatarComponent key={avatar.id} avatar={avatar} />
                        })}
                        <PaginationBar />
                    </>
                )                
            }
        </div>
    );
};

export default AvatarTabPanel;