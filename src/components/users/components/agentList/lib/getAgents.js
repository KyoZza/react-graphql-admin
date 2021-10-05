import gql from 'graphql-tag';
import { AGENT_LIST_DATA } from '../../../../../graphql/fragments/agentFragments';

export const GET_AGENTS = gql`
  query getAgents {
    agents {
      ...AgentListData
    }
  } 
  ${AGENT_LIST_DATA}
`;