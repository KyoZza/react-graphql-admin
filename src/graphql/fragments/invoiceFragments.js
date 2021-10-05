import gql from 'graphql-tag';
import { USER_NAME } from './userFragments';

export const INVOICE_IDENTIFIER = gql`
  fragment InvoiceIdentifier on Invoice {
    id
    number
  }
`;

export const BILL_TO_DATA = gql`
  fragment BillToData on BillTo {
    name
    address
    phoneNumber
    currency
    memo
  }
`;

export const SHIP_TO_DATA = gql`
  fragment ShipToData on ShipTo {
    name
    address
    phoneNumber
  }
`;

export const INVOICE_COST_BREAKDOWN = gql`
  fragment InvoiceCostBreakDown on ServiceBreakdown {
    serviceName
    customer
    price
  }
`;

export const INVOICE_BASIC_DATA = gql`
  fragment InvoiceBasicData on Invoice {
    ...InvoiceIdentifier
    status
    dueDate
    paidDate
    createdAt
  }
  ${INVOICE_IDENTIFIER}
`;

export const INVOICE_CONFIRMER_DATA = gql`
  fragment InvoiceConfirmerData on InvoiceConfirmer {
    date
    by {
      id
      ...UserName
    }
  }
  ${USER_NAME}
`;

export const INVOICE_BASED_ON_DATA = gql`
  fragment InvoiceBasedOnData on InvoiceBasedOn {
    ... on Order {
      id
    }
    ... on AgentOrder {
      id
      isDirectPay
    }
  }
`;