import Select from "react-select"
import React, { useState } from "react"
import { countries } from "../../utilities/staticData"
import { NewDoc, Pass, Unpass1, Unpass2, VerifyIdStep1 } from "../../utilities/imgImport"
import Loading from "../common/Loading"

export default function StepOne({
    step,
    setState,
    country,
    setCountry,
    files,
    setFiles,
    handleDragDropEvent,
    removeFile,
}) {
    // Containers
    const docTypes = [
        {
            label: "Passports",
            value: "passport",
        },
        {
            label: "National Identification Cards",
            value: "id_card",
        },
        {
            label: "Driving License",
            value: "driver_license",
        },
    ]
    const [docType, setDocType] = useState(docTypes[0])

    // Methods
    const onUserDropFile = (e) => {
        handleDragDropEvent(e)
        setFiles(e, "w")
    }

    // Render
    const [loading, setLoading] = useState(true)
    return (
        <>
            <div className={`${!loading && "d-none"}`}>
                <Loading />
            </div>
            <div className={`col-sm-12 col-10 mx-auto mt-3 mt-sm-0 ${loading && "d-none"}`}>
                <h4 className="text-center  mt-5 mt-sm-2 mb-4">Verify your identity</h4>
                <div className="text-center">
                    <div className="d-block d-sm-none">
                        <div className="txt-green text-uppercase fw-bold fs-18px mb-3">step 1</div>
                        <div className="text-light fs-14px">Identity document</div>
                    </div>
                    <img
                        className="d-sm-block d-none"
                        src={VerifyIdStep1}
                        onLoad={() => setLoading(false)}
                        alt="step indicator"
                    />
                </div>
                <div className="my-sm-5 verify-step1">
                    <div className="col-12 d-flex flex-sm-row flex-column gap-sm-5 gap-0">
                        <div className="col-md-6 col-12">
                            <p className="form-label mt-4">Document type</p>
                            <Select
                                options={docTypes}
                                value={docType}
                                onChange={(v) => setDocType(v)}
                                placeholder="Document type"
                            />
                            <p className="form-label mt-4">Country issuing</p>
                            <Select
                                options={countries}
                                value={country}
                                onChange={(v) => setCountry(v)}
                                placeholder="Choose country"
                            />
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
                            <div className="my-0 mt-lg-4">
                                <div className="upload-doc">
                                    <div className="my-5 mb-sm-3 mt-sm-0" id="file-upload-wrapper">
                                        <label
                                            htmlFor="file-upload-input"
                                            className="file-upload cursor-pointer"
                                            onDragEnter={handleDragDropEvent}
                                            onDragOver={handleDragDropEvent}
                                            onDrop={onUserDropFile}
                                        >
                                            <input
                                                type="file"
                                                id="file-upload-input"
                                                className="d-none"
                                                onChange={(e) => setFiles(e, "w")}
                                            />
                                            <div className="py-3 px-0">
                                                <div className="new-doc mx-auto">
                                                    <img
                                                        src={NewDoc}
                                                        className="w-50"
                                                        alt="new doc"
                                                    />
                                                </div>
                                                {files[0] ? (
                                                    <p className="mt-30px">
                                                        {files[0].name}{" "}
                                                        <span className="txt-green fw-bold">
                                                            selected
                                                        </span>
                                                    </p>
                                                ) : (
                                                    <p className="file-browse">
                                                        Drag & drop files here or{" "}
                                                        <span className="fw-bold">browse</span>
                                                    </p>
                                                )}
                                            </div>
                                        </label>
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
                            disabled={files.length === 0}
                            className="btn btn-success rounded-0 px-5 py-2 text-uppercase fw-500 text-light col-sm-3 col-6"
                            onClick={() => setState({ step: step + 1 })}
                        >
                            next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
