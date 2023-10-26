import React from "react";
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
  let { task, context, format, personaTone, example } = promptState;
  // Ensure there is a task before rendering
  if (!task) return null;

  // This is {content} in PromptComponent
  return (
    <div className="prompt-components-wrapper">
      {personaTone.persona && <PersonaSection persona={personaTone.persona} />}
      {context && <ContextSection context={context} />}
      {task && <TaskSection task={task} />}
      {format && <FormatSection format={format} />}
      {(personaTone.tone.tone1 ||
        personaTone.tone.tone2 ||
        personaTone.tone.tone3) && <ToneSection tone={personaTone.tone} />}
      {(example.example1 || example.example2 || example.example3) && (
        <ExampleSection example={example} />
      )}
    </div>
  );
};

const PersonaSection = ({ persona }) => {
  return (
    <p>
      You are now a <span className="hl persona-hl">{persona}</span>.&nbsp;
    </p>
  );
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
      For example:
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

export default BuildPrompt;
