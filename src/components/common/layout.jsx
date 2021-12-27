import * as React from "react"
import Header from "./header"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <section>{children}</section>
        </>
    )
}

export default Layout
