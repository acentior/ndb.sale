import React from "react"
import { SelfieImg, VerifyIdStep6 } from "../../utilities/imgImport"

export default function StepSix({ step, setState }) {
    // Render
    return (
        <div className="col-sm-12 col-11 mx-auto mt-3 mt-sm-0">
            <div className="text-center">
                <div className="d-block d-sm-none">
                    <div className="txt-green text-uppercase fw-bold fs-18px mb-3">step 4</div>
                    <div className="text-light fs-14px fw-bold">Face verification</div>
                </div>
                <img className="d-sm-block d-none" src={VerifyIdStep6} alt="step indicator" />
            </div>
            <div className="my-sm-5 verify-step1">
                <div className="text-center mt-3 mt-sm-0">
                    <p className="fs-12px">
                        Face the camera. Make sure your face is visible including the ears.
                        <div className="d-sm-block d-none">
                            <br />
                        </div>
                        Have good lightening and face the camera straight on.
                    </p>
                    <img className="selfie-img mt-5" src={SelfieImg} alt="seflie" />
                </div>
                <div className="d-flex justify-content-center gap-3 mt-5 col-md-12">
                    <button
                        className="btn btn-outline-light rounded-0 px-3 py-2 text-uppercase fw-500 col-sm-3 col-5"
                        onClick={() => setState({ step: step - 1 })}
                    >
                        back
                    </button>
                    <button
                        className="btn btn-success rounded-0 px-3 py-2 text-uppercase fw-500 text-light col-sm-3 col-5"
                        onClick={() => setState({ step: step + 1 })}
                    >
                        take photo
                    </button>
                </div>
            </div>
        </div>
    )
}
