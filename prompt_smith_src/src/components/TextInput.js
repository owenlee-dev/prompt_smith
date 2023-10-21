import React from "react";
import "./TextInput.css";

const TextInput = ({
  heightInRows = "2",
  placeholder = "Input Text...",
  content = " ",
}) => {
  return <textarea defaultValue={content} rows={heightInRows}></textarea>;
};
export default TextInput;
