import React from "react";
import "./TaskComponent.css";
import TextInput from "./TextInput";

const TaskComponent = ({ content, updateAppState }) => {
  // function to update app state
  const handleUpdate = (e) => {
    updateAppState(e.target.value);
  };
  return (
    <div className="task-section">
      <h2>Task</h2>
      <TextInput content={content} heightInRows="2" onChange={handleUpdate} />
    </div>
  );
};

export default TaskComponent;
