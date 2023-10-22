import React from "react";
import "./FormatComponent.css";
import TextInput from "./TextInput";

const FormatComponent = ({ content }) => {
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
  return (
    <div className="format-section">
      <div className="left-col">
        <h2>Format</h2>
        <TextInput heightInRows="2" />
      </div>
      <div className="right-col">
        <h3>Some Common Formats</h3>
        <div className="common-format-container">
          <ul className="common-formats">
            {formatItems.map((item) => (
              <li key={item} onClick={() => handleItemClick(item)}>
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
