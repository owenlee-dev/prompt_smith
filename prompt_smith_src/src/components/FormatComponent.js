import React, { useState, useEffect } from "react";
import "./FormatComponent.css";
import TextInput from "./TextInput";
import InfoIcon from "./InfoIcon";

const FormatComponent = ({ content, updateAppState }) => {
  const favFormatItems = [
    "Concise summary",
    "Description like i'm <age> years old",
    "Edited text with the changes bolded",
    "Table",
    "Bullet Point List",
    "Email",
    "Markdown",
    "Pros and Cons List",
    "<type> Report",
    "Analogy",
    "Checklist",
    "Code Snippets",
    "CSV",
    "Meeting Minutes",
    "Memo",
    "Photo caption",
    "Proposal",
    "Timeline",
    "Tips and Tricks",
  ];
  const formatItems = [
    "Abbreviation",
    "Academic essay",
    "ASCII Art",
    "Biography",
    "Blog post",
    "Book chapter",
    "Book review",
    "Business Plan",
    "Business proposal",
    "Case Study",
    "Case study",
    "Diary entry",
    "FAQ",
    "HTML",
    "Horoscope Reading",
    "Infographic description",
    "Interview",
    "Job interview questions",
    "JSON",
    "Journal entry",
    "Lecture Notes",
    "Lesson Plan",
    "Linkedin profile summary",
    "List of Recommendations",
    "Love letter",
    "Mathematical Formula",
    "Meeting minutes",
    "Memo",
    "Metaphor",
    "Mind Map",
    "Mnemonic",
    "Motivational quote",
    "Numbered List",
    "Parody",
    "Presentation slides",
    "Product description",
    "Product review",
    "Research paper",
    "Short story",
    "Slideshow",
    "Social media post",
    "Source Code",
    "Speech",
    "Statistics",
    "Survey questionnaire",
    "SWOT analysis",
    "Table I can paste into <destination program>",
    "Technical documentation",
    "Thesis statement",
    "User manual",
    "Vector File",
    "Video script",
    "XML",
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

  const generateToolTip = () => {
    return (
      <div className="info-tooltip">
        <p className="tt-main-tip">
          What exactly do you want the output to look like for your specific use
          case
        </p>
        <p className="tt-example">
          Browse through the examples, and you'll discover some that may
          surprise you.
        </p>
        <p className="tt-main-tip">
          Be specific and take advantage of everything at your disposal
        </p>
      </div>
    );
  };
  return (
    <div className="format-section">
      <div className="left-col">
        <div className="title-info-icon-container">
          <h2>Format</h2>
          <InfoIcon generateToolTip={generateToolTip} />
        </div>
        <TextInput
          placeholder="Input Format ..."
          heightInRows="3"
          content={formatContent}
          onChange={(e) => setFormatContent(e.target.value)}
        />
      </div>
      <div className="right-col">
        <div className="common-format-container">
          <ul className="common-formats">
            <li className="bold">Favorites</li>
            {favFormatItems.map((item, index) => (
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
            <li className="bold">Other Formats</li>
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
