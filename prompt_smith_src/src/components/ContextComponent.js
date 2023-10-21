import React from "react";
import "./ContextComponent.css";
import TextInput from "./TextInput";
const ContextComponent = ({ content }) => {
  return (
    <div className="context-section">
      <h2>Context</h2>
      <TextInput heightInRows="5" />
    </div>
  );
};

export default ContextComponent;
