import React from "react";
import "./ExemplarComponent.css";
import TextInput from "./TextInput";

const ExemplarComponent = ({ content }) => {
  return (
    <div className="exemplar-section">
      <h2>Exemplar</h2>
      <div className="examples">
        <TextInput heightInRows="5" content={content.example1} />
        <TextInput heightInRows="5" content={content.example2} />
      </div>
    </div>
  );
};

export default ExemplarComponent;
