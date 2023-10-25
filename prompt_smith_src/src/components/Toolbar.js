import React from "react";
import "./Toolbar.css";

const Toolbar = (props) => {
  const { resetToDefault, ...rest } = props;
  return (
    <div className="toolbar-container">
      <button className="toolbar-btn clear-btn" onClick={resetToDefault}>
        Clear Prompt
      </button>
      <button className="toolbar-btn saved-btn">Saved Prompts</button>
    </div>
  );
};

export default Toolbar;
