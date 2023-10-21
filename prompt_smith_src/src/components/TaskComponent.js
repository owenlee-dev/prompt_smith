import React from "react";
import "./TaskComponent.css";
import TextInput from "./TextInput";

const TaskComponent = ({ content }) => {
  return (
    <div className="task-section">
      <h2>Task</h2>
      <TextInput heightInRows="5" />
    </div>
  );
};

export default TaskComponent;
