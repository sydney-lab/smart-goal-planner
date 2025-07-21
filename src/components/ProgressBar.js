import React from "react";

function ProgressBar({ saved, target }) {
  const percentage = Math.min((saved / target) * 100, 100);

  return (
    <div className="progress-bar" style={{ border: "1px solid #ccc", width: "100%", height: "10px" }}>
      <div style={{ width: `${percentage}%`, backgroundColor: "#4caf50", height: "100%" }} />
    </div>
  );
}

export default ProgressBar;
