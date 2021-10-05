import gql from 'graphql-tag';
import { USER_ACCOUNT_DATA } from '../../../graphql/fragments/userFragments';

export const LOGIN_USER = gql`
  query loginUser(
      $email: String!, 
      $password: String!,
    ) {
    login (
      credential: {
        email:  $email,
        password: $password
      } 
    ) 
    {
      token
      data {
        ...UserAccountData
      }
    }
  }
  ${USER_ACCOUNT_DATA}
`;