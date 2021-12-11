import fetch from "isomorphic-fetch"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import { useAuthToken } from "../config/auth-config"

/*
uri: `http://auction.us-east-1.elasticbeanstalk.com/graphql`,
uri: `http://localhost:5000/graphql`,
*/

const httpLink = createHttpLink({
    uri: 'http://auction.us-east-1.elasticbeanstalk.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const [token] = useAuthToken()
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    fetch: fetch,
    fetchOptions: {
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
    },
    cache: new InMemoryCache()
});

