import React from 'react';
import Header from './../header';

const LayoutForCreate = ({children}) => {
    return (
        <>
            <Header />
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