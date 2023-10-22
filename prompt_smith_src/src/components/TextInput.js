import React from "react";
import "./TextInput.css";

const TextInput = React.forwardRef(
  (
    {
      heightInRows = "2",
      placeholder = "Input Text...",
      content = " ",
      className,
      key,
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        className={className}
        defaultValue={content}
        rows={heightInRows}
      ></textarea>
    );
  }
);

export default TextInput;
