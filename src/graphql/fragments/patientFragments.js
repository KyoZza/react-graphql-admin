import gql from 'graphql-tag';


export const PATIENT_NAME = gql`
  fragment PatientName on Patient  {
    name
    nameKana
  }
`;

export const PATIENT_PROFILE_DATA = gql`
  fragment PatientProfileData on Patient  {
    id
    ...PatientName
    birthday
    gender
    address { primary }
    phoneNumber { number }
  }
  ${PATIENT_NAME}
`;

export const PATIENT_HEALTH_DATA = gql`
  fragment PatientHealthData on Patient  {
    disabilityLevel
    disabilityDetails {
      elder
      wheelchair
      inBed
      mentalIllness
      childcare
      others
    }
  }
`;