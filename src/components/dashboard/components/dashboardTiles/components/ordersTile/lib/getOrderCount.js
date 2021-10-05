import gql from 'graphql-tag';

export const GET_ORDER_COUNT = gql`
  query getOrderCount {
    orders: orders {
      id
      # status
    }
    agentOrders: agentOrders {
      id
      # status
    }
    invoices: invoices {
      id
    }
  }
`;