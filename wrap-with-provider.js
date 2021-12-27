import React from "react"
import { AuthProvider } from "./src/hooks/useAuth"
import { ApolloProvider } from "@apollo/client"
import { client } from "./src/apollo/client"
import { Provider as ReduxProvider } from "react-redux";
import store from './src/redux/store';

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
