import gql from 'graphql-tag';

/**
 * Client-side schema
 */

export default gql`
  extend type Query {
    isAuthenticated: Boolean!
    authUserId: String
    alertMessages: [AlertMessage]
  }

  type AlertMessage {
    id: ID!
    message: String!
    type: String!
  }
`