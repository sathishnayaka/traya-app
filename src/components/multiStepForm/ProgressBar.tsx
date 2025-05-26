import React from "react";
export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="progress-bar-container">
    <div className="progress-bar-fill" style={{ width: `${progress}%` }}>{progress}%</div>
  </div>
);