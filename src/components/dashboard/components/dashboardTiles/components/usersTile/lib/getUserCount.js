import gql from 'graphql-tag';

export const GET_USER_COUNT = gql`
  query getUserCount {
    users: users {
      id
      userType
    }

    agents: agents {
      id
    }
  }
`;