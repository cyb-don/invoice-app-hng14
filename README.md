# Invoice App — HNG

A responsive invoice management app built with React 19 and Vite. It supports creating, editing, deleting, and filtering invoices, with data stored in `localStorage` and a light/dark theme.

---

## Setup

### Requirements

* Node.js (v18+)
* npm (v9+)

### Run locally

```
cd invoice-app-hng
npm install
npm run dev
```

Runs on `http://localhost:5173`.

### Scripts

* `npm run dev` – start dev server
* `npm run build` – build for production
* `npm run preview` – preview build
* `npm run lint` – run linter

---

## Architecture

Single-page React app without a routing library. Navigation is handled with component state.

### Structure

* `components/` – UI (list, form, modal, etc.)
* `context/` – theme handling
* `data/` – seed data
* `utils/` – localStorage helpers
* `App.jsx` – main state and view control

### State

All invoices live in `App`. Filtering is derived state. No external state libraries used.

### Navigation

Controlled by `view` state (`list`, `detail`, `form`). No URL routing.

### Persistence

Invoices and theme preference are saved in `localStorage`. Seed data loads on first run.

### Styling

Single CSS file using custom properties and responsive breakpoints.

---

## Trade-offs

* Global CSS instead of scoped styles
* No URL routing (no deep linking/history)
* Uses `localStorage` instead of a backend
* Simple ID generation (possible collisions)
* Seed data doesn’t update after first load
* Dates not fully recalculated on edit

---

## Accessibility

* Keyboard navigation for invoice items
* ARIA labels on icon buttons
* Modal focus trapping and escape support
* Proper dialog roles
* Decorative elements hidden from screen readers
* Clear heading structure

---

## Extras

* Persistent dark mode
* Inline form validation
* Responsive layouts
* Empty state UI
* Click-outside dropdown handling
* Overlay click to close form
* Auto-calculated totals
