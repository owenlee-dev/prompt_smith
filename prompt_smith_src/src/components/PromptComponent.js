import React, { useRef, useState } from "react";
import "./PromptComponent.css";
import TextInput from "./TextInput";
import "font-awesome/css/font-awesome.min.css";

const PromptComponent = ({ content, updateAppState }) => {
  const textInputRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopy = () => {
    // Get the value from the textarea using the ref
    const textToCopy = textInputRef.current.value;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setFadeOut(true);

        // Once fade-out is done, show the success icon
        setTimeout(() => {
          setCopySuccess(true);
          setFadeOut(false);
        }, 300);

        // Revert to the original icon after a brief delay
        setTimeout(() => setCopySuccess(false), 2300);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  // function to update app state
  const handleUpdate = (e) => {
    updateAppState(e.target.value);
  };

  return (
    <div className="prompt-section">
      <h2>Here's Your Prompt:</h2>
      <TextInput
        content={content}
        heightInRows="5"
        ref={textInputRef}
        onChange={handleUpdate}
      />
      <button onClick={handleCopy} className="copy-btn">
        <i
          className={`fa ${copySuccess ? "fa-check" : "fa-clipboard"} ${
            fadeOut ? "fade-out-icon" : ""
          }`}
        ></i>
      </button>
    </div>
  );
};

export default PromptComponent;
