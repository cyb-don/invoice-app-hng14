import StatusBadge from "./StatusBadge";

export default function InvoiceItem({ invoice, onClick }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div
      className="invoice-row"
      onClick={() => onClick(invoice)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(invoice)}
      aria-label={`Invoice ${invoice.id} for ${invoice.clientName}`}
    >
      <div className="inv-mobile-left">
        <span className="inv-id"><span>#</span>{invoice.id}</span>
        <span className="inv-due">Due {formatDate(invoice.paymentDue)}</span>
        <span className="inv-amount">
          £ {invoice.total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="inv-mobile-right">
        <span className="inv-client">{invoice.clientName}</span>
        <span className="inv-status">
          <StatusBadge status={invoice.status} />
        </span>
      </div>

      <span className="inv-id-desktop"><span>#</span>{invoice.id}</span>
      <span className="inv-due-desktop">Due {formatDate(invoice.paymentDue)}</span>
      <span className="inv-client-desktop">{invoice.clientName}</span>
      <span className="inv-amount-desktop">
        £ {invoice.total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="inv-status-desktop">
        <StatusBadge status={invoice.status} />
      </span>
      <span className="inv-arrow" aria-hidden="true">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M1 1l4 4-4 4" stroke="#7c5dfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}