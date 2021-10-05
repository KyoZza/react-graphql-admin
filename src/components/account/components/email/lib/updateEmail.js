import gql from 'graphql-tag';
// import { USER_PROFILE_DATA } from '../../../../../graphql/fragments/userFragments';

export const UPDATE_EMAIL = gql`
  mutation updateEmail(
    $id: String
    $oldEmail: String
    $newEmail: String
  ) {
    updateUserEmail (
      id: $id
      oldEmail: $oldEmail
      newEmail: $newEmail
    ) {
      id
      email
    }
  }
`;