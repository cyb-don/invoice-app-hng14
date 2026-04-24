import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import heroImg from "../assets/hero-image.svg";

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
        <img width="28" height="26" src={heroImg} alt="logo image" />

       
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