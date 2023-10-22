import React, { useState, useRef, useEffect } from "react";
import "./ExampleComponent.css";
import TextInput from "./TextInput";

const ExampleComponent = ({ content, updateAppState }) => {
  //tracks number of text inputs
  const [textInputs, setTextInputs] = useState([{}]);
  //tracks the values of those text inputs
  const [values, setValues] = useState([""]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
    }
  }, [textInputs]); // This effect runs every time a new TextInput is added

  // update the app state each time any of the TextInputs change
  useEffect(() => {
    updateAppState(values);
  }, [values]);

  // will update the local state any time any of the TextInputs are changed
  const handleTextInputChange = (index, value) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  // function to be called when the plus button is pressed
  const addTextInput = () => {
    if (textInputs.length === 3) {
      alert("Let's not go overboard, 3 examples is plenty!");
    } else {
      setTextInputs((prevTextInputs) => [...prevTextInputs, {}]);
      // add to state for app state updates
      setValues((prevValues) => [...prevValues, ""]);
    }
  };

  // function to update app state
  const handleUpdate = (e) => {
    updateAppState(e.target.value);
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
            onChange={(e) => handleTextInputChange(index, e.target.value)}
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
