import gql from 'graphql-tag';

export const VERIFY_AGENT = gql`
  mutation verifyAgent (
    $id: ID!
  ) {
    verifyAgent (
      id: $id
    ) {
      id
      isVerified
    }
  }
`;