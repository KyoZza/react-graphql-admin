import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { typeDefs, resolvers } from '.';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import { pushDefaultAlert } from '../components/basicComponents/alerts';


export const getDefaultState = () => ({
  data: {
    isAuthenticated: !!localStorage.getItem('token'),
    alertMessages: []
  }
});


/**
 * Clears all User data from the Apollo cache and resets the state
 * @param {ApolloClient} client 
 */
export function clearLoginState() {
  localStorage.clear();
  client.resetStore();
  // client.writeData(getDefaultState());
}



// CB will be handled in client.onResetStore()
let expiredJWTcb = null;
/**
 * Clears all User data from the Apollo cache and resets the state
 */
export function handleExpiredJWT() {
  localStorage.clear();
  // Inform the user
  expiredJWTcb = () => pushDefaultAlert('ログインセッションの有効期限が切れました。 もう一度ログインしてください。')
  client.resetStore();
}


// Apollo Client setup steps
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const cache = new InMemoryCache({ fragmentMatcher });
const httpLink = createHttpLink({
  uri: (process.env.REACT_APP_API_URL || '').concat('/graphql')
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      ...headers,
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      /**
       * Checking error message: 'The user is not authorized to perform this action'.
       * Maybe find a clearer way.
       * Check if user was logged in by checking if there is a JWT token in the localstorage.
       * If so, clear the login state, because the JWT has expired
       */
      if(message.includes('not authorized') || message.includes('TokenExpiredError')) {
        if(!!localStorage.getItem('token')) 
          handleExpiredJWT();
        else 
          clearLoginState();
      }
      // // Display an error alert for all other errors
      // else
      //   pushErrorAlert(message);
    });

  // if (networkError) pushErrorAlert(`[ネットワークエラー]: ${networkError}`);
});

// timeout after 4 seconds. just for sample demonstration.
const timeoutLink = new ApolloLinkTimeout(4000); 

export const client = new ApolloClient({
  timeout: 2000,
  cache,
  link: authLink.concat(errorLink).concat(httpLink).concat(timeoutLink),
  typeDefs,
  resolvers
});

client.writeData(getDefaultState());
client.onResetStore(() => {
  client.writeData(getDefaultState());

  if(expiredJWTcb) {
    // wait a short time until the default state is written to the client 
    setTimeout(() => {
      expiredJWTcb && expiredJWTcb();
      expiredJWTcb = null;
    }, 500)
  }
});