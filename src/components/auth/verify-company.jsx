import { Link, navigate } from "gatsby"
import React, { useReducer, useCallback, useState } from "react"
import { MobileDatePicker } from "@mui/lab"
import { Icon } from "@iconify/react"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import SimpleHeader from "../header/simple-header"
import { Input } from "../common/FormControl"
import TextField from "@mui/material/TextField"
import { Trees } from "../../utilities/imgImport"
import { ROUTES } from "../../utilities/routes"
import PrivacyPolicy from "../verify-identity/privacy-policy"
import languageDropdown from "react-lang-dropdown"
import languages from "../../assets/lang/languages.json"

const content = `
I declare that i am at least 16 years of age; I agree to the collection, processing or storage of my personal information, including biometic data, by NDB for the purpose(s) of identiy verification; that the information I provide is true and accurate to the best of my knowledge; and I shall be fully responsible in case I provide wrong information or any of the documents I use are fake, forged, counterfeit etc.
`

const Verifier = ({ isFirst }) => {
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        business_name: "",
        email: "",
        us_citizen: true,
    })
    const { business_name, email } = state

    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])

    return (
        <div className="d-flex justify-content-center verifiers">
            <div className="mx-2 input-name">
                <Input
                    type="text"
                    name="business_name"
                    label={isFirst ? "Full Name" : null}
                    value={business_name}
                    onChange={handleInput}
                    placeholder="Enter name"
                />
            </div>
            <div className="mx-2 input-name">
                <Input
                    type="text"
                    name="email"
                    label={isFirst ? "Email" : null}
                    value={email}
                    onChange={handleInput}
                    placeholder="Enter email"
                />
            </div>
            <div className="us-citizen-radio mx-2">
                <p className="form-label us-citizen-radio_title">
                    {isFirst ? "Holds US Citizenship or Residency" : ""}
                </p>
                <form
                    className="us-citizen-radio_buttons"
                    onChange={(e) => setState({ us_citizen: e.target.value })}
                >
                    <label className="container">
                        Yes
                        <input
                            type="radio"
                            id="yes"
                            defaultChecked
                            name="us_citizen"
                            value={true}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">
                        No
                        <input type="radio" id="no" name="us_citizen" value={false} />
                        <span className="checkmark"></span>
                    </label>
                </form>
            </div>
        </div>
    )
}

const VerifyCompany = () => {
    const [language, LanguageDropdown] = languageDropdown.useDropdown(languages)
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        step: -1,
        file: null,
        fileOpen: false,
        business_name: "",
        incop_date: new Date(),
        register_num: "",
        verifiers: ["1"],
    })
    const { step, business_name, incop_date, verifiers } = state

    const [agree, setAgree] = useState(false)

    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])

    return (
        <main className="verify-company">
            <SimpleHeader />
            <section>
                <div className="container verify-company_container">
                    <div className="header">
                        <h4 className="text-center mt-2 mb-4">{language.content.verify_company}</h4>
                        {step !== -1 && step <= 2 && (
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
                        )}
                    </div>
                    {step === -1 && (
                        <div className="verify-step0">
                            <LanguageDropdown />
                            <p className="pre-wrap">
                                <b>{language.content?.subtitle}</b>
                                {language.content?.content}
                            </p>
                            <PrivacyPolicy
                                agree={agree}
                                setAgree={(res) => setAgree(res)}
                                lang={language.content}
                            />
                        </div>
                    )}
                    {step === 0 && (
                        <div className="verify-step1">
                            <Input
                                type="text"
                                name="business_name"
                                label="Business Name"
                                value={business_name}
                                onChange={handleInput}
                                placeholder="Name"
                            />
                            <p className="form-label mt-3">Incoporation Date</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker
                                    inputFormat="yyyy-MM-dd"
                                    value={incop_date}
                                    onChange={(newValue) => {
                                        setState({ incop_date: newValue })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="verify-step2">
                            <p className="text-center my-4">
                                For Directors and shareholders owning more that 25% of the business
                                please verify
                            </p>
                            {verifiers.map((row, i) => (
                                <Verifier key={i} isFirst={i === 0} />
                            ))}
                            <button
                                className="btn-primary me-3 d-flex align-items-center justify-content-center add-another"
                                onClick={() => {
                                    let newVerifiers = [...verifiers, ""]
                                    console.log(state)
                                    setState({ verifiers: newVerifiers })
                                }}
                            >
                                <Icon icon="codicon:add" />
                                Add Another
                            </button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="verify-step3">
                            <p className="text-center my-4 verify-step3_title">
                                Thank you, {business_name} have been successfully verified.
                            </p>
                            <span>
                                As soley the data processor, NDB acknowledges your right to request
                                access, erasure, and retention of your data. Contact out Data
                                Compliance Officer at
                            </span>
                            <Link to="#" className="link">
                                {" "}
                                privacy@ndb.technology
                            </Link>
                        </div>
                    )}
                    <div className="btn-group">
                        {step < 1 && (
                            <button
                                className="btn-primary me-3"
                                onClick={() => {
                                    navigate(ROUTES.profile)
                                }}
                            >
                                Cancel
                            </button>
                        )}
                        {step > 0 && step < 2 && (
                            <button
                                className="btn-primary me-3"
                                onClick={() => setState({ step: step - 1 })}
                            >
                                Back
                            </button>
                        )}
                        {step === 2 ? (
                            <button
                                className="btn-primary btn-complete"
                                onClick={() => navigate(ROUTES.profile)}
                            >
                                Complete
                            </button>
                        ) : (
                            <button
                                disabled={
                                    (step === -1 && !agree) ||
                                    (step === 0 && business_name.length === 0)
                                }
                                className="btn-primary btn-upload"
                                onClick={() => setState({ step: step + 1 })}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
                {step !== -1 && <img src={Trees} alt="trees" className="trees-img w-100" />}
            </section>
        </main>
    )
}

export default VerifyCompany
