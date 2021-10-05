import gql from 'graphql-tag';
import { USER_PROFILE_DATA } from '../../../../../graphql/fragments/userFragments';

export const LOAD_PROFILE_DATA = gql`
  query loadProfileData {
    loginWithToken {
      data {
        id
        ...UserProfileData
      }
    }
  } 
  ${USER_PROFILE_DATA}
`;