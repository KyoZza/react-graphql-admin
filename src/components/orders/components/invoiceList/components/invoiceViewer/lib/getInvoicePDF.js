import gql from 'graphql-tag';


export const GET_INVOICE_PDF = gql`
  query getInvoicePDF (
    $invoiceId: ID!
  ) {
    getInvoicePdf (
      invoiceId: $invoiceId
    )
  }
`;