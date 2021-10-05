import gql from 'graphql-tag';

export const VERIFY_USER = gql`
  mutation verifyUser (
    $email: String
  ) {
    verifyUser (
      email: $email
    ) 
  }
`;