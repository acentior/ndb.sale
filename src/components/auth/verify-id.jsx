import React, { useReducer, useRef } from "react"
import useFileUpload from "react-use-file-upload"
import SimpleHeader from "../header/simple-header"
import PrimaryStep from "../verify-identity/primary-step"
import StepOne from "../verify-identity/step-one"
import StepTwo from "../verify-identity/step-two"
import StepThree from "../verify-identity/step-three"
import StepFour from "../verify-identity/step-four"
import StepFive from "../verify-identity/step-five"
import StepSix from "../verify-identity/step-six"
import StepSeven from "../verify-identity/step-seven"
import { useState } from "react"
import { countries } from "../../utilities/staticData"
import { VERIFY_KYC_MUTATION } from "../../apollo/graghqls/mutations/Auth"
import { useMutation } from "@apollo/client"

const VerificationPage = () => {
    // WebService
    const [verify] = useMutation(VERIFY_KYC_MUTATION, {
        errorPolicy: "ignore",
        onCompleted: (data) => {
            console.log(data)
        },
        onerror: (error) => {
            console.log(error)
        },
    })
    // Containers

    // 0
    const [accept, setAccept] = useState(false)

    // 1
    const [country, setCountry] = useState(countries[0])
    const {
        files: stepOneFiles,
        handleDragDropEvent: stepOneHandleDragDropEvent,
        setFiles: stepOneSetFiles,
        removeFile: stepOneRemoveFile,
    } = useFileUpload()

    // 2
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [dob, setDob] = useState("")

    // 3
    const [stepThreeCountry, setStepThreeCountry] = useState(countries[0])
    const {
        files: stepThreeFiles,
        handleDragDropEvent: stepThreeHandleDragDropEvent,
        setFiles: stepThreeSetFiles,
        removeFile: stepThreeRemoveFile,
    } = useFileUpload()

    // 4
    const [address, setAddress] = useState("")

    // 5
    const {
        files: stepFourFiles,
        handleDragDropEvent: stepFourHandleDragDropEvent,
        setFiles: stepFourSetFiles,
        removeFile: stepFourRemoveFile,
    } = useFileUpload()

    // 6
    const [selfieImage, setSelfieImage] = useState()

    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        step: -1, // --> initial value: -1;
    })
    const { step } = state

    // Methods
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
    }
    const submitKYCData = async () => {
        // let's first turn the images into base64
        const imageStep1 = await getBase64(stepOneFiles[0])
        console.log(imageStep1)
        const imageStep3 = await getBase64(stepThreeFiles[0])
        console.log(imageStep3)
        const imageStep4 = await getBase64(stepFourFiles[0])
        console.log(imageStep4)
        verify({
            variables: {
                country: country,
                email: "mreskini30@gmail.com",
                faceProof: selfieImage,
                documentProof: imageStep4,
                addressProof: imageStep3,
                fullAddress: address,
                consentProof: imageStep1,
                fname: "Mohammad",
                mname: "",
                lname: "Eskini",
                dob: dob,
            },
        })
    }

    return (
        <main className="verify-page">
            <SimpleHeader />
            <section className="d-flex justify-content-center align-items-start align-items-xl-center">
                <div>
                    <h4 className="text-center  mt-5 mt-sm-2 mb-4">Verify your identity</h4>
                    {/* {step !== -1 && step < 3 && (
                        <div className="d-flex mt-4">
                            <div className="step-bar">
                                <div className="left-circle bg-green"></div>
                                <div
                                    className="step-progress"
                                    style={{ width: step * 50 + "%" }}
                                ></div>
                                <div
                                    className={`right-circle ${
                                        step === 2 ? "bg-green" : "bg-white"
                                    }`}
                                ></div>
                            </div>
                        </div>
                    )} */}
                    {step === -1 && (
                        <PrimaryStep
                            accept={accept}
                            setAccept={setAccept}
                            step={step}
                            setState={setState}
                        />
                    )}
                    {step === 0 && (
                        <StepOne
                            country={country}
                            setCountry={setCountry}
                            step={step}
                            setState={setState}
                            files={stepOneFiles}
                            setFiles={stepOneSetFiles}
                            handleDragDropEvent={stepOneHandleDragDropEvent}
                            removeFile={stepOneRemoveFile}
                        />
                    )}
                    {step === 1 && (
                        <StepTwo
                            name={name}
                            setName={setName}
                            dob={dob}
                            setDob={setDob}
                            step={step}
                            setState={setState}
                        />
                    )}
                    {step === 2 && (
                        <StepThree
                            country={stepThreeCountry}
                            setCountry={setStepThreeCountry}
                            step={step}
                            setState={setState}
                            files={stepThreeFiles}
                            setFiles={stepThreeSetFiles}
                            handleDragDropEvent={stepThreeHandleDragDropEvent}
                            removeFile={stepThreeRemoveFile}
                        />
                    )}
                    {step === 3 && (
                        <StepFour
                            address={address}
                            setAddress={setAddress}
                            step={step}
                            setState={setState}
                        />
                    )}
                    {step === 4 && (
                        <StepFive
                            step={step}
                            setState={setState}
                            files={stepFourFiles}
                            setFiles={stepFourSetFiles}
                            handleDragDropEvent={stepFourHandleDragDropEvent}
                            removeFile={stepFourRemoveFile}
                        />
                    )}
                    {step === 5 && (
                        <StepSix
                            step={step}
                            setState={setState}
                            selfieImage={selfieImage}
                            setSelfieImage={setSelfieImage}
                            submitKYCData={submitKYCData}
                        />
                    )}
                    {step === 6 && <StepSeven step={step} setState={setState} />}
                </div>
            </section>
        </main>
    )
}

export default VerificationPage
