import { Link } from "gatsby"
import React, { useState } from "react"
import { VerifyIdStep7 } from "../../utilities/imgImport"
import { ROUTES } from "../../utilities/routes"
import Loading from "../common/Loading"

export default function StepSeven() {
    // Render
    const [loading, setLoading] = useState(true)
    return (
        <>
            <div className={`${!loading && "d-none"}`}>
                <Loading />
            </div>
            <div className={`col-sm-12 col-11 mx-auto mt-3 mt-sm-0 ${loading && "d-none"}`}>
                <h4 className="text-center  mt-5 mt-sm-2 mb-4">Verify your identity</h4>
                <div className="text-center">
                    <img
                        className="d-sm-block d-none"
                        src={VerifyIdStep7}
                        onLoad={() => setLoading(false)}
                        alt="step indicator"
                    />
                </div>
                <div className="my-sm-5 py-sm-5 verify-step1">
                    <div className="text-sm-start text-center">
                        <p className="fs-25px fw-bold text-light d-sm-block d-none my-sm-0 my-5">
                            Thank you, your verification has been successfully submitted.
                        </p>
                        <p className="fs-16px fw-bold text-light d-block d-sm-none">
                            Thank you, your verification has been successfully submitted.
                        </p>
                        <p className="fs-14px px-sm-2 px-4 mt-3">
                            As soley the data processor, NDB acknowledges your right to request
                            access, erasure, and retention of your data.
                            <div className="d-sm-block d-none">
                                <br />
                            </div>
                            Contact out Data Compliance Officer at{" "}
                            <span className="text-success">privacy@ndb.technology</span>
                        </p>
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-5 col-md-12">
                        <Link
                            to={ROUTES.profile}
                            className="btn btn-success rounded-0 px-3 py-2 text-uppercase fw-500 text-light col-md-6 col-12"
                        >
                            Back to Profile
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
