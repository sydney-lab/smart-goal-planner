import React from "react";

function ProgressBar({ saved, target }) {
  const percentage = Math.min((saved / target) * 100, 100);
  
  // Determine color based on progress
  let barColor = "#ff9800"; // Default orange for in-progress
  
  if (percentage >= 100) {
    barColor = "#4caf50"; // Green for completed
  } else if (percentage >= 75) {
    barColor = "#8bc34a"; // Light green for almost there
  } else if (percentage <= 25) {
    barColor = "#f44336"; // Red for just started
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: barColor 
          }} 
        />
      </div>
    </div>
  );
}

export default ProgressBar;
