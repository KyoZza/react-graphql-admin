import gql from 'graphql-tag';
// import { USER_PROFILE_DATA } from '../../../../../graphql/fragments/userFragments';

export const LOAD_EMAIL = gql`
  query loadEmail {
    loginWithToken {
      data {
        id
        email
      }
    }
  } 
`;