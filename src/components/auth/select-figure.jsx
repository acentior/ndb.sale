import Header from "../header"
import Modal from "react-modal"
import { navigate } from "gatsby"
import FigureItem from "../FigureItem"
import Loading from "../common/Loading"
import names from "random-names-generator"
import StarRatings from "react-star-ratings"
import { ROUTES } from "../../utilities/routes"
import React, { useState } from "react"
import CustomSpinner from "../common/custom-spinner"
import { useMutation, useQuery } from "@apollo/client"
import { CloseIcon, Tesla, Trees } from "../../utilities/imgImport"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SET_AVATAR } from "../../apollo/graghqls/mutations/Auth"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { GET_AVATARS } from "../../apollo/graghqls/querys/AvatarComponent"
import AvatarImage from "../admin/shared/AvatarImage"

const SelectFigure = () => {
    // Containers
    const [error, setError] = useState("")
    const [pending, setPending] = useState(false)
    const [selected, setSelect] = useState(false)
    const [selectedId, setSelectId] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [userDataLoading, setUserDataLoading] = useState(true)
    const [avatarsLoading, setAvatarsLoading] = useState(true)
    const [figuresArray, setFiguresArray] = useState([])
    const { data: userData } = useQuery(GET_USER, {
        onCompleted: () => {
            if (userData.getUser.avatar) return navigate(ROUTES.profile)
            return setUserDataLoading(false)
        },
        fetchPolicy: "network-only",
    })
    const [randomName, setRandomName] = useState(figuresArray[selectedId]?.lastname)

    // Queries and Mutations
    const { data: avatars } = useQuery(GET_AVATARS, {
        onCompleted: () => {
            setFiguresArray(
                avatars.getAvatars?.map((item, index) => {
                    return {
                        id: index,
                        avatar: {
                            avatarSet: item.avatarSet,
                        },
                        firstname: item.fname,
                        lastname: item.surname,
                        stars: item.skillSet.map((skill) => {
                            return {
                                type: skill.name,
                                rates: skill.rate,
                            }
                        }),
                        abilities: item.factsSet.map((fact) => {
                            return {
                                title: fact.topic,
                                text: fact.detail,
                            }
                        }),
                        intro: item.details,
                    }
                })
            )
            return setAvatarsLoading(false)
        },
        fetchPolicy: "network-only",
    })
    const [setAvatar] = useMutation(SET_AVATAR, {
        errorPolicy: "ignore",
        onCompleted: (data) => {
            setPending(false)
            if (data?.setAvatar === "Success") navigate(ROUTES.profile)
            else setError(`${figuresArray[selectedId].lastname}.${randomName} Already Exists`)
        },
    })

    const loadingPage = avatarsLoading || userDataLoading

    // Methods
    const handleFigure = (id) => {
        setSelectId(id)
        setIsOpen(true)
        setRandomName(figuresArray[id].lastname)
    }
    const closeModal = () => {
        setIsOpen(false)
        setSelect(false)
    }
    const handleOnConfirmButtonClick = (e) => {
        e.preventDefault()
        setPending(true)
        setError("")
        setAvatar({
            variables: {
                prefix: figuresArray[selectedId].lastname,
                name: randomName,
            },
        })
    }

    if (loadingPage) return <Loading />
    else
        return (
            <main className="profile-page">
                <Header />
                <section className="container position-relative h-100">
                    <div className="figure-section">
                        <h3 className="header-text">Select one Historical Figure</h3>
                        <div className="row">
                            <div className="figure-select col-md-5 col-lg-6">
                                <input
                                    type="text"
                                    className="figure-search"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <div className="row figure-select-items-section">
                                    {figuresArray
                                        .filter((item) =>
                                            (item.firstname + item.lastname)
                                                .toLowerCase()
                                                .includes(searchValue.toLowerCase())
                                        )
                                        .map((item, idx) => (
                                            <div
                                                className="col-lg-3 col-6 mb-3"
                                                key={idx}
                                                style={{
                                                    opacity: idx === selectedId ? "1" : "0.5",
                                                }}
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
                                            {figuresArray[selectedId].firstname +
                                                " " +
                                                figuresArray[selectedId].lastname}
                                        </p>
                                    )}
                                    <div className="figure-intro__box--body">
                                        {!selected ? (
                                            <>
                                                <div className="d-flex justify-content-around">
                                                    <div className="mt-3 scale-70">
                                                        <AvatarImage
                                                            avatar={figuresArray[selectedId].avatar}
                                                        />
                                                    </div>
                                                    <div className="stars">
                                                        {figuresArray[selectedId].stars.map(
                                                            (item, idx) => (
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
                                                                            numberOfStars={
                                                                                item.rates
                                                                            }
                                                                            starDimension="17px"
                                                                            starSpacing="3px"
                                                                            starRatedColor="#ffffff"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-5 mb-4">
                                                    {figuresArray[selectedId].abilities.map(
                                                        (item, idx) => (
                                                            <div className="row mb-1" key={idx}>
                                                                <div className="col-4">
                                                                    <p className="fw-bold">
                                                                        {item.title}
                                                                    </p>
                                                                </div>
                                                                <div className="col-8 p-0">
                                                                    <p>{item.text}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <p>{figuresArray[selectedId].intro}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-end">
                                                    <div
                                                        onClick={() => setSelect(false)}
                                                        onKeyDown={() => setSelect(false)}
                                                        role="button"
                                                        tabIndex="0"
                                                    >
                                                        <img
                                                            width="27px"
                                                            height="27px"
                                                            src={CloseIcon}
                                                            alt="close"
                                                        />
                                                    </div>
                                                </p>
                                                <div className="main-content">
                                                    <div className="d-flex align-items-end flex-column">
                                                        <div className="d-flex align-items-end justify-content-start">
                                                            <h3 className="random-display mb-0 fw-bold me-4">
                                                                {figuresArray[selectedId].lastname}.
                                                            </h3>
                                                            <div className="random-generate">
                                                                <p className="form-label">
                                                                    Your display name
                                                                </p>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={randomName}
                                                                    onChange={(e) =>
                                                                        setRandomName(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <p
                                                            className="random-text"
                                                            onClick={() =>
                                                                setRandomName(
                                                                    names.random().substring(0, 7)
                                                                )
                                                            }
                                                            onKeyDown={() =>
                                                                setRandomName(
                                                                    names.random().substring(0, 7)
                                                                )
                                                            }
                                                            role="presentation"
                                                        >
                                                            Random generate
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {error && (
                                        <span className="errorsapn">
                                            <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                                        </span>
                                    )}
                                    {selected ? (
                                        <button
                                            className="btn btn-outline-light rounded-0 text-uppercase w-100 d-flex align-items-center justify-content-center text-uppercase fw-bold fs-24px"
                                            disabled={pending}
                                            onClick={handleOnConfirmButtonClick}
                                        >
                                            <div
                                                className={`${pending ? "opacity-1" : "opacity-0"}`}
                                            >
                                                <CustomSpinner />
                                            </div>
                                            <div className={`${pending ? "ms-3" : "pe-4"}`}>
                                                confirm
                                            </div>
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
                            {figuresArray[selectedId].firstname +
                                " " +
                                figuresArray[selectedId].lastname}

                            <div
                                onClick={() => closeModal()}
                                onKeyDown={() => closeModal()}
                                role="button"
                                tabIndex="0"
                                className="ms-auto"
                            >
                                <img width="14px" height="14px" src={CloseIcon} alt="close" />
                            </div>
                        </p>
                        <div className="figure-intro__box--body">
                            {!selected ? (
                                <>
                                    <div className="stars">
                                        {figuresArray[selectedId].stars.map((item, idx) => (
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
                                        {figuresArray[selectedId].abilities.map((item, idx) => (
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
                                    <p>{figuresArray[selectedId].intro}</p>
                                </>
                            ) : (
                                <>
                                    <div className="main-content">
                                        <div className="d-flex align-items-end justify-content-start">
                                            <h3 className="random-display mb-0 fw-bold me-4">
                                                {randomName}.
                                            </h3>
                                            <div className="random-generate">
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
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            </main>
        )
}

export default SelectFigure
