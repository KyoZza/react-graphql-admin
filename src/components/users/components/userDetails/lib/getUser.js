import gql from 'graphql-tag';
import { USER_LIST_DATA } from '../../../../../graphql/fragments/userFragments';

export const GET_USER = gql`
  query getUser(
    $id: String
  ) {
    user(
      value: $id
    ) {
      ...UserListData
    }
  } 
  ${USER_LIST_DATA}
`;