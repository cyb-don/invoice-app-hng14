import { useState, useRef, useEffect } from "react";

export default function Filter({ onFilter, invoiceCount, onAdd }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({ draft: false, pending: false, paid: false });
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (status) => {
    const updated = { ...filters, [status]: !filters[status] };
    setFilters(updated);
    const active = Object.keys(updated).filter((k) => updated[k]);
    onFilter(active);
  };

  const countLabel = invoiceCount === 0
    ? "No invoices"
    : `There are ${invoiceCount} total invoice${invoiceCount !== 1 ? "s" : ""}`;

  return (
    <div className="list-header">
      <div className="list-header-titles">
        <h1>Invoices</h1>
        <p>{countLabel}</p>
      </div>

      <div className="filter-wrapper" ref={ref}>
        <button
          className={`filter-btn${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <span className="filter-label-short">Filter</span>
          <span className="filter-label-full">Filter by status</span>
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M1 1l4.5 4.5L10 1" stroke="#7c5dfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={`filter-dropdown${open ? " open" : ""}`} role="menu">
          {["draft", "pending", "paid"].map((status) => (
            <label key={status} className="filter-option">
              <input
                type="checkbox"
                checked={filters[status]}
                onChange={() => handleChange(status)}
                aria-label={`Filter ${status}`}
              />
              <span style={{ textTransform: "capitalize" }}>{status}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="new-invoice-btn" onClick={onAdd}>
        <span className="plus-circle" aria-hidden="true">+</span>
        <span className="btn-label-short">New</span>
        <span className="btn-label-full">New Invoice</span>
      </button>
    </div>
  );
}
