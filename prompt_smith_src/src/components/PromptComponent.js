import React, { useRef, useState, useEffect } from "react";
import "./PromptComponent.css";
import TextInput from "./TextInput";
import "font-awesome/css/font-awesome.min.css";

const PromptComponent = ({ content, updateAppState, handleSave }) => {
  const textInputRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPromptTitle(""); // reset the title for next time
  };

  const handleCopy = () => {
    // Get the value from the textarea using the ref
    const textToCopy = textInputRef.current.textContent;
    textToCopy;
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
  const handleUpdate = () => {
    updateAppState(textInputRef.current.textContent);
  };
  const handlePaste = (event) => {
    // Get plain text from clipboard
    const plainText = event.clipboardData.getData("text/plain");

    // Insert plain text at cursor position in the editable div
    document.execCommand("insertText", false, plainText);

    // Prevent default paste behavior
    event.preventDefault();
  };
  const placeholderStr = 'You must have a "Task" for a prompt to generate...';
  return (
    <div className="prompt-section">
      <h2>Here's Your Prompt:</h2>
      <div
        ref={textInputRef}
        className="prompt-text-container"
        contentEditable={true}
        onInput={handleUpdate}
        onPaste={handlePaste}
      >
        {content}
      </div>
      <div className="prompt-btns">
        <button onClick={handleOpenModal} className="save-btn">
          Save Prompt
        </button>
        <button onClick={handleCopy} className="copy-btn">
          <i
            className={`fa ${copySuccess ? "fa-check" : "fa-clipboard"} ${
              fadeOut ? "fade-out-icon" : ""
            }`}
          ></i>
        </button>
      </div>
      {showModal && (
        <div className="modal fade-in">
          <div className="modal-content">
            <h3>Save Your Prompt</h3>
            <input
              type="text"
              className="title-input"
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
              placeholder="Enter prompt title..."
            />
            <div className="modal-btns">
              <button
                onClick={() => {
                  const promptText = textInputRef.current.textContent;
                  handleSave(promptTitle, promptText);
                  handleCloseModal();
                }}
                className="modal-save-btn"
              >
                Save
              </button>
              <button onClick={handleCloseModal} className="modal-close-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PromptComponent;
