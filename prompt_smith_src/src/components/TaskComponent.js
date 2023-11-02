import React from "react";
import "./TaskComponent.css";
import TextInput from "./TextInput";
import InfoIcon from "./InfoIcon";

const TaskComponent = ({ content, updateAppState }) => {
  // function to update app state
  const handleUpdate = (e) => {
    updateAppState(e.target.value);
  };

  const generateToolTip = () => {
    return (
      <div className="info-tooltip">
        <p className="tt-main-tip">
          Always start the task with an action verb.
        </p>
        <p className="tt-example">
          For Example: <br />
          Generate, provide, write, analyze, summarize etc...
        </p>
        <p className="tt-main-tip">
          If you want ChatGPT to do multiple tasks, you should include multiple
          action verbs
        </p>
        <p className="tt-example">
          For Example: <br />
          Analyze _____, summarize _____ and then categorize _____
        </p>
      </div>
    );
  };
  return (
    <div className="task-section">
      <div className="title-info-icon-container">
        <h2>Task</h2>
        <InfoIcon generateToolTip={generateToolTip} />
      </div>

      <TextInput
        placeholder="What do you want to do?  -  Example: Write an email"
        content={content}
        heightInRows="2"
        onChange={handleUpdate}
      />
    </div>
  );
};

export default TaskComponent;
