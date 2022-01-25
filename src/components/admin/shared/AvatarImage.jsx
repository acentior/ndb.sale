import React from "react"
import { useSelector } from "react-redux"
import parse from "html-react-parser"
import styled from "styled-components"
import { EmptyAvatar } from "../../../utilities/imgImport"

const AvatarImage = ({ avatar = {} }) => {
    const { avatarComponents } = useSelector((state) => state)

    return (
        <ImageDiv className="image_div">
            <img src={EmptyAvatar} alt="back" />
            {avatar.avatarSet &&
                avatar.avatarSet.map((item, index) => {
                    if (item.groupId === "hairStyle") {
                        return (
                            <Hair
                                key={index}
                                hairColor={avatar.hairColor}
                                style={{
                                    top: `${avatarComponents.hairStyles[item.compId]?.top}%`,
                                    left: `${avatarComponents.hairStyles[item.compId]?.left}%`,
                                    width: `${avatarComponents.hairStyles[item.compId]?.width}%`,
                                }}
                            >
                                {parse(
                                    avatarComponents.hairStyles[item.compId]
                                        ? avatarComponents.hairStyles[item.compId].svg
                                        : ""
                                )}
                            </Hair>
                        )
                    } else {
                        return (
                            <div
                                key={index}
                                style={{
                                    top: `${
                                        avatarComponents[`${item.groupId}s`][item.compId]?.top
                                    }%`,
                                    left: `${
                                        avatarComponents[`${item.groupId}s`][item.compId]?.left
                                    }%`,
                                    width: `${
                                        avatarComponents[`${item.groupId}s`][item.compId]?.width
                                    }%`,
                                }}
                            >
                                {parse(
                                    avatarComponents[`${item.groupId}s`][item.compId]
                                        ? avatarComponents[`${item.groupId}s`][item.compId].svg
                                        : ""
                                )}
                            </div>
                        )
                    }
                })}
        </ImageDiv>
    )
}

export default AvatarImage

const ImageDiv = styled.div`
    position: relative;

    div {
        position: absolute;
        svg {
            width: 100%;
            height: auto;
            position: absolute;
        }
    }
    img {
        width: 100%;
    }
`

const Hair = styled.div`
    svg > path {
        fill: ${(props) => {
            return props.hairColor ? props.hairColor : "#626161"
        }};
    }
`
