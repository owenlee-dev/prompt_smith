import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import SavedPrompt from "./SavedPrompt";
const Sidebar = ({ isOpen, setIsOpen, onClose, promptLibrary }) => {
  const sidebarRef = useRef(null);
  useEffect(() => {
    console.log("Library has updated:", promptLibrary);
  }, [promptLibrary]);

  // click off the sidebar - it closes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <span className="sidebar-close-btn" onClick={onClose}>
        X
      </span>
      <div className="sb-header">
        <h1 className="sb-title">Saved Prompts</h1>
      </div>
      {promptLibrary.map((prompt, index) => {
        return (
          <SavedPrompt
            title={prompt.title}
            prompt={prompt.content}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
