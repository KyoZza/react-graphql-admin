import gql from 'graphql-tag';
import { INVOICE_CONFIRMER_DATA } from '../../../../../../../graphql/fragments/invoiceFragments';


export const CHANGE_INVOICE_STATUS = gql`
  mutation changeInvoiceStatus(
    $id: ID!, 
    $newStatus: String,
    $confirmer: InvoiceConfirmerInput
  ) {
    changeInvoiceStatus(
      id: $id,
      newStatus: $newStatus, 
      confirmer: $confirmer,
    )
    {
      id
      status
      paidDate
      confirmed { ...InvoiceConfirmerData }
    }
  }
  ${INVOICE_CONFIRMER_DATA}
`;