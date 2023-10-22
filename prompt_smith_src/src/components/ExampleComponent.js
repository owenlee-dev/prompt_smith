import React, { useState, useRef, useEffect } from "react";
import "./ExampleComponent.css";
import TextInput from "./TextInput";

const ExampleComponent = ({ content }) => {
  const [textInputs, setTextInputs] = useState([{}]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
    }
  }, [textInputs]); // This effect runs every time a new TextInput is added

  // function to be called when the plus button is pressed
  const addTextInput = () => {
    setTextInputs((prevTextInputs) => [...prevTextInputs, {}]);
  };

  return (
    <div className="exemplar-section">
      <h2>Examples</h2>
      <div className="text-inputs-container" ref={containerRef}>
        {textInputs.map((_, index) => (
          <TextInput
            className="exemplar-text-input"
            heightInRows="5"
            key={index}
          />
        ))}
        <button className="plus-button" onClick={addTextInput}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default ExampleComponent;
