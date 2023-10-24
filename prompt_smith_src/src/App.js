import React, { useState, useEffect } from "react";
import "./App.css";
import TaskComponent from "./components/TaskComponent";
import ContextComponent from "./components/ContextComponent";
import ExampleComponent from "./components/ExampleComponent";
import PromptComponent from "./components/PromptComponent";
import FormatComponent from "./components/FormatComponent";
import PersonaToneComponent from "./components/PersonaToneComponent";
import Toolbar from "./components/Toolbar";
function App() {
  const defaultState = {
    task: null,
    context: null,
    format: null,
    personaTone: {
      persona: null,
      tone: {
        tone1: null,
        tone2: null,
        tone3: null,
      },
    },
    example: {
      example1: null,
      example2: null,
      example3: null,
    },
    prompt: null,
  };

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(defaultState);

  // Load state from chrome.storage when component mounts
  useEffect(() => {
    chrome.storage.sync.get("appState", (data) => {
      if (data.appState) {
        setState(data.appState);
      } else {
        setState(defaultState);
      }
      setLoading(false);
    });
  }, []);

  // Save state to chrome.storage whenever it changes
  useEffect(() => {
    chrome.storage.sync.set({ appState: state });
  }, [state]);

  if (loading) {
    console.log("loading");
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <div className="container">
      <h1 className="title">Prompt Support</h1>
      <Toolbar />
      <TaskComponent
        content={state.task}
        updateAppState={(task) =>
          setState((prevState) => ({ ...prevState, task }))
        }
      />
      <ContextComponent
        content={state.context}
        updateAppState={(context) =>
          setState((prevState) => ({ ...prevState, context }))
        }
      />
      <FormatComponent
        content={state.format}
        updateAppState={(format) =>
          setState((prevState) => ({ ...prevState, format }))
        }
      />
      <PersonaToneComponent
        content={state.personaTone}
        updatePersonaState={(personaTone) => {
          setState((prevState) => ({
            ...prevState,
            personaTone: {
              ...prevState.personaTone,
              persona: personaTone || null,
            },
          }));
        }}
        updateToneState={(selectedItems) => {
          const [toneValue1, toneValue2, toneValue3] = selectedItems;
          setState((prevState) => ({
            ...prevState,
            personaTone: {
              ...prevState.personaTone,
              tone: {
                tone1: toneValue1 || null,
                tone2: toneValue2 || null,
                tone3: toneValue3 || null,
              },
            },
          }));
        }}
      />
      <ExampleComponent
        content={Object.values(state.example)}
        updateAppState={(examples) => {
          const [exampleValue1, exampleValue2, exampleValue3] = examples;
          setState((prevState) => ({
            ...prevState,
            example: {
              example1: exampleValue1 || null,
              example2: exampleValue2 || null,
              example3: exampleValue3 || null,
            },
          }));
        }}
      />
      <PromptComponent
        content={state.prompt}
        updateAppState={(prompt) =>
          setState((prevState) => ({ ...prevState, prompt }))
        }
      />
    </div>
  );
}

export default App;
