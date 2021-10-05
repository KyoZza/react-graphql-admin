import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_INVOICES, getInvoiceStatus, INVOICE_STATUS } from './lib';
import { parseTimestamp } from '../../../../lib/date'
import { formatPrice } from '../../../../lib/currency';

import { InvoiceStatusPrompt, InvoiceViewer } from './components';
import { Table, TableColumn, TableRow } from '../../../basicComponents/table';
import { OverlayLoad } from '../../../basicComponents/loading';
import { ButtonSecondary } from '../../../basicComponents/button';

const InvoiceList = () => {
  const [invoiceNumberSearch, setInvoiceNumberSearch] = useState('');
  const [showInvoiceStatusPrompt, setShowInvoiceStatusPrompt] = useState(null);
  const [showInvoicePdf, setShowInvoicePDF] = useState(null);

  const { data, loading, refetch } = useQuery(GET_INVOICES);
  
  const AGENT_ORDER_TYPE = 'AgentOrder';
  
  return (
    <>
      { showInvoiceStatusPrompt && 
        <InvoiceStatusPrompt
          invoiceId={showInvoiceStatusPrompt.id}
          orderId={showInvoiceStatusPrompt.orderId}
          isAgent={showInvoiceStatusPrompt.isAgent}
          currentStatus={showInvoiceStatusPrompt.status}
          onCancel={() => setShowInvoiceStatusPrompt(false)}
          onConfirm={() => setShowInvoiceStatusPrompt(false)}
          refetch={refetch}
        />
      }

      <input
        name="invoiceNumber"
        type="search"
        placeholder="請求書番号で検索"
        value={invoiceNumberSearch}
        onChange={e => setInvoiceNumberSearch(e.target.value)}
      />

      {
        loading ? <OverlayLoad/> :
        <Table
          head={
            <TableRow head>
              <TableColumn head>請求書番号</TableColumn>
              <TableColumn head>発行日</TableColumn>
              <TableColumn head>期日</TableColumn>
              <TableColumn head>請求先</TableColumn>
              <TableColumn head>ステータス</TableColumn>
              <TableColumn head>価格</TableColumn>
              <TableColumn head></TableColumn>
              <TableColumn head></TableColumn>
            </TableRow>
          }
        >
          {
            data && data.invoices
            .map(invoice => invoice.number.startsWith(invoiceNumberSearch) &&
              <TableRow key={invoice.number}>
                <TableColumn>{ invoice.number }</TableColumn>
                <TableColumn>{ parseTimestamp(invoice.createdAt, true) }</TableColumn>
                <TableColumn>{ parseTimestamp(invoice.dueDate, true) }</TableColumn>
                <TableColumn>
                  {
                    invoice.basedOn.__typename === AGENT_ORDER_TYPE ?
                    // As there is no ID reference so far, the link is not possible
                    // <Link to >{ invoice.shipTo.name  }</Link>
                    invoice.shipTo.name 
                    : // #TODO add like to carecenter (once CC Detail page is done) 
                    invoice.shipTo.name 
                  }
                </TableColumn>
                <TableColumn
                  success={invoice.status === INVOICE_STATUS.paid.db}
                  error={invoice.status === INVOICE_STATUS.error.db}
                >{ getInvoiceStatus(invoice.status) }</TableColumn>
                <TableColumn>{ formatPrice(
                  invoice.services
                  .map(service => service.price * (service.quantity ? service.quantity : 0))
                  .reduce((prevVal, curVal) => prevVal + curVal)
                )}</TableColumn>
                <TableColumn fitContent>
                  <ButtonSecondary 
                    onClick={() => setShowInvoiceStatusPrompt({
                      id: invoice.id,
                      orderId: invoice.basedOn.id,
                      isAgent: invoice.basedOn.__typename === AGENT_ORDER_TYPE,
                      status: invoice.status
                    })}
                  >
                    {invoice.status === INVOICE_STATUS.initial.db ? '請求書を送る' : 'ステータス更新' }
                  </ButtonSecondary>
                </TableColumn>
                <TableColumn>
                  {
                    invoice.status === INVOICE_STATUS.initial.db ||
                    <ButtonSecondary 
                      onClick={() => setShowInvoicePDF({ id: invoice.id })}
                    >
                      PDF
                    </ButtonSecondary>
                  }
                </TableColumn>
              </TableRow>         
            )
          }
        </Table>
      }

      { showInvoicePdf && 
        <InvoiceViewer 
          invoiceId={showInvoicePdf.id}
          onClose={() => setShowInvoicePDF(null)}
        />
      }
    </>
  )
}

export default InvoiceList;