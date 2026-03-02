import React from "react";
import { ASSETS } from "../utils/constants";

export default function ErrorBanner({ error, onRetry }) {
  if (!error) return null;
  return (
    <div className="error-banner">
      <img
        src={ASSETS.iconError}
        alt="Error"
        style={{ width: "2rem", height: "2rem" }}
      />
      <div className="error-content">
        <h3 className="error-title">API Error</h3>
        <p className="error-text">{error}</p>
      </div>
      <button onClick={onRetry} className="btn-primary">
        <img
          src={ASSETS.iconRetry}
          alt=""
          style={{
            width: "1.25rem",
            height: "1.25rem",
            filter: "invert(1) brightness(2)",
          }}
        />
        Try Again
      </button>
    </div>
  );
}
