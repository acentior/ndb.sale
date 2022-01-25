import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

export const FormInput = (props) => {
    const { error, label, ...others } = props
    const cls = error ? "form-control error" : "form-control"
    return (
        <div className="mb-2">
            <label className="form-label">{label}</label>
            <input className={cls} {...others} />
            {error && (
                <span className="errorsapn">
                    <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                </span>
            )}
        </div>
    )
}

export const Input = (props) => {
    const { label, innerRef, ...others } = props
    return (
        <div className="mb-2 w-100">
            {label && <label className="form-label">{label}</label>}
            <input className="form-control" {...others} ref={innerRef} />
        </div>
    )
}

export const CheckBox = (props) => {
    const { children, className, name, ...others } = props
    return (
        <div className="form-check mb-2 noselect">
            <input type="checkbox" className="form-check-input my-auto" id={name} {...others} />{" "}
            <label className={"form-check-label ms-3 " + className} htmlFor={name}>
                {children}
            </label>
        </div>
    )
}
