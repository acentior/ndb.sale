import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const NODE_CLIENT_ENV = 'development';

const storeMiddleware = NODE_CLIENT_ENV === 'production'? applyMiddleware(thunk): composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, storeMiddleware);

export default store;