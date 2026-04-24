import InvoiceItem from "./InvoiceItem";

export default function InvoiceList({ invoices, onClick }) {
  if (invoices.length === 0) {
    return (
      <div className="empty-state">
        <img src="/src/assets/hero.png" alt="" aria-hidden="true" />
        <h3>There is nothing here</h3>
        <p>
          Create a new invoice by clicking the{" "}
          <strong>New Invoice</strong> button and get started
        </p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      {invoices.map((inv) => (
        <InvoiceItem key={inv.id} invoice={inv} onClick={onClick} />
      ))}
    </div>
  );
}