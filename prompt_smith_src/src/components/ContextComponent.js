import React from "react";
import "./ContextComponent.css";
import InfoIcon from "./InfoIcon";
import TextInput from "./TextInput";

const ContextComponent = ({ content, updateAppState }) => {
  // function to update app state
  const handleUpdate = (e) => {
    updateAppState(e.target.value);
  };

  const generateToolTip = () => {
    return (
      <div className="info-tooltip">
        <p className="tt-main-tip">Try and answer these questions:</p>
        <ul className="tt-bullet-points">
          <li className="red1">What is the users background?</li>
          <li className="red2">What does success look like?</li>
          <li className="red3">What environment are they in?</li>
        </ul>
        <p className="tt-example">
          For Example: <br />
          <span className="hl red1">I am a novice in the kitchen</span>,{" "}
          <span className="hl red2">
            I'm looking to cook a delicious vegetarian meal for a date I have
            tonight.
          </span>{" "}
          <span className="hl red3">
            I only have 3 hours and 50$ to spend on ingredients.
          </span>
        </p>
        <p className="tt-main-tip">
          Provide just enough information to constrain the limitless
          possibilities.
        </p>
      </div>
    );
  };

  return (
    <div className="context-section">
      <div className="title-info-icon-container">
        <h2>Context</h2>
        <InfoIcon generateToolTip={generateToolTip} />
      </div>
      <TextInput
        placeholder="Give some supporting information"
        content={content}
        heightInRows="2"
        onChange={handleUpdate}
      />
    </div>
  );
};

export default ContextComponent;
