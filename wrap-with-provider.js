import React from "react"
import { AuthProvider } from "./src/hooks/useAuth"
import { ApolloProvider } from "@apollo/client"
import { client } from "./src/apollo/client"
import { Provider as ReduxProvider } from "react-redux";
import store from './src/redux/store';
import { setCurrentAuthInfo } from "./src/redux/actions/authAction";
import { isBrowser } from './src/utilities/auth';

if(isBrowser) {
  if(localStorage.getItem('USER_DATA')) {
    const authInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    store.dispatch(setCurrentAuthInfo(authInfo));
  }
}

// eslint-disable-next-line react/display-name,react/prop-types
export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <AuthProvider>
            {element}
        </AuthProvider>
      </ApolloProvider>
    </ReduxProvider>    
  )
}
