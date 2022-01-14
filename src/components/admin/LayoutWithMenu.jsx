import React from "react";
import Header from "./../header";
import LeftBar from "./LeftBar";

const LayoutWithMenu = ({children}) => {
    return (
        <>
            <Header />
            <section className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <LeftBar />                                                      
                        </div>
                        <div className="col-sm-10">
                            {children}                  
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LayoutWithMenu
