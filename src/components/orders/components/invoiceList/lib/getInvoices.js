import gql from 'graphql-tag';
import { 
  INVOICE_BASIC_DATA, 
  BILL_TO_DATA, 
  SHIP_TO_DATA,
  INVOICE_BASED_ON_DATA 
} from '../../../../../graphql/fragments/invoiceFragments';

export const GET_INVOICES = gql`
  query getInvoices {
    invoices {
      ...InvoiceBasicData
      billTo { ...BillToData }
      shipTo { ...ShipToData }
      services { price quantity }
      basedOn { ...InvoiceBasedOnData }
    }
  } 
  ${INVOICE_BASIC_DATA}
  ${INVOICE_BASED_ON_DATA}
  ${BILL_TO_DATA}
  ${SHIP_TO_DATA}
`;