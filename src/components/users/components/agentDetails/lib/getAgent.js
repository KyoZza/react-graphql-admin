import gql from 'graphql-tag';
import { AGENT_LIST_DATA } from '../../../../../graphql/fragments/agentFragments';

export const GET_AGENT = gql`
  query getAgent(
    $id: ID
  ) {
    agent(
      id: $id
    ) {
      ...AgentListData
    }
  } 
  ${AGENT_LIST_DATA}
`;