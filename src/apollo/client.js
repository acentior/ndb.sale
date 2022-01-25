import fetch from "isomorphic-fetch"
import { ApolloClient, InMemoryCache, createHttpLink, split } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import { getInMemoryAuthToken, isBrowser } from "../utilities/auth"
import { API_BASE_URL, SUBSCRIPTION_BASE_URL } from "../utilities/staticData"
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: API_BASE_URL + "/graphql",
});

const wsLink = isBrowser ? new WebSocketLink({
    uri: SUBSCRIPTION_BASE_URL,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${getInMemoryAuthToken()}`,
        },
    }
}) : undefined;

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = isBrowser ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
) : httpLink;

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getInMemoryAuthToken()
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
};

export const client = new ApolloClient({
    link: authLink.concat(splitLink),
    fetch: fetch,
    fetchOptions: {
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
    },
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});

