import React from "react"
import { VerifyIdStep4 } from "../../utilities/imgImport"

export default function StepFour({ step, setState }) {
    // Render
    return (
        <div className="col-sm-12 col-12 mx-auto mt-3 mt-sm-0">
            <div className="text-center">
                <div className="d-block d-sm-none">
                    <div className="txt-green text-uppercase fw-bold fs-18px mb-3">step 2</div>
                    <div className="text-light fs-14px fw-bold">
                        Confirm your address information
                    </div>
                    <div className="text-light fs-12px">Make edits if needed</div>
                </div>
                <img className="d-sm-block d-none" src={VerifyIdStep4} alt="step indicator" />
            </div>
            <div className="my-sm-5 verify-step1">
                <div className="mt-5 text-light fs-25px fw-bold text-center d-sm-block d-none">
                    Confirm your address information
                    <div className="fs-16px fw-500">Make edits if needed</div>
                </div>
                <div className="col-sm-8 col-12 mx-auto">
                    <div>
                        <p className="form-label mt-4">Address</p>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="17th floor, Street name, city"
                        />
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
                        onClick={() => setState({ step: step + 1 })}
                    >
                        confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
