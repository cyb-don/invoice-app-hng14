const localInvoiceArr = "invoices";

export const loadInvoices = () => {
  const data = localStorage.getItem(localInvoiceArr);
  return data ? JSON.parse(data) : null;
};

export const saveInvoices = (invoices) => {
  localStorage.setItem(localInvoiceArr, JSON.stringify(invoices));
};