import React, { useState } from "react"
import Header from "../components/common/header"
import FigureItem from "../components/FigureItem"
import { Trees } from "../utilities/imgImport"
import { figures } from "../utilities/staticData"
import StarRatings from "react-star-ratings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import names from "random-names-generator"
import Modal from "react-modal"

const Profile = () => {
    const [selectedId, setSelectId] = useState(0)
    const [selected, setSelect] = useState(false)
    const [randomName, setRandomName] = useState("Tesla")
    const [modalIsOpen, setIsOpen] = useState(false)

    const handleFigure = (id) => {
        setSelectId(id)
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
        setSelect(false)
    }

    return (
        <main className="profile-page">
            <Header />
            <section className="container position-relative h-100">
                <div className="figure-section">
                    <h3 className="header-text">Select one Historical Figure</h3>
                    <div className="row">
                        <div className="figure-select col-md-5 col-lg-6">
                            <input type="search" className="figure-search" placeholder="Search" />
                            <div className="row">
                                {figures.map((item, idx) => (
                                    <div
                                        className="col-lg-3 col-6 mb-3"
                                        key={idx}
                                        style={{ opacity: idx === selectedId ? "1" : "0.5" }}
                                    >
                                        <FigureItem
                                            figure={item}
                                            active={idx === selectedId}
                                            onFigureSelect={handleFigure}
                                        ></FigureItem>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="figure-intro col-md-7 col-lg-6">
                            <div className="figure-intro__box">
                                {!selected && (
                                    <p className="figure-name">
                                        {figures[selectedId].firstname +
                                            " " +
                                            figures[selectedId].lastname}
                                    </p>
                                )}
                                <div className="figure-intro__box--body">
                                    {!selected ? (
                                        <>
                                            <div className="d-flex justify-content-around">
                                                <img
                                                    src={figures[selectedId].avatar}
                                                    alt="figure avatar"
                                                />
                                                <div className="stars">
                                                    {figures[selectedId].stars.map((item, idx) => (
                                                        <div
                                                            className="row align-items-center"
                                                            key={idx}
                                                        >
                                                            <div className="col-6">
                                                                <p className="ability">
                                                                    {item.type}
                                                                </p>
                                                            </div>
                                                            <div className="col-6">
                                                                <StarRatings
                                                                    numberOfStars={item.rates}
                                                                    starDimension="17px"
                                                                    starSpacing="3px"
                                                                    starRatedColor="#ffffff"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-5 mb-4">
                                                {figures[selectedId].abilities.map((item, idx) => (
                                                    <div className="row mb-1" key={idx}>
                                                        <div className="col-4">
                                                            <p className="fw-bold">{item.title}</p>
                                                        </div>
                                                        <div className="col-8 p-0">
                                                            <p>{item.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p>{figures[selectedId].intro}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-end">
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    className="text-white fa-2x"
                                                    onClick={() => setSelect(false)}
                                                    onKeyDown={() => setSelect(false)}
                                                    role="button"
                                                    tabIndex="0"
                                                />
                                            </p>
                                            <div className="d-flex align-items-end justify-content-between">
                                                <h3 className="random-display mb-0">
                                                    {randomName}.
                                                </h3>
                                                <div className="random-generate">
                                                    <p className="form-label">Your display name</p>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={randomName}
                                                        onChange={(e) =>
                                                            setRandomName(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <p
                                                className="random-text"
                                                onClick={() =>
                                                    setRandomName(names.random().substring(0, 7))
                                                }
                                                onKeyDown={() =>
                                                    setRandomName(names.random().substring(0, 7))
                                                }
                                                role="presentation"
                                            >
                                                Random generate
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {selected ? (
                                <button className="btn-primary text-uppercase w-100 mt-3">
                                    confirm
                                </button>
                            ) : (
                                <button
                                    className="btn-primary text-uppercase w-100 mt-3"
                                    onClick={() => setSelect(true)}
                                >
                                    select
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <img src={Trees} alt="trees" className="trees-img w-100" />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="figure-modal"
                overlayClassName="figure-modal__overlay"
            >
                <div className="figure-intro__box">
                    <p className="mobile-figure-header">
                        {figures[selectedId].firstname + " " + figures[selectedId].lastname}
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="text-white modal-close"
                            onClick={() => closeModal()}
                            onKeyDown={() => closeModal()}
                            role="button"
                            tabIndex="0"
                        />
                    </p>
                    <div className="figure-intro__box--body">
                        {!selected ? (
                            <>
                                <div className="stars">
                                    {figures[selectedId].stars.map((item, idx) => (
                                        <div className="row align-items-center" key={idx}>
                                            <div className="col-6">
                                                <p className="ability">{item.type}</p>
                                            </div>
                                            <div className="col-6">
                                                <StarRatings
                                                    numberOfStars={item.rates}
                                                    starDimension="17px"
                                                    starSpacing="3px"
                                                    starRatedColor="#ffffff"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="my-4">
                                    {figures[selectedId].abilities.map((item, idx) => (
                                        <div className="row mb-1" key={idx}>
                                            <div className="col-5">
                                                <p className="fw-bold">{item.title}</p>
                                            </div>
                                            <div className="col-7 p-0">
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p>{figures[selectedId].intro}</p>
                            </>
                        ) : (
                            <>
                                <div className="d-flex align-items-end justify-content-between">
                                    <h3 className="me-3 mb-0">{randomName}.</h3>
                                    <div className="form-group w-100">
                                        <p className="form-label">Your display name</p>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={randomName}
                                            onChange={(e) => setRandomName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <p
                                    className="text-end txt-underline"
                                    onClick={() => setRandomName(names.random().substring(0, 7))}
                                    onKeyDown={() => setRandomName(names.random().substring(0, 7))}
                                    role="presentation"
                                >
                                    Random generate
                                </p>
                            </>
                        )}
                    </div>
                </div>
                {selected ? (
                    <button className="btn-primary text-uppercase w-100 mt-3">confirm</button>
                ) : (
                    <button
                        className="btn-primary text-uppercase w-100 mt-3"
                        onClick={() => setSelect(true)}
                    >
                        select
                    </button>
                )}
            </Modal>
        </main>
    )
}

export default Profile
