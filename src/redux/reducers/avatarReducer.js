import { defaultComponents } from "../../components/dress-up/dressup-data";
import { CREATE_AVATAR_COMPONENT, FETCH_AVATAR_COMPONENTS } from "../actionTypes";

const InitialAvatarComponents = {
    loaded: false,
    hairStyles: {'0': defaultComponents.hairStyle},
    facialStyles: {'0': defaultComponents.facialStyle},
    expressions: {'0': defaultComponents.expression},
    hats: {'0': defaultComponents.hat},
    others: {'0': defaultComponents.other},
};

export const avatarComponentsReducer = (state = InitialAvatarComponents, action) => {
    switch(action.type) {
        case CREATE_AVATAR_COMPONENT:
            state[`${action.payload.groupId}s`] = { ...state[`${action.payload.groupId}s`], [action.payload.compId]: action.payload };
            return { ...state };
        case FETCH_AVATAR_COMPONENTS:
            state.hairStyles = { ...state.hairStyles, ...action.payload.hairStyles };
            state.facialStyles = { ...state.facialStyles, ...action.payload.facialStyles };
            state.expressions = { ...state.expressions, ...action.payload.expressions };
            state.hats = { ...state.hats, ...action.payload.hats };
            state.others = { ...state.others, ...action.payload.others };
            return { ...state, loaded: true };
        default:
            return state;
    }
};