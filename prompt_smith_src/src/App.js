import React from "react";
import "./App.css";
import TaskComponent from "./components/TaskComponent";
import ContextComponent from "./components/ContextComponent";
import ExemplarComponent from "./components/ExemplarComponent";
import PromptComponent from "./components/PromptComponent";

function App() {
  return (
    <div className="container">
      <h1 className="title">Prompt Support</h1>
      <TaskComponent content={"Ask me interview questions"} />
      <ContextComponent
        content={
          "I am preparing for a technical interview for a Software Engineering II position at Google."
        }
      />
      <ExemplarComponent
        content={{
          example1: "Example content here...",
          example2: "Another example content here...",
        }}
      />
      <PromptComponent content={"Your prompt content here..."} />
    </div>
  );
}

export default App;
