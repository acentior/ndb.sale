import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"
import { GET_AVATAR_COMPONENTS } from "../../apollo/graghqls/querys/AvatarComponent"
import CustomSpinner from "../common/custom-spinner"
import { EmptyAvatar } from "../../utilities/imgImport"

export default function ProfileAvatar() {
    // Webservice
    const { data: user } = useQuery(GET_USER, {
        fetchPolicy: "network-only",
        onCompleted: () => setUserData(user.getUser),
    })
    const { data: avatarComponents } = useQuery(GET_AVATAR_COMPONENTS, {
        fetchPolicy: "network-only",
        onCompleted: () => setAvatarComponentsData(avatarComponents.getAvatarComponents),
    })
    // Containers
    const [avatarComponentsData, setAvatarComponentsData] = useState(null)
    const [userData, setUserData] = useState(null)
    const loadingSection = !(userData && avatarComponentsData)

    if (loadingSection) return <CustomSpinner />
    else {
        const selectedOnes = JSON.parse(userData.avatar.selected)
        return (
            <div className="position-relative">
                <img src={EmptyAvatar} alt="Avatar" className="position-absolute top-0 start-0" />
                {selectedOnes.map((item, index) => {
                    const currentComponent = avatarComponentsData?.filter(
                        (component) =>
                            component.groupId === item.groupId && component.compId === item.compId
                    )[0]
                    return (
                        <div
                            key={index}
                            className="position-absolute"
                            style={{
                                width: `${currentComponent.width}px`,
                                left: `${currentComponent.left}px`,
                                top: `${currentComponent.top}px`,
                            }}
                            dangerouslySetInnerHTML={{ __html: currentComponent.svg }}
                        />
                    )
                })}
            </div>
        )
    }
}
