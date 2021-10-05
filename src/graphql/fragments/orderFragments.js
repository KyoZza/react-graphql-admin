import gql from 'graphql-tag';
import { SERVICE_DATA } from './serviceFragments';
import { PATIENT_NAME } from './patientFragments';
import { USER_PROFILE_DATA } from './userFragments';
import { ORGANIZATION_PROFILE_DATA } from './organizationFragments';

export const ORDER_BASIC_DATA = gql`
  fragment OrderBasicData on Order  {
    id
    date
    status
  }
`;

export const ORDER_DETAILS = gql`
  fragment OrderDetails on OrderDetail  {
    services { ...ServiceData }
    patient {
      id
      ...PatientName
    }
    # disability
    # condition { inBed assistant }
    # comment
    # report { id status }
  }
  ${SERVICE_DATA}
  ${PATIENT_NAME}
`;

export const ORDER_DATA = gql`
  fragment OrderData on Order  {
    ...OrderBasicData
    details { ...OrderDetails }
    # rejection { reason comment }
    # reports { id status }
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
    belongTo {
      # type
      owner {
        ... on User {
          id
          ...UserProfileData
        }
      }  
    }
  }
  ${ORDER_BASIC_DATA}
  ${ORDER_DETAILS}
  ${USER_PROFILE_DATA}
  ${ORGANIZATION_PROFILE_DATA}
`;