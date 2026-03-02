import React, { useState, useEffect, useRef } from "react";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { ASSETS } from "../utils/constants";

export default function SearchBar({ onSelectLocation }) {
  const { searchQuery, setSearchQuery, searchResults, isSearching } =
    useLocationSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a city..."
          className="search-input"
        />
        <img src={ASSETS.iconSearch} alt="Search" className="search-icon" />
        {isSearching && (
          <img
            src={ASSETS.iconLoading}
            alt="Loading"
            className="search-loading-icon"
          />
        )}
      </div>

      {showDropdown && searchQuery.trim().length >= 2 && (
        <div className="search-dropdown">
          {isSearching ? (
            <div className="dropdown-message">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <img
                  src={ASSETS.iconLoading}
                  alt="Loading"
                  className="spinner"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    filter: "var(--icon-filter)",
                  }}
                />{" "}
                Searching...
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((res) => (
              <button
                key={res.id}
                onClick={() => {
                  onSelectLocation(res);
                  setSearchQuery("");
                  setShowDropdown(false);
                }}
                className="dropdown-item"
              >
                <div className="dropdown-item-content">
                  <span className="dropdown-title">{res.name}</span>
                  <span className="dropdown-subtitle">
                    {res.admin1 ? `${res.admin1}, ` : ""}
                    {res.country}
                  </span>
                </div>
                <div className="dropdown-icons">
                  <img
                    src={ASSETS.iconDropdown}
                    alt=""
                    className="dropdown-arrow"
                  />
                </div>
              </button>
            ))
          ) : (
            <div className="dropdown-message">
              <span className="dropdown-title">No results found</span>
              <span className="dropdown-subtitle">
                Try adjusting your search terms
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
