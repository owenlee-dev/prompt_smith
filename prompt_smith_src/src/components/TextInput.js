import React from "react";
import "./TextInput.css";

const TextInput = React.forwardRef((props, ref) => {
  const { heightInRows, className, content, ...rest } = props;
  return (
    <textarea
      value={content}
      ref={ref}
      className={className}
      rows={heightInRows}
      {...rest}
    ></textarea>
  );
});

export default TextInput;
