import React, { useEffect, useState, useRef } from "react";

const SavedPrompt = ({ title, prompt, key }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const promptRef = useRef(null);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    if (promptRef.current.scrollHeight > promptRef.current.clientHeight) {
      setShowButton(true);
    }
  }, [prompt]);

  const handleCopy = () => {
    // Get the value from the textarea using the ref
    const textToCopy = promptRef.current.textContent;
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
  return (
    <div
      key={key}
      className={`saved-prompt-container ${isExpanded ? "expanded" : ""}`}
    >
      <h2 className="saved-prompt-title">{title}</h2>
      <p
        ref={promptRef}
        style={isExpanded ? { overflow: "visible", display: "block" } : {}}
      >
        {prompt}
      </p>
      {/* <div className={`sidebar ${isOpen ? "open" : ""}`}> */}
      <div
        className={`${
          showButton ? "bot-sb-container-double" : "bot-sb-container"
        }`}
      >
        {showButton && (
          <button className="show-more-btn" onClick={handleToggleExpand}>
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
        <div>
          <button className="sb-btn" onClick={handleTrash}>
            <i className="fa fa-trash"></i>
          </button>
          <button className="sb-btn" onClick={handleCopy}>
            <i
              className={`fa ${copySuccess ? "fa-check" : "fa-clipboard"} ${
                fadeOut ? "fade-out-icon" : ""
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SavedPrompt;
