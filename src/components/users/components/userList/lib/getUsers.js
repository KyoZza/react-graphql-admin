import gql from 'graphql-tag';
import { USER_LIST_DATA } from '../../../../../graphql/fragments/userFragments';

export const GET_USERS = gql`
  query getUsers {
    users {
      ...UserListData
    }
  } 
  ${USER_LIST_DATA}
`;