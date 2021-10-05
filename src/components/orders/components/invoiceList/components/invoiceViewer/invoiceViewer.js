import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { GET_INVOICE_PDF } from './lib';

import { PdfViewer } from '../../../../../basicComponents/pdfViewer';
import { OverlayLoad } from '../../../../../basicComponents/loading';
import { pushErrorAlert } from '../../../../../basicComponents/alerts';



const InvoiceViewer = ({invoiceId, onClose}) => {
  const { data, loading } = useQuery(GET_INVOICE_PDF, {
    variables: { invoiceId },
    onError: error => pushErrorAlert(error.message)
  });

  return loading || !data ? <OverlayLoad/> :
    <PdfViewer
      docDefinition={data.getInvoicePdf}
      title={`invoice-${invoiceId}`}
      onClose={onClose}
    />
}

InvoiceViewer.propTypes = {
  invoiceId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default InvoiceViewer
