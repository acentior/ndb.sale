import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { paginationReducer } from './pageReducer';
import { errorsReducer } from './errorReducer';
import { searchReducer, sessionsReducer, joinedSessionIdReducer, joinedSessionReducer } from './dataReducer';
import { countReducer } from './countReducer';
import { avatarComponentsReducer } from './avatarReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    avatarComponents: avatarComponentsReducer,
    errors: errorsReducer,
    pagination: paginationReducer,
    search: searchReducer,
    sessions: sessionsReducer,
    sessionId: joinedSessionIdReducer,
    session: joinedSessionReducer,
    count: countReducer
});

export default rootReducer;