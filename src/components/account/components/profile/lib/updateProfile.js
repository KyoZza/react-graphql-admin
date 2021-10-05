import gql from 'graphql-tag';
import { USER_PROFILE_DATA } from '../../../../../graphql/fragments/userFragments';

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $name: String, 
    $nameKana: String, 
    $phone: String, 
    # $address: String,
  ) {
    updateUser (
      id: $id
      name: $name ,
      nameKana: $nameKana,
      phoneNumbers: {
        number: $phone
      },
      # address: {
      #   primary: $address
      # }
    ) {
      id
      ...UserProfileData
    }
  }
  ${USER_PROFILE_DATA}
`;