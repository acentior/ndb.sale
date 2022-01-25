import React from "react"
import { NewDoc, Pass, Unpass1, Unpass2, VerifyIdStep5 } from "../../utilities/imgImport"

export default function StepOne({ step, setState }) {
    // Render
    return (
        <div className="col-sm-12 col-10 mx-auto mt-3 mt-sm-0">
            <div className="text-center">
                <div className="d-block d-sm-none">
                    <div className="txt-green text-uppercase fw-bold fs-18px mb-3">step 3</div>
                    <div className="text-light fs-14px fw-bold">Consent verification</div>
                </div>
                <img className="d-sm-block d-none" src={VerifyIdStep5} alt="step indicator" />
            </div>
            <div className="my-sm-5 verify-step1">
                <div className="col-12 d-flex flex-sm-row flex-column gap-sm-5 gap-0">
                    <div className="col-md-6 col-12 mt-5 mt-sm-0">
                        <p>
                            Write the following text on a blank paper, <br />
                            upload its photo along with your face.
                        </p>
                        <p className="my-3 fw-bold text-uppercase">i & ndb</p>
                        <div className="requirements">
                            <p className="fs-14px">Photo requirements:</p>
                            <p className="d-flex align-items-center gap-2 ms-2 item">
                                <div className="small-white-dot"></div>
                                <div>Upload entire document clearly</div>
                            </p>
                            <p className="d-flex align-items-center gap-2 ms-2 item">
                                <div className="small-white-dot"></div>
                                <div>Don’t fold the document</div>
                            </p>
                            <p className="d-flex align-items-center gap-2 ms-2 item">
                                <div className="small-white-dot"></div>
                                <div>No image from another image or device</div>
                            </p>
                            <p className="d-flex align-items-center gap-2 ms-2 item">
                                <div className="small-white-dot"></div>
                                <div>No paper-base document</div>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="d-flex flex-wrap justify-content-center my-0">
                            <div className="upload-doc">
                                <div className="my-5 mb-sm-3 mt-sm-0">
                                    <div className="file-upload py-3 px-5">
                                        <div className="new-doc">
                                            <img src={NewDoc} className="w-50" alt="new doc" />
                                        </div>
                                        <p className="file-browse">
                                            Drag & drop files here or{" "}
                                            <span className="fw-bold">browse</span>
                                        </p>

                                        <input type="file" multiple style={{ display: "none" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="upload-rule__img">
                            <img src={Pass} alt="pass" />
                            <img className="mx-3" src={Unpass1} alt="pass" />
                            <img src={Unpass2} alt="pass" />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-3 my-5 col-md-12">
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
                        next
                    </button>
                </div>
            </div>
        </div>
    )
}
