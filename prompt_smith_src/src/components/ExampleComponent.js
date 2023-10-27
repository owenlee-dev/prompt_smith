import React, { useState, useRef, useEffect } from "react";
import "./ExampleComponent.css";
import TextInput from "./TextInput";
import InfoIcon from "./InfoIcon";

//content=Array(3) of strings, updateAppState=function to update the state to chrome.sync storage
const ExampleComponent = ({ content, updateAppState }) => {
  //tracks number of text inputs
  const [textInputs, setTextInputs] = useState([{}]);
  //tracks the values of those text inputs
  const [values, setValues] = useState([""]);
  const containerRef = useRef(null);

  // load on startup from the chrome sync storage
  useEffect(() => {
    if (content && content.length) {
      // Filter out null values and map to respective states
      const nonNullContent = content.filter((item) => item !== "");
      setTextInputs(nonNullContent.map(() => ({})));
      setValues(nonNullContent.length ? nonNullContent : [""]);
    }
  }, []);

  // scrolls to ensure the new text box is always in the screen
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
    }
  }, [textInputs]);

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
    if (textInputs.length === 2) {
      alert("Let's not go overboard, 3 examples is plenty!");
    } else {
      setTextInputs((prevTextInputs) => [...prevTextInputs, {}]);
      // add to state for app state updates
      setValues((prevValues) => [...prevValues, ""]);
    }
  };

  const generateToolTip = () => {
    return (
      <div className="info-tooltip">
        <p className="tt-main-tip">
          Including examples or templates in the prompt drastically improves the
          accuracy of the results.
        </p>
        <p className="tt-example">
          "I accomplished X by the measure of Y which resulted in Z"
        </p>
        <p className="tt-example">
          "Heres the first line of the poem to get you started."
        </p>
        <p className="tt-example">
          "Give your answer in terms of the SMART goal framework"
        </p>
        <p className="tt-main-tip">Use the power of ctrl+C, ctrl+V</p>
      </div>
    );
  };
  return (
    <div className="exemplar-section">
      <div className="title-info-icon-container">
        <h2>Examples / Templates</h2>
        <InfoIcon generateToolTip={generateToolTip} />
      </div>
      <div className="text-inputs-container " ref={containerRef}>
        {values.map((value, index) => (
          <TextInput
            placeholder="A nice to have, but not required"
            content={value}
            className="exemplar-text-input slide-in"
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
