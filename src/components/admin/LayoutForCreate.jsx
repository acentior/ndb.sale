import React from 'react';
import AdminHeader from './AdminHeader';

const LayoutForCreate = ({children}) => {
    return (
        <>
            <AdminHeader />
            <section className="home">
                <div className="container">                        
                    <div className="createDiv">
                        {children}
                    </div>
                </div>
            </section>
        </>        
    );
};

export default LayoutForCreate;