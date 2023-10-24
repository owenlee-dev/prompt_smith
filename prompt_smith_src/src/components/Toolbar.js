import React from "react";
import "./Toolbar.css";

const Toolbar = () => {
  return (
    <div className="toolbar-container">
      <button className="toolbar-btn clear-btn">Clear Prompt</button>
      <button className="toolbar-btn saved-btn">View Saved Prompts</button>
    </div>
  );
};

export default Toolbar;
