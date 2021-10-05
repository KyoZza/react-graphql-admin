import gql from 'graphql-tag';


export const DELETE_AGENT = gql`
  mutation deleteAgent (
    $id: ID!
  ) {
    deleteAgent (
      id: $id
    ) {
      id
    }
  }
`;