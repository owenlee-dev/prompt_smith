import React from "react";
import "./ContextComponent.css";
import TextInput from "./TextInput";
const ContextComponent = ({ content, updateAppState }) => {
  // function to update app state
  const handleUpdate = (e) => {
    updateAppState(e.target.value);
  };
  return (
    <div className="context-section">
      <h2>Context</h2>
      <TextInput content={content} heightInRows="2" onChange={handleUpdate} />
    </div>
  );
};

export default ContextComponent;
