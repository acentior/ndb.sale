import React from "react"
import { AuthProvider } from "./src/hooks/useAuth"
import { ApolloProvider } from "@apollo/client"
import { client } from "./src/apollo/client"
import { Provider as ReduxProvider } from "react-redux";
import { Provider as WalletProvider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import store from './src/redux/store';
import { setCurrentAuthInfo } from "./src/redux/actions/authAction";
import { INFURA_ID } from "./src/utilities/staticData"
import { isBrowser } from './src/utilities/auth';

if (isBrowser) {
  if (localStorage.getItem('USER_DATA')) {
    const authInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    store.dispatch(setCurrentAuthInfo(authInfo));
  }
}

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
// const infuraId = process.env.INFURA_ID
const infuraId = INFURA_ID
// Chains for connectors to support
const chains = defaultChains

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]

  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Ndb sale',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}


// eslint-disable-next-line react/display-name,react/prop-types
export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <WalletProvider connectors={connectors}>
            {element}
          </WalletProvider>
        </AuthProvider>
      </ApolloProvider>
    </ReduxProvider>
  )
}
