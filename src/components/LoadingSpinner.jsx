import React from "react";
import "../styles/LoadingSpinner.css";

export function LoadingSpinner() {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" />
    </div>
  );
}
