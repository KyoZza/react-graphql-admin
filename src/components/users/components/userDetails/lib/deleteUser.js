import gql from 'graphql-tag';


export const DELETE_USER = gql`
  mutation deleteUser (
    $id: String
  ) {
    deleteUser (
      id: $id
    ) {
      id
    }
  }
`;