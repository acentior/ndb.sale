import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import { Icon } from "@iconify/react"

import Seo from "../../../components/seo"
import Stepper from "../../../components/admin/Stepper"
import LayoutForCreate from "../../../components/admin/LayoutForCreate"

import { Alert, Rating } from "@mui/material"
import Select from "react-select"

const CreateAvatar = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [showError, setShowError] = useState(false)

    //------- Avatar Data and Validation
    const avatarItemList = [
        { value: "hair", label: "Hair" },
        { value: "facial", label: "Facial" },
        { value: "expression", label: "Expression" },
        { value: "hats", label: "Hats" },
        { value: "accessories", label: "Accessories" },
    ]

    const [avatarItems, setAvatarItems] = useState({ item1: {}, item2: {}, item3: {} })
    const [avatarName, setAvatarName] = useState("")

    //-------- Stats Data and Validation
    // Stats Data
    const [stats, setStats] = useState([
        { title: "", stars: 0 },
        { title: "", stars: 0 },
        { title: "", stars: 0 },
        { title: "", stars: 0 },
        { title: "", stars: 0 },
    ])
    // Stats Data Validation
    const statsDataError = useMemo(() => {
        for (let i = 0; i < stats.length; i++) {
            if (!stats[i].title) return { index: i, item: "title", desc: "Input is required" }
            if (!stats[i].stars) return { index: i, item: "stars", desc: "Rating is required" }
        }
        return {}
    }, [stats])

    //--------- Facts, Detail Data and Validation
    // FactsDetail Data
    const [factsDetail, setFactsDetail] = useState({
        facts: [
            { topic: "", detail: "" },
            { topic: "", detail: "" },
            { topic: "", detail: "" },
        ],
        details: "",
    })
    // FactsDetail Validation
    const factsDataError = useMemo(() => {
        for (let i = 0; i < factsDetail.facts.length; i++) {
            if (!factsDetail.facts[i].topic)
                return { index: i, item: "topic", desc: "Topic is required" }
            if (!factsDetail.facts[i].detail)
                return { index: i, item: "detail", desc: "Detail is required" }
        }
        if (!factsDetail.details) return { item: "details", desc: "Details Data is required" }
        return {}
    }, [factsDetail])

    const setAvatarData = () => {
        // if(Object.values(roundDataError)[0]) return;
        setCurrentStep(2)
    }

    const setStatsData = () => {
        if (statsDataError.desc) {
            setShowError(true)
            return
        }
        setCurrentStep(3)
        setShowError(false)
    }

    const setFactsData = () => {
        if (factsDataError.desc) {
            setShowError(true)
            return
        }
        setCurrentStep(4)
        setShowError(false)
    }

    const handleSubmit = () => {
        alert("Created Avatar Successfully")
    }

    return (
        <>
            <Seo title="Create Avatar" />
            <main className="create-avatar-page">
                <LayoutForCreate>
                    <Link className="close" to="/admin">
                        <Icon icon="codicon:chrome-close" />
                    </Link>
                    <p className="subtitle">Create Avatar</p>
                    <Stepper currentStep={currentStep} texts={["Avatar", "Stats", "Facts"]} />
                    {currentStep === 1 && (
                        <>
                            <div className="input_div">
                                {/* {Object.values(roundDataError)[0]? <Alert severity="error">{Object.values(roundDataError)[0]}</Alert>: <Alert severity="success">Success! Please click Next Button</Alert>} */}
                                <div className="avatar_div">
                                    <div className="preview_mobile">
                                        <img src="/avatars/fermi.png" alt="fermi" />
                                        <p>Preview</p>
                                    </div>
                                    <div className="name_div">
                                        <p>Name</p>
                                        <input
                                            className="black_input"
                                            value={avatarName}
                                            onChange={(e) => setAvatarName(e.target.value)}
                                        />
                                    </div>
                                    <div className="items_div">
                                        <p>Add Items</p>
                                        {["item1", "item2", "item3"].map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <Select
                                                        value={avatarItems[item]}
                                                        onChange={(selected) => {
                                                            setAvatarItems({
                                                                ...avatarItems,
                                                                [item]: selected,
                                                            })
                                                        }}
                                                        options={avatarItemList}
                                                        styles={customSelectStyles}
                                                    />
                                                    <Icon icon="lucide:upload" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="preview">
                                        <p>Preview</p>
                                        <img src="/avatars/fermi.svg" alt="fermi" />
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <Link className="btn previous" to="/admin">
                                    Cancel
                                </Link>
                                <button className="btn next" onClick={setAvatarData}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="input_div">
                                <div className="stats_div">
                                    {showError ? (
                                        statsDataError.desc ? (
                                            <Alert severity="error">{statsDataError.desc}</Alert>
                                        ) : (
                                            <Alert severity="success">
                                                Success! Please click Next Button
                                            </Alert>
                                        )
                                    ) : (
                                        ""
                                    )}
                                    <p>Stats</p>
                                    {stats.map((stat, index) => {
                                        return (
                                            <div key={index}>
                                                <input
                                                    className={`black_input ${
                                                        showError &&
                                                        statsDataError.index === index &&
                                                        statsDataError.item === "title"
                                                            ? "error"
                                                            : ""
                                                    }`}
                                                    value={stat.title}
                                                    placeholder={`Stat${index + 1}`}
                                                    onChange={(e) => {
                                                        stats[index].title = e.target.value
                                                        setStats([...stats])
                                                    }}
                                                />
                                                <div
                                                    className={`rating ${
                                                        showError &&
                                                        statsDataError.index === index &&
                                                        statsDataError.item === "stars"
                                                            ? "error"
                                                            : ""
                                                    }`}
                                                >
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={stat.stars}
                                                        onChange={(event, newValue) => {
                                                            stats[index].stars = newValue
                                                            setStats([...stats])
                                                        }}
                                                        style={{ marginLeft: "5px" }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(1)}>
                                    Previous
                                </button>
                                <button className="btn next" onClick={setStatsData}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <div className="input_div">
                                <div className="facts_div">
                                    {showError ? (
                                        factsDataError.desc ? (
                                            <Alert severity="error">{factsDataError.desc}</Alert>
                                        ) : (
                                            <Alert severity="success">
                                                Success! Please click Next Button
                                            </Alert>
                                        )
                                    ) : (
                                        ""
                                    )}
                                    <p>Fast facts</p>
                                    {factsDetail.facts.map((fact, index) => {
                                        return (
                                            <div key={index} className="facts">
                                                <input
                                                    className={`black_input topic ${
                                                        showError &&
                                                        factsDataError.index === index &&
                                                        factsDataError.item === "topic"
                                                            ? "error"
                                                            : ""
                                                    }`}
                                                    placeholder="Topic"
                                                    value={fact.topic}
                                                    onChange={(e) => {
                                                        factsDetail.facts[index].topic =
                                                            e.target.value
                                                        setFactsDetail({ ...factsDetail })
                                                    }}
                                                />
                                                <input
                                                    className={`black_input detail ${
                                                        showError &&
                                                        factsDataError.index === index &&
                                                        factsDataError.item === "detail"
                                                            ? "error"
                                                            : ""
                                                    }`}
                                                    placeholder="Detail"
                                                    value={fact.detail}
                                                    onChange={(e) => {
                                                        factsDetail.facts[index].detail =
                                                            e.target.value
                                                        setFactsDetail({ ...factsDetail })
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                    <div className="details">
                                        <p>Details</p>
                                        <textarea
                                            className={`black_input ${
                                                showError && factsDataError.item === "details"
                                                    ? "error"
                                                    : ""
                                            }`}
                                            name="details"
                                            rows="3"
                                            maxLength="250"
                                            value={factsDetail.details}
                                            onChange={(e) =>
                                                setFactsDetail({
                                                    ...factsDetail,
                                                    details: e.target.value,
                                                })
                                            }
                                        />
                                        <span>{factsDetail.details.length}/250</span>
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(2)}>
                                    Previous
                                </button>
                                <button className="btn next" onClick={setFactsData}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                            <div className="input_div">
                                <div className="preview_div">
                                    <p className="name">
                                        {avatarName ? avatarName : "Gioacchino Failla"}
                                    </p>
                                    <div className="row avatarStats">
                                        <div className="col-sm-4">
                                            <img src="/avatars/failla.svg" alt="avatar" />
                                        </div>
                                        <div className="col-sm-8">
                                            {stats.map((stat, index) => {
                                                return (
                                                    <div key={index} className="row">
                                                        <div className="col-6">
                                                            <p title={stat.title}>{stat.title}</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={stat.stars}
                                                                readOnly
                                                                emptyIcon=" "
                                                                size="small"
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="facts">
                                        {factsDetail.facts.map((fact, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <div className="col-4">
                                                        <p>{fact.topic}</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p>{fact.detail}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="details">
                                        <p>{factsDetail.details}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="button_div">
                                <button className="btn previous" onClick={() => setCurrentStep(3)}>
                                    Previous
                                </button>
                                <button className="btn next" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>
                        </>
                    )}
                </LayoutForCreate>
            </main>
        </>
    )
}

export default CreateAvatar

const customSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: "white",
        backgroundColor: state.isSelected ? "#23c865" : "#1e1e1e",
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "#1e1e1e",
        borderRadius: 0,
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#1e1e1e",
        border: "1px solid white",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
}
