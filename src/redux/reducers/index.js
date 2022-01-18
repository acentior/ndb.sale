import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { paginationReducer } from "./pageReducer"
import { errorsReducer } from "./errorReducer"
import { avatarComponentsReducer } from "./avatarReducer"
import { bidReducer } from "./bidReducer"
import { userTierReducer } from "./settingReducer"
import { dataReducer, pageDataReducer } from './dataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    avatarComponents: avatarComponentsReducer,
    errors: errorsReducer,
    pagination: paginationReducer,
    userTiers: userTierReducer,
    placeBid: bidReducer,
    data: dataReducer,
    pageData: pageDataReducer
})

export default rootReducer
