import React, { useReducer, useState } from "react"
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
import { countries } from "../../utilities/staticData"
import { VERIFY_KYC_MUTATION } from "../../apollo/graghqls/mutations/Auth"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"
import Loading from "../common/Loading"

const VerificationPage = () => {
    // WebService
    useQuery(GET_USER, {
        onCompleted: (res) => {
            console.log(res.getUser.email)
            setLoadingData(false)
        },
        fetchPolicy: "network-only",
    })
    const [verify] = useMutation(VERIFY_KYC_MUTATION, {
        errorPolicy: "ignore",
        onCompleted: () => {
            setSubmitting(false)
            setState({ step: step + 1 })
        },
        onerror: (error) => {
            console.log(error)
        },
    })
    // Containers
    const [submitting, setSubmitting] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [userEmail, setUserEmail] = useState("")
    const [accept, setAccept] = useState(false)
    const [country, setCountry] = useState(countries[0])
    const {
        files: stepOneFiles,
        handleDragDropEvent: stepOneHandleDragDropEvent,
        setFiles: stepOneSetFiles,
        removeFile: stepOneRemoveFile,
    } = useFileUpload()
    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [dob, setDob] = useState("")
    const [stepThreeCountry, setStepThreeCountry] = useState(countries[0])
    const {
        files: stepThreeFiles,
        handleDragDropEvent: stepThreeHandleDragDropEvent,
        setFiles: stepThreeSetFiles,
        removeFile: stepThreeRemoveFile,
    } = useFileUpload()
    const [address, setAddress] = useState("")
    const {
        files: stepFourFiles,
        handleDragDropEvent: stepFourHandleDragDropEvent,
        setFiles: stepFourSetFiles,
        removeFile: stepFourRemoveFile,
    } = useFileUpload()
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
        setSubmitting(true)
        const imageStep1 = await getBase64(stepOneFiles[0])
        const imageStep3 = await getBase64(stepThreeFiles[0])
        const imageStep4 = await getBase64(stepFourFiles[0])
        verify({
            variables: {
                country: country.label,
                email: userEmail,
                faceProof: selfieImage,
                documentProof: imageStep4,
                addressProof: imageStep3,
                fullAddress: address,
                consentProof: imageStep1,
                fname: firstName,
                mname: "",
                lname: surname,
                dob: dob,
            },
        })
    }
    if (loadingData) return <Loading />
    else
        return (
            <main className="verify-page">
                <SimpleHeader />
                <section className="d-flex justify-content-center align-items-start align-items-xl-center">
                    <div>
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
                                firstName={firstName}
                                setFirstName={setFirstName}
                                surname={surname}
                                setSurname={setSurname}
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
                                submitting={submitting}
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
