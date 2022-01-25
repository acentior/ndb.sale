import { Link } from "gatsby"
import React, { useState } from "react"
import { ROUTES } from "../../utilities/routes"
import { CheckBox } from "../common/FormControl"

export default function PrimaryStep({ step, setState }) {
    const [accept, setAccept] = useState(false)
    return (
        <div className="verify-step0 col-sm-12 col-10 mx-auto mt-5 mt-sm-0">
            <p className="pre-wrap">
                <span className="text-white fw-bold fs-18px">
                    Identity verificaton Consent
                    <br />
                </span>
                I declare that i am at least 16 years of age; I agree to the collection, processing
                or storage of my personal information, including biometic data, by NDB for the
                purpose(s) of identiy verification; that the information I provide is true and
                accurate to the best of my knowledge; and I shall be fully responsible in case I
                provide wrong information or any of the documents I use are fake, forged,
                counterfeit etc.
            </p>
            <div className="form-group">
                <CheckBox
                    name="agree"
                    type="checkbox"
                    value={accept}
                    onChange={(e) => setAccept(e.target.checked)}
                >
                    I agree to the above statement, and I have read NDB{" "}
                    <Link to="/" className="txt-green fw-bold">
                        Privacy Policy
                    </Link>
                </CheckBox>
            </div>
            <div className="d-flex justify-content-center gap-3 my-5 col-md-12">
                <Link
                    to={ROUTES.profile}
                    className="btn btn-outline-light rounded-0 px-5 py-2 text-uppercase fw-500 col-sm-3 col-6"
                >
                    cancel
                </Link>
                <button
                    disabled={!accept}
                    className="btn btn-success rounded-0 px-5 py-2 text-uppercase fw-500 text-light col-sm-3 col-6"
                    onClick={() => setState({ step: step + 1 })}
                >
                    next
                </button>
            </div>
        </div>
    )
}
