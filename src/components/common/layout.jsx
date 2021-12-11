import * as React from "react"
import Header from "./header"
import { ApplicationContext } from "../../context/store"

const Layout = ({ children }) => {
    return (
        <ApplicationContext>
            <Header />
            <section>{children}</section>
        </ApplicationContext>
    )
}

export default Layout
