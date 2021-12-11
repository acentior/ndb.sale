import React from "react"

// import "bootstrap/scss/bootstrap.scss"
import "./src/styles/sass/app.scss"
import "jquery/dist/jquery.min.js"
import "popper.js/dist/popper.min"
import "bootstrap/dist/js/bootstrap.min.js"
import "react-tabs/style/react-tabs.css"
import "rc-slider/assets/index.css"

import { ApplicationContext } from "./src/context/store"

// export { wrapRootElement } from "./src/apollo/provider"

export const wrapRootElement = ({ element }) => <ApplicationContext>{element}</ApplicationContext>
