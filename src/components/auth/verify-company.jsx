import { Link } from "gatsby"
import React, { useReducer, useCallback, useRef } from "react"
import Select, { components } from "react-select"
import useFileUpload from "react-use-file-upload"
import Modal from "react-modal"
import Header from "../common/header"
import { CheckBox, Input } from "../common/FormControl"
import { formatBytes } from "../../utilities/number"
import { countries } from "../../utilities/staticData"
import { NewDoc, PhotoIcon, Trees, CloseIcon } from "../../utilities/imgImport"

const { Option } = components

const content = `Before we start, please prepare your company document and make sure it is valid.

We also require you to accept our Terms and conditions, and to agree to our processing of your personal data.
`

const accept_docs = [
    { value: "0", label: "Registration certificate" },
    {
        value: "1",
        label: "Certificate/licence issued by the municipal authorities under Shop and Establishment Act",
    },
    {
        value: "2",
        label: "Certificate/registration document issued by Sales Tax/Service Tax/Professional Tax authorities",
    },
    { value: "3", label: "Sales and income tax returns" },
    { value: "4", label: "IEC (Importer Exporter Code) " },
    { value: "5", label: "Transparency Registry Extract" },
    { value: "6", label: "Registration certificate" },
    { value: "7", label: "Utility bills such as electricity, water, and landline telephone bills" },
]

const CompanyDoc = (props) => (
    <Option {...props}>
        <p className="company-doc">{props.data.label}</p>
    </Option>
)

