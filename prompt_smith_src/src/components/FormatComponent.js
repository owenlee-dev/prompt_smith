import React, { useState, useEffect } from "react";
import "./FormatComponent.css";
import TextInput from "./TextInput";

const FormatComponent = ({ content, updateAppState }) => {
  const formatItems = [
    "Academic essay",
    "Biography",
    "Blog post",
    "Book chapter",
    "Book review",
    "Business proposal",
    "Case study",
    "Presentation slides",
    "Diary entry",
    "Email",
    "Video script",
    "FAQ",
    "Infographic description",
    "Interview",
    "Job interview questions",
    "Journal entry",
    "Linkedin profile summary",
    "Love letter",
    "Memo",
    "Meeting minutes",
    "Motivational quote",
    "Parody",
    "Photo caption",
    "Product description",
    "Product review",
    "Research paper",
    "Short story",
    "Social media post",
    "Speech",
    "Survey questionnaire",
    "Technical documentation",
    "Thesis statement",
    "User manual",
  ];
  const [selected, setSelected] = useState("");
  const [formatContent, setFormatContent] = useState("");

  // function to update app state
  useEffect(() => {
    updateAppState(formatContent);
  }, [formatContent]);

  // on mount, fill textArea with saved state
  useEffect(() => {
    setFormatContent(content);
  }, []);

  return (
    <div className="format-section">
      <div className="left-col">
        <h2>Format</h2>
        <TextInput
          heightInRows="3"
          content={formatContent}
          onChange={(e) => setFormatContent(e.target.value)}
        />
      </div>
      <div className="right-col">
        <h3>Some Common Formats</h3>
        <div className="common-format-container">
          <ul className="common-formats">
            {formatItems.map((item, index) => (
              <li
                key={index}
                className={`format-item ${
                  selected === index ? "selected" : ""
                }`}
                onMouseEnter={() => setSelected(index)}
                onMouseLeave={() => setSelected(null)}
                onClick={() => setFormatContent(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormatComponent;
