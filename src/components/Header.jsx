import React from "react";
import SearchBar from "./SearchBar";
import { ASSETS } from "../utils/constants";

export default function Header({
  isMetric,
  toggleUnits,
  isDarkMode,
  toggleTheme,
  onSelectLocation,
}) {
  return (
    <header className="app-header">
      <div className="logo-area">
        <img src={ASSETS.logo} alt="Weather App Logo" className="logo-icon" />
        <span className="logo-text">WeatherApp</span>
      </div>

      <SearchBar onSelectLocation={onSelectLocation} />

      <div className="controls-area">
        <button
          onClick={toggleTheme}
          className="btn-panel icon-only"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <svg
              style={{ width: "1.5rem", height: "1.5rem", color: "#FBBF24" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          ) : (
            <svg
              style={{ width: "1.5rem", height: "1.5rem", color: "#334155" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
          )}
        </button>

        <button
          onClick={toggleUnits}
          className="btn-panel"
          aria-label="Toggle Units"
        >
          <img
            src={ASSETS.iconUnits}
            alt="Units"
            style={{
              width: "1.25rem",
              height: "1.25rem",
              filter: "var(--icon-filter)",
            }}
          />
          <span>{isMetric ? "Metric (°C)" : "Imperial (°F)"}</span>
        </button>
      </div>
    </header>
  );
}
