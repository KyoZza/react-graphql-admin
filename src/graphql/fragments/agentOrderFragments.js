import gql from 'graphql-tag';
import { SERVICE_DATA } from './serviceFragments';
import { USER_PROFILE_DATA } from './userFragments';
import { ORGANIZATION_PROFILE_DATA } from './organizationFragments';

export const AGENT_ORDER_BASIC_DATA = gql`
  fragment AgentOrderBasicData on AgentOrder  {
    id
    date
    status
  }
`;

export const AGENT_ORDER_SERVICES = gql`
  fragment AgentOrderServices on AgentOrderService  {
    service { 
      ...ServiceData 
    }
    quantity
  }
  ${SERVICE_DATA}
`;

export const AGENT_ORDER_ORDERER = gql`
  fragment AgentOrderOrderer on AgentOrder  {
    orderer {
      type
      owner {
        ... on User {
          id
          ...UserProfileData
        }
        ... on Organization {
          id
          ...OrganizationProfileData
        }
      }
    }
  }
  ${USER_PROFILE_DATA}
  ${ORGANIZATION_PROFILE_DATA}
`;

export const AGENT_ORDER_BELONG_TO = gql`
  fragment AgentOrderBelongTo on AgentOrder  {
    belongTo {
      # type
      owner {
        ... on User {
          id
          ...UserProfileData
          area {
            prefecture
            city
          }
        }
      }  
    }
  }
  ${USER_PROFILE_DATA}
`;

export const AGENT_ORDER_DATA = gql`
  fragment AgentOrderData on AgentOrder  {
    ...AgentOrderBasicData
    services {
      ...AgentOrderServices
    } 
    ...AgentOrderOrderer
    ...AgentOrderBelongTo
    agent { id name }
    rejection { reason }
    reports
    isDirectPay
  }
  ${AGENT_ORDER_BASIC_DATA}
  ${AGENT_ORDER_SERVICES}
  ${AGENT_ORDER_ORDERER}
  ${AGENT_ORDER_BELONG_TO}
`;