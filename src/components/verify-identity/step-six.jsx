import React, { useRef, useState } from "react"
import Webcam from "react-webcam"
import { SelfieImg, VerifyIdStep6 } from "../../utilities/imgImport"

export default function StepSix({ step, setState, selfieImage, setSelfieImage, submitKYCData }) {
    // Containers
    const webcamRef = useRef(null)
    const [openWebcam, setOpenWebcam] = useState(false)

    // Methods
    const capture = () => {
        const fooImage = webcamRef.current.getScreenshot()
        console.log(fooImage)
        setSelfieImage(fooImage)
        return setOpenWebcam(false)
    }
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
                    <p className="fs-16px">
                        Face the camera. Make sure your face is visible including the ears.
                        <div className="d-sm-block d-none"></div>
                        Have good lightening and face the camera straight on.
                    </p>
                    {openWebcam ? (
                        <div className="mx-auto col-sm-8 col-12">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="mt-4"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    ) : (
                        <img
                            className="selfie-img mt-4"
                            src={selfieImage ? selfieImage : SelfieImg}
                            alt="seflie"
                        />
                    )}
                </div>
                <div className="d-flex justify-content-center gap-2 mt-5 col-md-12">
                    {!selfieImage && (
                        <button
                            className="btn btn-outline-light rounded-0 px-3 py-2 text-uppercase fw-500 col-sm-3 col-6"
                            onClick={() => setState({ step: step - 1 })}
                        >
                            back
                        </button>
                    )}
                    {openWebcam ? (
                        <button
                            className="btn btn-success rounded-0 px-3 py-2 text-uppercase fw-500 text-light col-sm-3 col-6"
                            onClick={capture}
                        >
                            take photo
                        </button>
                    ) : (
                        <button
                            className="btn btn-success rounded-0 px-3 py-2 text-uppercase fw-500 text-light col-sm-3 col-6"
                            onClick={() => {
                                setOpenWebcam(true)
                                setSelfieImage(null)
                            }}
                        >
                            {selfieImage ? "retake" : "open camera"}
                        </button>
                    )}
                    {selfieImage && !openWebcam && (
                        <button
                            className="btn btn-outline-light rounded-0 px-3 py-2 text-uppercase fw-500 col-sm-3 col-6"
                            onClick={submitKYCData}
                        >
                            complete
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
