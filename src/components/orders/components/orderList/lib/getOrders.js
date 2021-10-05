import gql from 'graphql-tag';
import { ORDER_DATA } from '../../../../../graphql/fragments/orderFragments';

export const GET_ORDERS = gql`
  query getOrders {
    orders {
      ...OrderData
    }
  } 
  ${ORDER_DATA}
`;