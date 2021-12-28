import React from "react"
import { Link } from "gatsby"
import { useDispatch, useSelector } from "react-redux"

const Avatar = () => {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state?.count)

    return (
        <div className="text-white">
            <h5>{counter}</h5>
            <Link to="/admin">to Home</Link>
            <button onClick={() => dispatch({ type: "PLUS" })}>PLUS</button>
            <button onClick={() => dispatch({ type: "MINUS" })}>MINUs</button>
        </div>
    )
}

export default Avatar
