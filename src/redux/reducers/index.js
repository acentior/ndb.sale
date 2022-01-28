import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { paginationReducer } from "./pageReducer";
import { errorsReducer } from "./errorReducer";
import { avatarComponentsReducer } from "./avatarReducer";
import { bidReducer } from "./bidReducer";
import { tasksReducer, userTierReducer } from "./settingReducer";
import { dataReducer } from './dataReducer';
import { kycSettingsReducer } from "./settingReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    avatarComponents: avatarComponentsReducer,
    errors: errorsReducer,
    pagination: paginationReducer,
    userTiers: userTierReducer,
    placeBid: bidReducer,
    kycSettings: kycSettingsReducer,
    tasks: tasksReducer,
    data: dataReducer,
})

export default rootReducer
