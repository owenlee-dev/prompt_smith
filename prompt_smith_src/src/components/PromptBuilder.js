import React, { useEffect } from "react";
// promptState = {
//   task: null,
//   context: null,
//   format: null,
//   personaTone: {
//     persona: null,
//     tone: {
//       tone1: null,
//       tone2: null,
//       tone3: null,
//     },
//   },
//   example: {
//     example1: null,
//     example2: null,
//     example3: null,
//   },
//   prompt: null,
// };
// `You are now a ${personaTone.persona}. I am ${context}. I need you to ${task}. Please return the information formatted as ${format}. Use a ${personaTone.tone.tone1} tone. For example: ${example}`;

const BuildPrompt = (promptState) => {
  let { task, context, format, personaTone, example, otherSettings } =
    promptState;
  // Ensure there is a task before rendering
  if (!task) return null;

  // This is {content} in PromptComponent
  return (
    <div className="prompt-components-wrapper">
      {otherSettings["Let's go step by step"] && <StepByStepAddition />}
      {otherSettings[
        "Forget everything I have told you up until this point"
      ] && <ForgetEverythingAddition />}
      {personaTone.persona && (
        <PersonaSection
          persona={personaTone.persona}
          isProfessional={personaTone.isProfessional}
        />
      )}
      {context && <ContextSection context={context} />}
      {task && <TaskSection task={task} />}
      {format && <FormatSection format={format} />}
      {(personaTone.tone.tone1 ||
        personaTone.tone.tone2 ||
        personaTone.tone.tone3) && <ToneSection tone={personaTone.tone} />}
      {(example.example1 || example.example2 || example.example3) && (
        <ExampleSection example={example} />
      )}
      <EndOfPromptAdditions otherSettings={otherSettings} />
    </div>
  );
};

const PersonaSection = ({ persona, isProfessional }) => {
  if (isProfessional) {
    return (
      <p>
        You are now a
        <span className="hl persona-hl">
          professional {persona.toLowerCase()} with over 20 years of
          experience.&nbsp;
        </span>
      </p>
    );
  } else {
    return (
      <p>
        You are now a
        <span className="hl persona-hl">{persona.toLowerCase()}</span>.&nbsp;
      </p>
    );
  }
};

const ContextSection = ({ context }) => {
  return (
    <p>
      <span className="hl context-hl">{context}</span>.&nbsp;
    </p>
  );
};

const TaskSection = ({ task }) => {
  return (
    <p>
      I need you to <span className="hl task-hl">{task}</span>.&nbsp;
    </p>
  );
};

const FormatSection = ({ format }) => {
  return (
    <p>
      {" "}
      Your response should be returned in the format of:&nbsp;
      <span className="hl format-hl">{format}</span>.&nbsp;
    </p>
  );
};

const ToneSection = ({ tone }) => {
  let toneArray = Object.values(tone).filter((value) => value !== "");
  if (toneArray.length === 0) {
    return <p></p>;
  } else if (toneArray.length === 1) {
    return (
      <p>
        The tone should be <span className="hl tone-hl">{toneArray[0]}</span>
        .&nbsp;
      </p>
    );
  } else {
    return (
      <p>
        The tone should be{" "}
        <span className="hl tone-hl">
          {toneArray[0]} and {toneArray[1]}
        </span>
        .&nbsp;
      </p>
    );
  }
};

const ExampleSection = ({ example }) => {
  // Get array of examples, excluding any null or empty values
  let exampleArray = Object.values(example).filter((value) => value !== "");

  if (!exampleArray.length) return null; // Return nothing if there are no examples

  const renderExample = (item, index) => {
    if (index === 0) return item; // Return the first item as is
    return (
      <>
        <br />
        <span className="no-hl">or:</span> <br /> {item}
      </>
    ); // Add "or:" before subsequent items
  };

  return (
    <p>
      <br />
      Your response should resemble something like:
      <br />
      <span className="hl example-hl">
        {exampleArray.map((item, index) => (
          <React.Fragment key={index}>
            {renderExample(item, index)}
          </React.Fragment>
        ))}
      </span>
    </p>
  );
};

const StepByStepAddition = ({ otherSettings }) => {
  return <p>Let's think step by step.&nbsp;</p>;
};
const ForgetEverythingAddition = ({ otherSettings }) => {
  return (
    <p>
      Forget everything I have told you up until this point, let's start
      fresh.&nbsp;
    </p>
  );
};

const EndOfPromptAdditions = ({ otherSettings }) => {
  const settingsMessages = {
    "Show all your work":
      "Make sure to show all of your work and the steps you took to get to your response",

    "Explain your reasoning":
      "Make sure to explain your reasoning that led you to this response",

    "Address any potential ambiguities or limitations in your answer":
      "Please address any potential ambiguities or limitations in your answer.",

    "Only use information that I have provided":
      "Only use information that I have provided, no outside sources",

    "Provide a draft for me to approve prior to giving the full response":
      "Provide a sample draft for me to approve and give feedback on prior to giving the full response.",

    "Give me <number> possible responses":
      "Give me a list of <number> potential responses.",

    "Cite all sources for the information used in your response":
      "Provide citations for each and every piece of information that you use in your response.",

    "Your response should be no more than <number> words":
      "Your response has a hard limit of <number> words.",

    "Ask me <number> questions before you start to ensure you understand":
      "Before you begin, please ask me <number> questions to ensure that you understand completely before generating your response.",
  };

  return (
    <div>
      {Object.keys(otherSettings).map((key) => {
        if (otherSettings[key] && settingsMessages[key]) {
          return (
            <p className="additional-info" key={key}>
              {settingsMessages[key]}&nbsp;
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default BuildPrompt;
