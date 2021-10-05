import gql from 'graphql-tag';
// import { USER_PROFILE_DATA } from '../../../../../graphql/fragments/userFragments';

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $id: ID!
    $oldPassword: String
    $newPassword: String
  ) {
    updatePassword (
      id: $id
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      id
      password
    }
  }
`;