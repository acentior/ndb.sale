import React from "react"
import { useSelector } from "react-redux"
import AvatarImage from "../admin/shared/AvatarImage"

export default function Avatar() {
    const { avatar } = useSelector(state => state.auth.user);
    const selected = avatar?.selected;
    const hairColor = avatar?.hairColor;

    const avatarSet = JSON.parse(selected ?? "[]")

    return <AvatarImage avatar={{ avatarSet, hairColor }} />
}
