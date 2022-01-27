import React from "react"
import { useState } from "react"
import { VerifyIdStep2 } from "../../utilities/imgImport"
import Loading from "../common/Loading"

export default function StepTwo({
    step,
    setState,
    dob,
    setDob,
    firstName,
    setFirstName,
    surname,
    setSurname,
}) {
    // Containers
    const dateValidationRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    const [dateError, setDateError] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [surnameError, setSurnameError] = useState("")

    // Methods
    const validateDateFormat = (date) => String(date).search(dateValidationRegex) !== -1

    const onNextButtonClick = (e) => {
        e.preventDefault()
        setFirstNameError("")
        setDateError("")
        setSurnameError("")
        let error = false
        if (!firstName) {
            error = true
            setFirstNameError("Please fill out the first name field")
        }
        if (!surname) {
            error = true
            setSurnameError("Please fill out the surname field")
        }
        if (!validateDateFormat(dob)) {
            error = true
            setDateError("Invalid date format!")
        }
        if (!error) return setState({ step: step + 1 })
    }

    // Render

    const [loading, setLoading] = useState(true)

    return (
        <>
            <div className={`${!loading && "d-none"}`}>
                <Loading />
            </div>
            <div className={`col-12 mx-auto mt-3 mt-sm-0 ${loading && "d-none"}`}>
                <h4 className="text-center  mt-5 mt-sm-2 mb-4">Verify your identity</h4>
                <div className="text-center">
                    <div className="d-block d-sm-none">
                        <div className="txt-green text-uppercase fw-bold fs-18px mb-3">step 1</div>
                        <div className="text-light fs-14px fw-bold">
                            Confirm your ID information
                        </div>
                    </div>
                    <img
                        className="d-sm-block d-none"
                        src={VerifyIdStep2}
                        onLoad={() => setLoading(false)}
                        alt="step indicator"
                    />
                </div>
                <div className="my-sm-5 verify-step1">
                    <div className="mt-5 text-light fs-25px fw-bold text-center d-sm-block d-none">
                        Confirm your ID information
                        <div className="fs-16px fw-500">Make edits if needed</div>
                    </div>
                    <div className="col-sm-8 col-12 mx-auto">
                        <div className="">
                            <p className="form-label mt-4">First name</p>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                            />
                            <div className="text-danger mt-2">{firstNameError}</div>
                        </div>
                        <div>
                            <p className="form-label mt-4">Surname Name</p>
                            <input
                                type="text"
                                className="form-control"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder="Surname name"
                            />
                            <div className="text-danger mt-2">{surnameError}</div>
                        </div>
                        <div>
                            <p className="form-label mt-4">Date of birth (YYYY-MM-DD)</p>
                            <input
                                type="text"
                                onChange={(e) => setDob(e.target.value)}
                                value={dob}
                                className="form-control"
                                placeholder="1985-05-13"
                            />
                            <div className="text-danger mt-2">{dateError}</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 mt-5 col-md-12">
                        <button
                            className="btn btn-outline-light rounded-0 px-5 py-2 text-uppercase fw-500 col-sm-3 col-6"
                            onClick={() => setState({ step: step - 1 })}
                        >
                            back
                        </button>
                        <button
                            className="btn btn-success rounded-0 px-5 py-2 text-uppercase fw-500 text-light col-sm-3 col-6"
                            onClick={onNextButtonClick}
                        >
                            next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
