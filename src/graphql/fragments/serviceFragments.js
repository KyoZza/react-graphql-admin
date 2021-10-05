import gql from 'graphql-tag';

export const SERVICE_DATA = gql`
  fragment ServiceData on BeautyService {
    id
    name
    price {
      forIndividual
      forOrganization
    }
  }
`;