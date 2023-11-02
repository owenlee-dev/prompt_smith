import React, { useState, useEffect } from "react";
import "./OtherSettings.css";

const OtherSettings = ({ content, updateAppState }) => {
  const labels = [
    "Let's go step by step",
    "Forget everything I have told you up until this point",
    "Show all your work",
    "Explain your reasoning",
    "Address any potential ambiguities or limitations in your answer",
    "Only use information that I have provided",
    "Provide a draft for me to approve prior to giving the full response",
    "Give me <number> possible responses",
    "Cite all sources for the information used in your response",
    "Your response should be no more than <number> words",
    "Ask me <number> questions before you start to ensure you understand",
  ];

  const defaultStates = {};
  labels.forEach((label) => (defaultStates[label] = false));

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState(defaultStates);

  // Update state based on defaultValues on mount
  useEffect(() => {
    setCheckboxes(content);
  }, []);

  useEffect(() => {
    updateAppState(checkboxes);
  }, [checkboxes]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="other-settings-section">
      <div onClick={toggleDropdown} className="other-settings-btn">
        {!isDropdownOpen ? " Other Additions ▼" : " Other Additions ▲"}
      </div>
      <div
        className={
          isDropdownOpen ? "dropdown-content dropdown-open" : "dropdown-content"
        }
      >
        <div className="checkbox-container">
          {labels.map((label) => (
            <label key={label} className="checkbox-item">
              <input
                type="checkbox"
                name={label}
                checked={checkboxes[label]}
                onChange={handleCheckboxChange}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherSettings;
