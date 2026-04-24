import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({ onAdd, invoiceCount }) {
  const context = useContext(ThemeContext);

  if (!context) {
    console.error("ThemeContext not found. Did you wrap with ThemeProvider?");
    return null;
  }

  const { theme, setTheme } = context;

  return (
    <nav className="app-nav">
      <div className="nav-logo" aria-label="Invoice App">
        <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5145 0L27.9999 13L20.5145 26H13.9999L21.4853 13L13.9999 0H20.5145Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5146 0L21.0001 13L13.5146 26H6.99999L14.4854 13L6.99999 0H13.5146Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      <div className="nav-spacer" />

      <button
        className="nav-theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19 10.79A9 9 0 119.21 1a7 7 0 0010 9.79h-.21z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )}
      </button>

      <div className="nav-divider" />

      <img
        className="nav-avatar"
        src="https://w0.peakpx.com/wallpaper/655/15/HD-wallpaper-baby-groot-in-suit-anime-baby-groot-guardians-of-the-galaxy-huawei-iphone-oneplus-samsung-sony-xiaomi.jpg"
        alt="User avatar"
      />
    </nav>
  );
}