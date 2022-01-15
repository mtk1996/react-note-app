import React from "react";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span
        className="spinner-border spinner-border-sm mb-1"
        role="status"
        aria-hidden="true"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
