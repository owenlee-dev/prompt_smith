import React, { useState, useEffect } from "react";
import "./App.css";
import TaskComponent from "./components/TaskComponent";
import ContextComponent from "./components/ContextComponent";
import ExampleComponent from "./components/ExampleComponent";
import PromptComponent from "./components/PromptComponent";
import FormatComponent from "./components/FormatComponent";
import PersonaToneComponent from "./components/PersonaToneComponent";
import Toolbar from "./components/Toolbar";
import BuildPrompt from "./components/PromptBuilder";
function App() {
  const defaultState = {
    task: "",
    context: "",
    format: "",
    personaTone: {
      persona: "",
      tone: {
        tone1: "",
        tone2: "",
        tone3: "",
      },
    },
    example: {
      example1: "",
      example2: "",
      example3: "",
    },
    prompt: "",
  };

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(defaultState);
  const [promptLibrary, setPromptLibrary] = useState([]);

  //increment to refresh the entire extension
  const [refreshKey, setRefreshKey] = useState(0);

  // Load state from chrome.sync when component mounts
  useEffect(() => {
    chrome.storage.sync.get("appState", (data) => {
      if (data.appState) {
        setState(data.appState);
      } else {
        setState(defaultState);
      }
      setLoading(false);
    });
    getPromptLibrary()
      .then((retrievedLibrary) => {
        setPromptLibrary(retrievedLibrary);
      })
      .catch((err) => {
        console.error("Failed to retrieve prompt library:", err);
      });
  }, []);

  // Save state to chrome.storage whenever it changes
  useEffect(() => {
    const stateWithoutPrompt = { ...state, prompt: "" };
    chrome.storage.sync.set({ appState: stateWithoutPrompt });
  }, [state]);

  // update the prompt when any of the textInputs are updated
  useEffect(() => {
    const newPrompt = BuildPrompt(state);
    if (newPrompt !== state.prompt) {
      setState((prevState) => ({ ...prevState, prompt: newPrompt }));
    }
  }, [
    state.task,
    state.context,
    state.format,
    state.personaTone,
    state.example,
  ]);

  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  function getPromptLibrary() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get("promptLibrary", (result) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError));
        } else {
          resolve(result.promptLibrary || []);
        }
      });
    });
  }
  // clear prompt button functionality
  const resetToDefault = () => {
    setState(defaultState);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSave = (title, content) => {
    if (title.trim()) {
      const newPrompt = {
        title: title,
        content: content.replace(/(\n\s*){3,}/g, "\n\n"),
      };

      // Update the local state with the new prompt
      const updatedLibrary = [...promptLibrary, newPrompt];
      setPromptLibrary(updatedLibrary);

      // Save the updated library to chrome storage
      chrome.storage.sync.set({ promptLibrary: updatedLibrary }, () => {
        console.log("Prompt library updated successfully!");
      });
      setRefreshKey((prevKey) => prevKey + 1);
    } else {
      console.error("Please provide a title before saving.");
    }
  };

  return (
    <div className="container" key={refreshKey}>
      <h1 className="title">Prompt Support</h1>
      <Toolbar resetToDefault={resetToDefault} promptLibrary={promptLibrary} />
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
              persona: personaTone || "",
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
                tone1: toneValue1 || "",
                tone2: toneValue2 || "",
                tone3: toneValue3 || "",
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
              example1: exampleValue1 || "",
              example2: exampleValue2 || "",
              example3: exampleValue3 || "",
            },
          }));
        }}
      />
      <PromptComponent
        handleSave={handleSave}
        content={BuildPrompt(state)}
        updateAppState={(prompt) =>
          setState((prevState) => ({ ...prevState, prompt }))
        }
      />
    </div>
  );
}

export default App;
