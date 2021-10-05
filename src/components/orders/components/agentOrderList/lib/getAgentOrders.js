import gql from 'graphql-tag';
import { AGENT_ORDER_DATA } from '../../../../../graphql/fragments/agentOrderFragments';

export const GET_AGENT_ORDERS = gql`
  query getAgentOrders {
    agentOrders {
      ...AgentOrderData
    }
  } 
  ${AGENT_ORDER_DATA}
`;