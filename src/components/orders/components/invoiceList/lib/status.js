/**
 * Invoice status in Database and UI representation
 * @readonly
 * @enum {{db: String, ui: String}}
 */
export const INVOICE_STATUS = {
  initial:  { db: 'initial',  ui: '請求書未送付' },
  pending:  { db: 'pending',  ui: '支払い未完了' },
  paid:     { db: 'paid',     ui: '支払い完了' },
  error:    { db: 'error',    ui: '請求書エラー' }
}

/**
 * Gets the UI representation of a given status 
 * @param {String} status 
 * @returns {String} UI representation of a given status 
 */
export function getInvoiceStatus(status) {
  switch (status) {
    case INVOICE_STATUS.initial.db: return INVOICE_STATUS.initial.ui;
    case INVOICE_STATUS.pending.db: return INVOICE_STATUS.pending.ui;
    case INVOICE_STATUS.paid.db:    return INVOICE_STATUS.paid.ui;
    case INVOICE_STATUS.error.db:   return INVOICE_STATUS.error.ui;
  
    default: return '未定義';
  }
}