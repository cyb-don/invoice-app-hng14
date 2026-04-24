import { useState } from "react";

export default function InvoiceForm({ invoice, invoices, setInvoices, onBack }) {
  const myDefaultAddress = {
    street: "19 Union Terrace",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  };

  const [form, setForm] = useState(
    invoice || {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      description: "",
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: "",
      paymentTerms: 30,
      clientName: "",
      clientEmail: "",
      status: "pending",
      senderAddress: { ...myDefaultAddress },
      clientAddress: { street: "", city: "", postCode: "", country: "" },
      items: [],
      total: 0,
    }
  );

  const [errors, setErrors] = useState({});

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d) ? "" : d.toISOString().split("T")[0];
  };

  const handleAddressChange = (type, field, value) => {
    setForm((prev) => ({ ...prev, [type]: { ...prev[type], [field]: value } }));
  };

  const updateItem = (index, field, value) => {
    const items = [...form.items];
    items[index][field] = value;
    if (field === "quantity" || field === "price") {
      items[index].total = items[index].quantity * items[index].price;
    }
    setForm({ ...form, items, total: items.reduce((a, c) => a + c.total, 0) });
  };

  const addItem = () =>
    setForm({ ...form, items: [...form.items, { id: Date.now(), name: "", quantity: 1, price: 0, total: 0 }] });

  const deleteItem = (i) =>
    setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });

  const validate = () => {
    const newErrors = {};
    if (!form.clientName.trim()) newErrors.clientName = "Client name is required";
    if (!form.clientEmail.trim()) {
      newErrors.clientEmail = "Client email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.clientEmail)) {
      newErrors.clientEmail = "Invalid email format";
    }
    if (form.items.length === 0) {
      newErrors.items = "At least one item is required";
    } else {
      form.items.forEach((item, index) => {
        if (!item.name.trim()) newErrors[`itemName${index}`] = "Item name is required";
        if (item.quantity <= 0) newErrors[`itemQuantity${index}`] = "Quantity must be positive";
        if (item.price <= 0) newErrors[`itemPrice${index}`] = "Price must be positive";
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (invoice) {
      setInvoices(invoices.map((i) => (i.id === invoice.id ? form : i)));
    } else {
      setInvoices([{ ...form, status: "pending" }, ...invoices]);
    }
    onBack();
  };

  const handleDraft = () => {
    if (!validate()) return;
    setInvoices([{ ...form, status: "draft" }, ...invoices]);
    onBack();
  };

  return (
    <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && onBack()}>
      <div className="form-panel" role="dialog" aria-modal="true" aria-label={invoice ? `Edit #${invoice.id}` : "New Invoice"}>

        <h1>
          {invoice ? (
            <>Edit <span>#</span>{invoice.id}</>
          ) : (
            "New Invoice"
          )}
        </h1>

        <h4 className="section-title">Bill From</h4>
        <div className="form-group">
          <label>Street Address</label>
          <input
            type="text"
            value={form.senderAddress.street}
            onChange={(e) => handleAddressChange("senderAddress", "street", e.target.value)}
          />
        </div>
        <div className="form-row-3col">
          <div className="form-group">
            <label>City</label>
            <input type="text" value={form.senderAddress.city}
              onChange={(e) => handleAddressChange("senderAddress", "city", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Post Code</label>
            <input type="text" value={form.senderAddress.postCode}
              onChange={(e) => handleAddressChange("senderAddress", "postCode", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" value={form.senderAddress.country}
              onChange={(e) => handleAddressChange("senderAddress", "country", e.target.value)} />
          </div>
        </div>

        <h4 className="section-title">Bill To</h4>
        <div className="form-group">
          <label>Client's Name</label>
          <input type="text" value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            className={errors.clientName ? 'error' : ''} />
          {errors.clientName && <span className="error-msg">{errors.clientName}</span>}
        </div>
        <div className="form-group">
          <label>Client's Email</label>
          <input type="email" value={form.clientEmail}
            onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
            className={errors.clientEmail ? 'error' : ''} />
          {errors.clientEmail && <span className="error-msg">{errors.clientEmail}</span>}
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" value={form.clientAddress.street}
            onChange={(e) => handleAddressChange("clientAddress", "street", e.target.value)} />
        </div>
        <div className="form-row-3col">
          <div className="form-group">
            <label>City</label>
            <input type="text" value={form.clientAddress.city}
              onChange={(e) => handleAddressChange("clientAddress", "city", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Post Code</label>
            <input type="text" value={form.clientAddress.postCode}
              onChange={(e) => handleAddressChange("clientAddress", "postCode", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" value={form.clientAddress.country}
              onChange={(e) => handleAddressChange("clientAddress", "country", e.target.value)} />
          </div>
        </div>

        <div className="form-row-2col">
          <div className="form-group">
            <label>Invoice Date</label>
            <input
              type="date"
              value={formatDateForInput(form.createdAt)}
              onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
              disabled={!!invoice}
              style={invoice ? { opacity: 0.5, cursor: "not-allowed" } : {}}
            />
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              value={form.paymentTerms}
              onChange={(e) => setForm({ ...form, paymentTerms: Number(e.target.value) })}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%237c5dfa' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 20px center", paddingRight: 40 }}
            >
              <option value={1}>Net 1 Day</option>
              <option value={7}>Net 7 Days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Project Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <h3 className="item-list-title">Item List</h3>
        {errors.items && <span className="error-msg">{errors.items}</span>}

        {form.items.map((item, index) => (
          <div key={item.id} className="item-edit-row">
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className={errors[`itemName${index}`] ? 'error' : ''}
              />
              {errors[`itemName${index}`] && <span className="error-msg">{errors[`itemName${index}`]}</span>}
            </div>
            <div className="item-edit-grid">
              <div className="form-group">
                <label>Qty.</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                  className={errors[`itemQuantity${index}`] ? 'error' : ''}
                />
                {errors[`itemQuantity${index}`] && <span className="error-msg">{errors[`itemQuantity${index}`]}</span>}
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                  className={errors[`itemPrice${index}`] ? 'error' : ''}
                />
                {errors[`itemPrice${index}`] && <span className="error-msg">{errors[`itemPrice${index}`]}</span>}
              </div>
              <div className="form-group">
                <label>Total</label>
                <p className="read-only-total">{item.total.toFixed(2)}</p>
              </div>
              <button
                className="delete-item-btn"
                onClick={() => deleteItem(index)}
                aria-label={`Remove ${item.name}`}
              >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                  <path d="M11.5 3.5l-1 10.5a1 1 0 01-1 .9H3.5a1 1 0 01-1-.9l-1-10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M.5 3.5h12M4.5 3.5V2a1 1 0 011-1h2a1 1 0 011 1v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}

        <button className="add-item-btn" onClick={addItem}>
          + Add New Item
        </button>

        <div className="form-actions-footer">
          {invoice ? (
            <>
              <button className="cancel-btn" onClick={onBack}>Cancel</button>
              <div className="spacer" />
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <>
              <button className="discard-btn" onClick={onBack}>Discard</button>
              <div className="spacer" />
              <button className="draft-btn" onClick={handleDraft}>Save as Draft</button>
              <button className="save-btn" onClick={handleSave}>Save &amp; Send</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
