import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "gatsby"
import { Icon } from "@iconify/react"
import parse from 'html-react-parser'
import styled from "styled-components"

import Seo from "../../../components/seo"
import Stepper from "../../../components/admin/Stepper"
import LayoutForCreate from "../../../components/admin/LayoutForCreate"
import { Alert, Rating } from "@mui/material"
import { capitalizeFirstLetter } from "../../../utilities/string"
import DressupModal from "../../../components/dress-up/dressup-modal"
import { EmptyAvatar } from "../../../utilities/imgImport";
import { create_New_Avatar } from './../../../redux/actions/avatarAction';

const CreateAvatar = () => {
    const dispatch = useDispatch();
    const avatarComponents = useSelector(state => state.avatarComponents);
    const { hairStyles, facialStyles, expressions, hats, others } = avatarComponents;

    const [currentStep, setCurrentStep] = useState(1)
    const [showError, setShowError] = useState(false)
    const [isDressUpModalOpen, setIsDressUpModalOpen] = useState(false)

    //------- Avatar Data and Validation
    const [avatarItems, setAvatarItems] = useState({
        hair: '',
        hairColor: '',
        facialStyle: '',
        expression: '',
        hat: '',
        other: ''
    });
    const [avatarName, setAvatarName] = useState({name: '', surname: ''});

    const avatarDataError = useMemo(() => {
        if(!avatarName.name) return 'Name is required';
        if(!avatarName.surname) return 'Surname is required';
        return '';
    }, [avatarName]);

    // console.log(avatarItems)

    //-------- Stats Data and Validation
    // Stats Data
    const [stats, setStats] = useState([
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
        if(avatarDataError) {
            setShowError(true);
            return;
        }
        setCurrentStep(2)
        setShowError(false)
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
        const skillSet = stats.map(item => {
            return { skill: item.title, skillRate: item.stars };
        });
        const avatarSet = Object.keys(avatarItems).map(item => {
            if(item === 'hairColor') return;
            return {groupId: item, compId: avatarItems[item]};
        });
        const factsSet = factsDetail.facts;
        dispatch(create_New_Avatar({
            name: avatarName.name,
            surname: avatarName.surname,
            shortName: avatarName.name + ' ' + avatarName.surname,
            skillSet,
            avatarSet,
            factsSet,
            details: factsDetail.details,
            hairColor: avatarItems.hairColor
        }));
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
                                {showError ? (
                                    avatarDataError ? (
                                        <Alert severity="error">{avatarDataError}</Alert>
                                    ) : (
                                        <Alert severity="success">
                                            Success! Please click Next Button
                                        </Alert>
                                    )
                                ) : (
                                    ""
                                )}
                                <div className="avatar_div">
                                    <div className="preview_mobile mb-3">
                                        <div className="profile">
                                            <div className="image_div">
                                                <img src={EmptyAvatar} alt="back" />
                                                {avatarItems.hairColor && (<>
                                                    <Hair hairColor={avatarItems.hairColor} style={{top: `${hairStyles[avatarItems.hairStyle].top}%`, left: `${hairStyles[avatarItems.hairStyle].left}%`, width: `${hairStyles[avatarItems.hairStyle].width}%`}}>
                                                        {parse(hairStyles[avatarItems.hairStyle].svg)}
                                                    </Hair>
                                                    <div style={{top: `${expressions[avatarItems.expression].top}%`, left: `${expressions[avatarItems.expression].left}%`, width: `${expressions[avatarItems.expression].width}%`}}>
                                                        {parse(expressions[avatarItems.expression].svg)}
                                                    </div>
                                                    <div style={{top: `${facialStyles[avatarItems.facialStyle].top}%`, left: `${facialStyles[avatarItems.facialStyle].left}%`, width: `${facialStyles[avatarItems.facialStyle].width}%`}}>
                                                        {parse(facialStyles[avatarItems.facialStyle].svg)}
                                                    </div>
                                                    <div style={{top: `${hats[avatarItems.hat].top}%`, left: `${hats[avatarItems.hat].left}%`, width: `${hats[avatarItems.hat].width}%`}}>
                                                        {parse(hats[avatarItems.hat].svg)}
                                                    </div>
                                                    <div style={{top: `${others[avatarItems.other].top}%`, left: `${others[avatarItems.other].left}%`, width: `${others[avatarItems.other].width}%`}}>
                                                        {parse(others[avatarItems.other].svg)}
                                                    </div>
                                                </>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="name_div">
                                        <p>Name</p>
                                        <input
                                            className="black_input"
                                            value={avatarName.name}
                                            onChange={(e) => setAvatarName({...avatarName, name: e.target.value})}
                                        />
                                        <p className="mt-3">Surname</p>
                                        <input
                                            className="black_input"
                                            value={avatarName.surname}
                                            onChange={(e) => setAvatarName({...avatarName, surname: e.target.value})}
                                        />
                                    </div>
                                    <div className="items_div">
                                        <p>Add Items</p>
                                        <button className="btn previous" onClick={() => setIsDressUpModalOpen(true)}>Add Avatar Items</button>
                                    </div>
                                    <div className="preview">
                                        <div className="profile">
                                            <div className="image_div">
                                                <img src={EmptyAvatar} alt="back" />
                                                {avatarItems.hairColor && (<>
                                                    <Hair hairColor={avatarItems.hairColor} style={{top: `${hairStyles[avatarItems.hairStyle].top}%`, left: `${hairStyles[avatarItems.hairStyle].left}%`, width: `${hairStyles[avatarItems.hairStyle].width}%`}}>
                                                        {parse(hairStyles[avatarItems.hairStyle].svg)}
                                                    </Hair>
                                                    <div style={{top: `${expressions[avatarItems.expression].top}%`, left: `${expressions[avatarItems.expression].left}%`, width: `${expressions[avatarItems.expression].width}%`}}>
                                                        {parse(expressions[avatarItems.expression].svg)}
                                                    </div>
                                                    <div style={{top: `${facialStyles[avatarItems.facialStyle].top}%`, left: `${facialStyles[avatarItems.facialStyle].left}%`, width: `${facialStyles[avatarItems.facialStyle].width}%`}}>
                                                        {parse(facialStyles[avatarItems.facialStyle].svg)}
                                                    </div>
                                                    <div style={{top: `${hats[avatarItems.hat].top}%`, left: `${hats[avatarItems.hat].left}%`, width: `${hats[avatarItems.hat].width}%`}}>
                                                        {parse(hats[avatarItems.hat].svg)}
                                                    </div>
                                                    <div style={{top: `${others[avatarItems.other].top}%`, left: `${others[avatarItems.other].left}%`, width: `${others[avatarItems.other].width}%`}}>
                                                        {parse(others[avatarItems.other].svg)}
                                                    </div>
                                                </>)}
                                            </div>
                                        </div>
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
                            <DressupModal isModalOpen={isDressUpModalOpen} setIsModalOpen={setIsDressUpModalOpen} setDressUpAvatarItems={setAvatarItems} />
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
                                        {avatarName ? 
                                            `${capitalizeFirstLetter(avatarName.name)} ${capitalizeFirstLetter(avatarName.surname)}`:
                                            "Nicolla Tesla"
                                        }
                                    </p>
                                    <div className="row avatarStats">
                                        <div className="col-sm-5">
                                            <div className="profile">
                                                <div className="image_div">
                                                    <img src={EmptyAvatar} alt="back" />
                                                    {avatarItems.hairColor && (<>
                                                        <Hair hairColor={avatarItems.hairColor} style={{top: `${hairStyles[avatarItems.hairStyle].top}%`, left: `${hairStyles[avatarItems.hairStyle].left}%`, width: `${hairStyles[avatarItems.hairStyle].width}%`}}>
                                                            {parse(hairStyles[avatarItems.hairStyle].svg)}
                                                        </Hair>
                                                        <div style={{top: `${expressions[avatarItems.expression].top}%`, left: `${expressions[avatarItems.expression].left}%`, width: `${expressions[avatarItems.expression].width}%`}}>
                                                            {parse(expressions[avatarItems.expression].svg)}
                                                        </div>
                                                        <div style={{top: `${facialStyles[avatarItems.facialStyle].top}%`, left: `${facialStyles[avatarItems.facialStyle].left}%`, width: `${facialStyles[avatarItems.facialStyle].width}%`}}>
                                                            {parse(facialStyles[avatarItems.facialStyle].svg)}
                                                        </div>
                                                        <div style={{top: `${hats[avatarItems.hat].top}%`, left: `${hats[avatarItems.hat].left}%`, width: `${hats[avatarItems.hat].width}%`}}>
                                                            {parse(hats[avatarItems.hat].svg)}
                                                        </div>
                                                        <div style={{top: `${others[avatarItems.other].top}%`, left: `${others[avatarItems.other].left}%`, width: `${others[avatarItems.other].width}%`}}>
                                                            {parse(others[avatarItems.other].svg)}
                                                        </div>
                                                    </>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
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

export default CreateAvatar;

const Hair = styled.div`
    svg>path {
        fill: ${props => {
            return props.hairColor? props.hairColor: '#626161';
        }}
    }
`;