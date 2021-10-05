import gql from 'graphql-tag';

export const GET_ALERT_MESSAGES = gql`
  query getAlertMessages {
    alertMessages @client {
      id
      message
      type
    }
  }
`;