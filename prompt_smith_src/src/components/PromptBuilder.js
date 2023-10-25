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
      You are now a <span className="persona-hl">{persona}</span>.
    </p>
  );
};

const ContextSection = ({ context }) => {
  return (
    <p>
      I am <span className="context-hl">{context}</span>.
    </p>
  );
};

const TaskSection = ({ task }) => {
  return (
    <p>
      {" "}
      I need you to <span className="task-hl">{task}</span>.
    </p>
  );
};

const FormatSection = ({ format }) => {
  return (
    <p>
      {" "}
      Please return the information formatted as a{" "}
      <span className="format-hl">{format}</span>.
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
        {" "}
        The tone should be <span className="tone-hl">{toneArray[0]}</span>.
      </p>
    );
  } else {
    return (
      <p>
        The tone should be{" "}
        <span className="tone-hl">
          {toneArray[0]} and {toneArray[1]}
        </span>
        .
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
        {" "}
        {"\n"} or: {"\n"} {item}{" "}
      </>
    ); // Add "or:" before subsequent items
  };

  return (
    <span className="example-hl">
      <p>
        For example, a response could resemble:
        {exampleArray.map((item, index) => (
          <React.Fragment key={index}>
            {renderExample(item, index)}
          </React.Fragment>
        ))}
      </p>
    </span>
  );
};

export default BuildPrompt;
