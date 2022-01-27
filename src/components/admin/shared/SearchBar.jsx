import React from 'react';
import { Icon } from '@iconify/react';

const SearchBar = () => {
    return (
        <div className='searchBar'>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" />
                <button className="btn"><Icon icon="akar-icons:search" /> </button>
            </div>
        </div>
    );
};

export default SearchBar;