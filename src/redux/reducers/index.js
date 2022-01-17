import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { paginationReducer } from "./pageReducer"
import { errorsReducer } from "./errorReducer"
import {
    searchReducer
} from "./dataReducer"
import { avatarComponentsReducer } from "./avatarReducer"
import { bidReducer } from "./bidReducer"
import { userTierReducer } from "./settingReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    avatarComponents: avatarComponentsReducer,
    errors: errorsReducer,
    pagination: paginationReducer,
    search: searchReducer,
    userTiers: userTierReducer,
    placeBid: bidReducer,
})

export default rootReducer
