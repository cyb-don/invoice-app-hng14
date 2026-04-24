import { useState } from "react";
import Modal from "./Modal";
import StatusBadge from "./StatusBadge";

export default function InvoiceDetails({ invoice, onBack, onEdit, invoices, setInvoices }) {
  const [showModal, setShowModal] = useState(false);

  const handleMarkAsPaid = () => {
    const updated = invoices.map((i) =>
      i.id === invoice.id ? { ...i, status: "paid" } : i
    );
    setInvoices(updated);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="invoice-view-container app-container" style={{ paddingTop: 40 }}>
      <button className="back-btn" onClick={onBack}>
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className="chevron">
          <path d="M6 1L2 5l4 4" stroke="#7c5dfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Go back
      </button>

      <div className="status-bar">
        <span className="status-label">Status</span>
        <StatusBadge status={invoice.status} />
        <div className="actions">
          <button className="action-btn btn-edit" onClick={onEdit}>Edit</button>
          <button className="action-btn btn-delete" onClick={() => setShowModal(true)}>Delete</button>
          {invoice.status !== "paid" && (
            <button className="action-btn btn-paid" onClick={handleMarkAsPaid}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="invoice-card">
        <div className="card-top">
          <div className="id-group">
            <h2><span>#</span>{invoice.id}</h2>
            <p>{invoice.description}</p>
          </div>
          <div className="address-group">
            <p>{invoice.senderAddress?.street}</p>
            <p>{invoice.senderAddress?.city}</p>
            <p>{invoice.senderAddress?.postCode}</p>
            <p>{invoice.senderAddress?.country}</p>
          </div>
        </div>

        <div className="card-middle">
          <div className="info-col date-col">
            <div>
              <p className="label">Invoice Date</p>
              <h3>{formatDate(invoice.createdAt)}</h3>
            </div>
            <div>
              <p className="label">Payment Due</p>
              <h3>{formatDate(invoice.paymentDue)}</h3>
            </div>
          </div>

          <div className="info-col">
            <p className="label">Bill To</p>
            <h3>{invoice.clientName}</h3>
            <div className="address-group" style={{ textAlign: "left", marginTop: 8 }}>
              <p>{invoice.clientAddress?.street}</p>
              <p>{invoice.clientAddress?.city}</p>
              <p>{invoice.clientAddress?.postCode}</p>
              <p>{invoice.clientAddress?.country}</p>
            </div>
          </div>

          <div className="info-col sent-to-col">
            <p className="label">Sent to</p>
            <h3 style={{ wordBreak: "break-all" }}>{invoice.clientEmail}</h3>
          </div>
        </div>

        <div className="items-section">
          <div className="items-table-header">
            <span>Item Name</span>
            <span style={{ textAlign: "right" }}>QTY.</span>
            <span style={{ textAlign: "right" }}>Price</span>
            <span style={{ textAlign: "right" }}>Total</span>
          </div>

          {invoice.items.map((item, i) => (
            <div key={i} className="item-row-detail">
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-qty-price">{item.quantity} x £ {item.price.toFixed(2)}</p>
              </div>
              <span className="item-qty-col">{item.quantity}</span>
              <span className="item-price-col">£ {item.price.toFixed(2)}</span>
              <span className="item-total-col">£ {item.total.toFixed(2)}</span>
            </div>
          ))}

          <div className="grand-total-bar">
            <span className="total-label">Amount Due</span>
            <span className="total-amount">
              £ {invoice.total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="mobile-actions-footer">
        <button className="action-btn btn-edit" onClick={onEdit}>Edit</button>
        <button className="action-btn btn-delete" onClick={() => setShowModal(true)}>Delete</button>
        {invoice.status !== "paid" && (
          <button className="action-btn btn-paid" onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        )}
      </div>

      {showModal && (
        <Modal
          invoiceId={invoice.id}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setInvoices(invoices.filter((i) => i.id !== invoice.id));
            setShowModal(false);
            onBack();
          }}
        />
      )}
    </div>
  );
}
