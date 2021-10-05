import gql from 'graphql-tag';
import { ADMIN_DATA } from '../../../../../graphql/fragments/userFragments';

export const GET_ADMINS = gql`
  query getAdmins {
    users (
      filter: {
        usertype: "admin"
      }
    ) {
      ...AdminData
    }
  } 
  ${ADMIN_DATA}
`;