import gql from 'graphql-tag';

export const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated @client
  }
`;

export const AUTH_USER_ID = gql`
  query AuthUserId {
    authUserId @client
  }
`;