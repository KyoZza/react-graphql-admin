import gql from 'graphql-tag';
import { USER_NAME } from '../../../../graphql/fragments/userFragments';

export const AUTH_USER_NAV_DATA = gql`
  query authUserNavData
  {
    # isAuthenticated  @client
    loginWithToken {
      data {
        id
        ...UserName
      }
    }
  }
  ${USER_NAME}
`;