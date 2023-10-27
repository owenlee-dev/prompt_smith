import React, { useState } from "react";
import "./Toolbar.css";
import Sidebar from "./Sidebar";

const Toolbar = (props) => {
  const { resetToDefault, promptLibrary, setPromptLibrary, ...rest } = props;
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="toolbar-container">
      <button className="toolbar-btn clear-btn" onClick={resetToDefault}>
        Clear Prompt
      </button>
      <button
        className="toolbar-btn saved-btn"
        onClick={() => setShowSidebar(true)}
      >
        Saved Prompts
      </button>
      <Sidebar
        promptLibrary={promptLibrary}
        setPromptLibrary={setPromptLibrary}
        isOpen={showSidebar}
        setIsOpen={setShowSidebar}
        onClose={() => setShowSidebar(false)}
      />
    </div>
  );
};

export default Toolbar;
