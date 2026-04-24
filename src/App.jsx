import { useEffect, useState } from "react";
import data from "./data/data.json";
import { loadInvoices, saveInvoices } from "./utils/localStorage";

// COMPONENTS
import InvoiceList from "./components/InvoiceList";
import InvoiceDetails from "./components/InvoiceDetails";
import InvoiceForm from "./components/InvoiceForm";
import Header from "./components/Header.jsx";
import Filter from "./components/Filter.jsx";

function App() {
  // STATES
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [view, setView] = useState("list"); // list, detail, form

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // LOAD DATA
  useEffect(() => {
    const stored = loadInvoices();
    if (stored && stored.length > 0) {
      setInvoices(stored);
    } else {
      setInvoices(data);
      saveInvoices(data);
    }
  }, []);

  // SYNC FILTERED DATA
  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  // FILTER
  const handleFilter = (statuses) => {
    if (statuses.length === 0) {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((inv) => statuses.includes(inv.status));
      setFilteredInvoices(filtered);
    }
  };

  const openDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setView("detail");
  };

  const openForm = (invoice = null) => {
    setSelectedInvoice(invoice);
    setView("form");
  };

  const goBack = () => {
    setSelectedInvoice(null);
    setView("list");
  };

  return (
    <>
      <Header onAdd={() => openForm()} />

      <div className="app-container">
        {view === "list" && (
          <>
            <Filter onFilter={handleFilter} invoiceCount={filteredInvoices.length} onAdd={() => openForm()} />
            <InvoiceList invoices={filteredInvoices} onClick={openDetails} />
          </>
        )}

        {view === "detail" && (
          <InvoiceDetails
            invoice={selectedInvoice}
            onBack={goBack}
            onEdit={() => openForm(selectedInvoice)}
            invoices={invoices}
            setInvoices={setInvoices}
          />
        )}

        {view === "form" && (
          <InvoiceForm
            invoice={selectedInvoice}
            onBack={goBack}
            invoices={invoices}
            setInvoices={setInvoices}
          />
        )}
      </div>
    </>
  );
}

export default App;
