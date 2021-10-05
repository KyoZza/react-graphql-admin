import gql from 'graphql-tag';


export const SEND_INVOICE = gql`
  mutation sendInvoice (
    $id: String, 
    $orderId: String, 
    $isAgent: Boolean,
    $fee: Float
    $email: String, 
  ) {
    sendInvoiceByEmail(
      invoiceId: $id,
      orderId: $orderId, 
      isAgent: $isAgent,
      fee: $fee,
      # email: "sandro.scheffmann@personize.co.jp",
      email: $email,
    )
    # {
    #   id
    #   status
    #   fee
    # }
  }
`;