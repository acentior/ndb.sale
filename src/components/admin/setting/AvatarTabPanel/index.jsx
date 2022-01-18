import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import AvatarComponent from './Avatar_Component';
import Loading from './../../shared/Loading';
import { fetch_Avatars } from './../../../../redux/actions/avatarAction';


const AvatarTabPanel = () => {
    const dispatch = useDispatch();
    const { loaded, data } = useSelector(state => state.data);
    const { page, limit } = useSelector(state => state.pagination);
    const [pageData, setPageData] = useState([]);
    
    useEffect(() => {
        dispatch(fetch_Avatars());
    }, [dispatch]);

    useEffect(() => {
        setPageData(data.slice((page - 1) * limit, page * limit));
    }, [dispatch, data, page, limit]);

    return (
        <div className='avatar_div custom_scrollbar'>
            {loaded? 
                pageData.map((avatar, index) => {
                    return <AvatarComponent key={index} avatar={avatar} />
                }):
                <Loading />
            }
        </div>
    );
};

export default AvatarTabPanel;