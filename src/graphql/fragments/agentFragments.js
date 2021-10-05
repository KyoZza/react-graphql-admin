import gql from 'graphql-tag';

export const AGENT_NAME = gql`
  fragment AgentName on Agent {
    name
    nameKana
  }
`;

export const AGENT_PROFILE_DATA = gql`
  fragment AgentProfileData on Agent {
    ...AgentName
    phoneNumber { number }
    # address { primary }
    # lineId
  }
  ${AGENT_NAME}
`;

export const AGENT_ACCOUNT_DATA = gql`
  fragment AgentAccountData on Agent {
    ...AgentProfileData
    id
    email
    password
  }
  ${AGENT_PROFILE_DATA}
`;

export const AGENT_LIST_DATA = gql`
  fragment AgentListData on Agent {
    ...AgentProfileData
    id
    email
    status
    isVerified
    createdAt
    updatedAt
  }
  ${AGENT_PROFILE_DATA}
`;