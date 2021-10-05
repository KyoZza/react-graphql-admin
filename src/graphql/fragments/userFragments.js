import gql from 'graphql-tag';

export const USER_NAME = gql`
  fragment UserName on User {
    name
    nameKana
  }
`;

export const USER_PROFILE_DATA = gql`
  fragment UserProfileData on User {
    ...UserName
    phoneNumbers { number }
    address { primary }
  }
  ${USER_NAME}
`;

export const USER_ACCOUNT_DATA = gql`
  fragment UserAccountData on User {
    ...UserProfileData
    id
    email
    password
    userType
  }
  ${USER_PROFILE_DATA}
`;

export const USER_LIST_DATA = gql`
  fragment UserListData on User {
    ...UserProfileData
    id
    email
    address { primary }
    userType
    status
    isVerified
    createdAt
    updatedAt
  }
  ${USER_PROFILE_DATA}
`;

export const ADMIN_DATA = gql`
  fragment AdminData on User {
    ...UserProfileData
    email
    userType
    createdAt
  }
  ${USER_PROFILE_DATA}
`;