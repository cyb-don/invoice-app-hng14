import { useEffect, useRef } from "react";

export default function Modal({ message, onConfirm, onCancel }) {
  const modalRef = useRef(null);
  const firstButtonRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current.querySelectorAll("button");
      const firstElement = focusableElements;
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", handleKeyDown);
    
    if (firstButtonRef.current) {
      firstButtonRef.current.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="modal-overlay" role="alertdialog" aria-modal="true">
      <div className="modal-content" ref={modalRef}>
        <h2>Confirm Deletion</h2>
        <p className="modal-text">{message}</p>

        <div className="modal-actions">
          <button
            ref={firstButtonRef}
            onClick={onCancel}
            className="secondary-btn"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="delete-confirm-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}