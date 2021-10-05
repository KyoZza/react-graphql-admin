import gql from 'graphql-tag';
import { USER_ACCOUNT_DATA } from '../../../graphql/fragments/userFragments';


export const CREATE_USER = gql`
  mutation createUser(
    $email: String!, 
    $password: String!,
    $name: String, 
    $nameKana: String
    $userType: String
  ) {
    createUser(
      email: $email,
      password: $password, 
      name: $name,
      nameKana: $nameKana,
      userType: $userType
    )
    {
      token
      data {
        ...UserAccountData
      }
    }
  }
  ${USER_ACCOUNT_DATA}
`;