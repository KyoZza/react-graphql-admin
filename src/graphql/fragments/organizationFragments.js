import gql from 'graphql-tag';

export const ORGANIZATION_NAME = gql`
  fragment OrganizationName on Organization {
    name
    nameKana
  }
`;

export const ORGANIZATION_PROFILE_DATA = gql`
  fragment OrganizationProfileData on Organization {
    ...OrganizationName
    phoneNumbers { number }
    address { primary }
  }
  ${ORGANIZATION_NAME}
`;