import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { clearLoginState } from '../graphql';
import gql from 'graphql-tag';
import { USER_ACCOUNT_DATA } from './fragments/userFragments';
import { isAdmin } from '../lib/roles';


export const GET_AUTH_USER = gql`
  query GetAuthenticatedUser {
    loginWithToken {
      data {
        ...UserAccountData 
      }
    }
  }
  ${USER_ACCOUNT_DATA}
`;

export default function ApolloInitialLoad() {
  const client = useApolloClient();

  client.query({
    query: GET_AUTH_USER,
  })
  .then(({data: { loginWithToken: { data }}}) => {
    // Make sure only Admins have access to the page
    if (!isAdmin(data.userType)) {
      clearLoginState(client);
      return;
    }

    client.writeData({ 
      data: {
        authUserId: data.id
      } 
    });
  })
  // Clear login data in case the user is not authenticated. (Token error , expired Token)
  .catch(_ => clearLoginState(client));

  return <></>;
}
