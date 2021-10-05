import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { INVOICE_STATUS } from '../../lib';
import { CHANGE_INVOICE_STATUS, SEND_INVOICE } from './lib';
import { AUTH_USER_ID } from '../../../../../../graphql/commonQueries';

import { Prompt } from '../../../../../basicComponents/prompt';
import { Select } from '../../../../../basicComponents/input';
import { ValidationError } from '../../../../../basicComponents/validation';
import { pushSuccessAlert, pushErrorAlert } from '../../../../../basicComponents/alerts';

const InvoiceStatusPrompt = ({invoiceId, orderId, isAgent, currentStatus, onCancel, onConfirm, refetch}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [paidDate, setPaidDate] = useState('');
  const [fee, setFee] = useState('');

  const { data: authData } = useQuery(AUTH_USER_ID);

  const MIN_FEE = 0;
  const MAX_FEE = 100;

  const [
    updateStatus, 
    { loading: updateStatusLoading, error: updateStatusError}
  ] = useMutation(CHANGE_INVOICE_STATUS, {
    variables: {
      id: invoiceId,
      newStatus: selectedStatus,
      confirmer: {
        by: authData.authUserId,
        paidDate
      }
    },
    onCompleted: () => {
      pushSuccessAlert('ステータスが更新されました。')
      onConfirm();
    },
    onError: error => pushErrorAlert(error.message)
  });

  const [
    sendInvoice, 
    { loading: sendInvoiceLoading, error: sendInvoiceError}
  ] = useMutation(SEND_INVOICE, {
    variables: {
      id: invoiceId,
      orderId,
      isAgent,
      fee: parseFloat(fee)
    },
    onCompleted: () => {
      pushSuccessAlert('請求書が送信されました。')
      refetch();
      onConfirm();
    },
    onError: error => pushErrorAlert(error.message)
  });

  const onChangeFee = e => {
    const updatedFee = e.target.value;

    if (updatedFee < MIN_FEE) {
      setFee(MIN_FEE)
    } else if (updatedFee > MAX_FEE) {
      setFee(MAX_FEE)      
    } else {
      setFee(e.target.value)
    }
  }

  return currentStatus === INVOICE_STATUS.initial.db ?
    <Prompt
      title="請求書を送る"
      onCancel={onCancel}
      onConfirm={sendInvoice}
      loading={sendInvoiceLoading}
    >
      <p>費用を設定し、確認を押してください。その後、請求書がお客様に送信されます。</p>

      <label htmlFor="fee">費用（％）</label>
      <input 
        type="number" 
        id="fee"
        name="fee" 
        min={MIN_FEE}
        max={MAX_FEE}
        placeholder="0"
        value={fee} 
        onChange={onChangeFee}
      />

      { sendInvoiceError && <ValidationError msg={sendInvoiceError.message}/> }
    </Prompt>
    :
    <Prompt
      title="ステータスを更新する"
      onCancel={onCancel}
      onConfirm={updateStatus}
      loading={updateStatusLoading}
    >
      <label htmlFor="invoiceStatus">請求書ステータス</label>
      <Select 
        name="invoiceStatus"
        options={
          Object.values(INVOICE_STATUS)
          .map(status => ({
            key: status.ui,
            value: status.db
          }))
        }
        value={selectedStatus}
        onChange={e => setSelectedStatus(e.target.value)}
        autoFocus
      />

      {
        selectedStatus === INVOICE_STATUS.paid.db &&
        <>
          <label htmlFor="datePaid">支払日</label>
          <input 
            type="date" 
            name="datePaid" 
            id="datePaid" 
            value={paidDate} 
            onChange={e => setPaidDate(e.target.value)}
          />
        </>
      }

      { updateStatusError && <ValidationError msg={updateStatusError.message}/> }
    </Prompt>
}

InvoiceStatusPrompt.propTypes = {
  invoiceId: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  isAgent: PropTypes.bool,
  currentStatus: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default InvoiceStatusPrompt;