const VerifyCompany = () => {
    const inputRef = useRef()

    const { files, handleDragDropEvent, setFiles, removeFile } = useFileUpload()
    const [state, setState] = useReducer((old, action) => ({ ...old, ...action }), {
        agree: false,
        accept: false,
        step: -1,
        country: countries[0],
        file: null,
        fileOpen: false,
        company_name: "",
        register_num: "",
        accept_doc: accept_docs[0],
    })
    const { agree, accept, step, country, file, fileOpen, company_name, register_num, accept_doc } =
        state

    const handleAgreeOption = useCallback(
        (e) => {
            setState({ agree: !agree })
        },
        [agree]
    )
    const handleAcceptOption = useCallback(
        (e) => {
            setState({ accept: !accept })
        },
        [accept]
    )
    const handleInput = useCallback((e) => {
        e.preventDefault()
        setState({ [e.target.name]: e.target.value })
    }, [])

    const FileList = ({ data }) => {
        return (
            <li className="file-item">
                <div className="file-item__info">
                    <div
                        onClick={() => {
                            setState({ fileOpen: true })
                            setState({ file: data })
                        }}
                        onKeyDown={() => setState({ fileOpen: true })}
                        role="presentation"
                    >
                        <img className="mb-2" src={PhotoIcon} alt="file img" />
                        <div>
                            <p className="file-name">{data.name}</p>
                            <p className="file-size">{formatBytes(data.size)}</p>
                        </div>
                    </div>
                    <p
                        className="remove-file"
                        onClick={() => removeFile(data.name)}
                        onKeyDown={() => removeFile(data.name)}
                        role="presentation"
                    >
                        <span></span>
                    </p>
                </div>
                <p className="file-item__name">{data.name}</p>
            </li>
        )
    }
    return (
        <main className="verify-page">
            <Header />
            <section className="d-flex align-items-start align-items-xl-center">
                <div className="container">
                    <h4 className="text-center mt-2 mb-4">Verify Company</h4>
                    {step !== -1 && step < 2 && (
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
                    {step === -1 && (
                        <div className="verify-step0">
                            <p className="pre-wrap">{content}</p>
                            <div className="form-group">
                                <CheckBox
                                    name="agree"
                                    type="checkbox"
                                    value={agree}
                                    onChange={handleAgreeOption}
                                >
                                    I agree to the processing of my company data, as described
                                    in&nbsp;
                                    <Link to="/" className="txt-green">
                                        the Consent to Personal Data Processing.
                                    </Link>
                                </CheckBox>
                                <CheckBox
                                    name="accept"
                                    type="checkbox"
                                    value={accept}
                                    onChange={handleAcceptOption}
                                >
                                    By clicking Next, I accept the&nbsp;
                                    <Link to="/" className="txt-green">
                                        Terms and Conditions.
                                    </Link>
                                </CheckBox>
                            </div>
                        </div>
                    )}
                    {step === 0 && (
                        <div className="verify-step1 my-5">
                            <Select
                                options={countries}
                                value={country}
                                onChange={(v) => setState({ country: v })}
                                placeholder="Choose country"
                            />
                            <div className="mt-2"></div>
                            <Input
                                type="text"
                                name="company_name"
                                label="Company Name"
                                value={company_name}
                                onChange={handleInput}
                                placeholder="Name"
                            />
                            <Input
                                type="number"
                                name="register_num"
                                label="Registration Number"
                                value={register_num}
                                onChange={handleInput}
                                placeholder="Registration Number"
                            />
                        </div>
                    )}
                    {step === 1 && (
                        <div className="verify-step2">
                            <h5 className="text-center">Identity document</h5>
                            <div className="d-flex flex-wrap justify-content-center my-0 my-xxl-5">
                                <div className="upload-doc me-md-5">
                                    <div className="mb-3">
                                        <div
                                            className={`file-upload ${
                                                files.length > 0 && "uploaded"
                                            }`}
                                            onDragEnter={handleDragDropEvent}
                                            onDragOver={handleDragDropEvent}
                                            onDrop={(e) => {
                                                handleDragDropEvent(e)
                                                setFiles(e, "a")
                                            }}
                                            role="presentation"
                                        >
                                            <div className="new-doc">
                                                <img src={NewDoc} alt="new doc" />
                                            </div>
                                            <p className="file-browse">
                                                Drag & drop files here or{" "}
                                                <span
                                                    onClick={() => inputRef.current.click()}
                                                    onKeyDown={() => inputRef.current.click()}
                                                    role="presentation"
                                                >
                                                    browse
                                                </span>
                                            </p>

                                            <input
                                                ref={inputRef}
                                                type="file"
                                                multiple
                                                style={{ display: "none" }}
                                                onChange={(e) => setFiles(e, "a")}
                                            />
                                        </div>
                                    </div>
                                    <ul className="file-list">
                                        {files?.map((item, idx) => (
                                            <FileList key={idx} data={item} />
                                        ))}
                                    </ul>
                                </div>
                                {files.length > 0 && (
                                    <div className="uploaded-list">
                                        <p className="uploaded-list__text">You uploaded:</p>
                                        <ul className="file-list">
                                            {files?.map((item, idx) => (
                                                <FileList key={idx} data={item} />
                                            ))}
                                        </ul>

                                        <button
                                            className="btn-add"
                                            onClick={() => inputRef.current.click()}
                                        >
                                            <span></span>Add more files
                                        </button>
                                    </div>
                                )}
                                <div className="upload-rule">
                                    <p className="form-label px-0">Company Document</p>
                                    <Select
                                        options={accept_docs}
                                        value={accept_doc}
                                        onChange={(v) => setState({ accept_doc: v })}
                                        placeholder="Company Document"
                                        components={{
                                            Option: CompanyDoc,
                                        }}
                                        className="doc-select"
                                    />
                                    <p className="doc-rule">
                                        We accept registration certificate, Sales and income tax
                                        returns, IEC (Importer Exporter Code), Transparency Registry
                                        Extract, Utility bills such as electricity, water, and
                                        landline telephone bills.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step < 2 && (
                        <div className="btn-group">
                            {step > 0 && (
                                <button
                                    className="btn-primary me-3"
                                    onClick={() => setState({ step: step - 1 })}
                                >
                                    Back
                                </button>
                            )}
                            {step === 1 ? (
                                files.length === 0 ? (
                                    <button
                                        className="btn-primary btn-upload"
                                        onClick={() => inputRef.current.click()}
                                    >
                                        Upload
                                    </button>
                                ) : (
                                    <button className="btn-primary btn-upload">Complete</button>
                                )
                            ) : (
                                <button
                                    className="btn-primary"
                                    onClick={() => setState({ step: step + 1 })}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {step !== -1 && <img src={Trees} alt="trees" className="trees-img w-100" />}
            </section>
            <Modal
                isOpen={fileOpen}
                onRequestClose={() => setState({ fileOpen: false })}
                ariaHideApp={false}
                className="file-modal"
                overlayClassName="file-modal__overlay"
            >
                <div className="phone-modal__header">
                    <div
                        onClick={() => setState({ fileOpen: false })}
                        onKeyDown={() => setState({ fileOpen: false })}
                        role="button"
                        tabIndex="0"
                    >
                        <img width="14px" height="14px" src={CloseIcon} alt="close" />
                    </div>
                </div>
                {file && (
                    <div className="file-modal__body">
                        <img src={URL.createObjectURL(file)} alt="file" />
                        <p>{file.name}</p>
                    </div>
                )}
                <button
                    className="btn-primary"
                    onClick={() => {
                        removeFile(file.name)
                        setState({ fileOpen: false })
                    }}
                    onKeyDown={() => {
                        removeFile(file.name)
                        setState({ fileOpen: false })
                    }}
                >
                    Delete
                </button>
            </Modal>
        </main>
    )
}

export default VerifyCompany
