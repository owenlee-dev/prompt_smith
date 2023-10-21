import React from "react";
import "./PromptComponent.css";
import TextInput from "./TextInput";

const PromptComponent = ({ content }) => {
  return (
    <div className="prompt-section">
      <h2>Here's Your Prompt:</h2>
      <TextInput heightInRows="5" />
    </div>
  );
};

export default PromptComponent;
