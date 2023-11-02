import React, { useState, useEffect } from "react";
import "./PersonaToneComponent.css";
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";
import InfoIcon from "./InfoIcon";

const PersonaToneComponent = ({
  content,
  updateToneState,
  updatePersonaState,
  updateProfessionalState,
}) => {
  const toneItems = [
    "Academic",
    "Analytical",
    "Authoritative",
    "Candid",
    "Cautious",
    "Cogent",
    "Compassionate",
    "Concerned",
    "Confident",
    "Considerate",
    "Contemplative",
    "Critical",
    "Curious",
    "Cynical",
    "Diplomatic",
    "Dramatic",
    "Energetic",
    "Emotional",
    "Empathetic",
    "Encouraging",
    "Enthusiastic",
    "Excited",
    "Frank",
    "Honest",
    "Humorous",
    "Informative",
    "Inquisitive",
    "Inspiring",
    "Intimate",
    "Ironic",
    "Joyful",
    "Logical",
    "Motivating",
    "Objective",
    "Open",
    "Optimistic",
    "Passionate",
    "Pensive",
    "Persuasive",
    "Polite",
    "Reflective",
    "Respectful",
    "Sarcastic",
    "Scholarly",
    "Serious",
    "Thoughtful",
    "Witty",
  ];

  const personaItems = [
    "Artist",
    "Astronomer",
    "Athlete",
    "Author",
    "Baker",
    "Blogger",
    "Botanist",
    "Business Coach",
    "CEO",
    "CFO",
    "Chef",
    "COO",
    "Coach",
    "Comedian",
    "Content Creator",
    "CTO",
    "Detective",
    "Dietician",
    "Digital Marketer",
    "E-commerce Consultant",
    "Ecologist",
    "Economist",
    "Engineer",
    "Entrepreneur",
    "Environmentalist",
    "Event Planner",
    "Fashion Designer",
    "Film Critic",
    "Financial Analyst",
    "Freelance Writer",
    "Graphic Designer",
    "Historian",
    "HR professional",
    "Influencer",
    "Journalist",
    "Life coach",
    "Linguist",
    "Marketing consultant",
    "Marketing expert",
    "Mathematician",
    "Mechanic",
    "Musician",
    "Nutritionist",
    "Online Course Creator",
    "Photographer",
    "Podcast Host",
    "Professor",
    "Public relations professional",
    "Public Relations Specialist",
    "Public speaker",
    "SEO Specialist",
    "Sales expert",
    "Scientist",
    "Social Media Manager",
    "Social Media Strategist",
    "Sociologist",
    "Statistician",
    "Technologist",
    "Traveler",
    "Veterinarian",
    "Virtual Assistant",
    "Web Developer",
    "Writer",
    "Zoologist",
  ];

  const [inputTone, setInputTone] = useState("");
  const [inputPersona, setInputPersona] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProfessional, setIsProfessional] = useState(false);

  //on mount, fill inputs from chrome state
  useEffect(() => {
    setInputPersona(content.persona);
    setSelectedItems(
      Object.values(content.tone).filter((value) => value !== "")
    );
    setIsProfessional(content.isProfessional);
  }, []);

  // update app state for persona
  useEffect(() => {
    updatePersonaState(inputPersona);
  }, [inputPersona]);

  useEffect(() => {
    updateProfessionalState(isProfessional);
  }, [isProfessional]);

  // update app state for tone
  useEffect(() => {
    updateToneState(selectedItems);
  }, [selectedItems]);

  const handleCheckboxChange = () => {
    setIsProfessional(!isProfessional);
  };

  const handleInputToneAddition = (tone) => {
    if (selectedItems.length === 3) {
      alert("Let's not go overboard, 3 tones is plenty!");
    } else {
      if (!selectedItems.includes(tone)) {
        setSelectedItems((prevItems) => [...prevItems, tone]);
      }
    }
  };
  const generatePersonaToolTip = () => {
    return (
      <div className="info-tooltip">
        <p className="tt-main-tip">
          Who do you want ChatGPT to be? <br />
          Be specific!
        </p>
        <p className="tt-example">
          For Example:
          <br />
          Senior web developer with 20 years of experience, specializing in
          UI/UX design.
        </p>
        <p className="tt-main-tip">
          Think of someone you wish you had instant access to regarding the
          problem you're trying to solve
        </p>
        <p className="tt-example">
          For Example: <br />A Scooby Doo impersonator
        </p>
      </div>
    );
  };
  const generateToneToolTip = () => {
    return (
      <div className="info-tooltip tt-tone-component">
        <p className="tt-main-tip">
          Picking a tone is challenging to do effectively. Instead, try telling
          ChatGPT the feeling you are going for.
        </p>
        <p className="tt-example">
          <span styles={{ "text-decoration": "italics" }}>
            ~ writing a complaint letter ~
          </span>
          <br /> "I want to be taken seriously without sounding too aggressive."
        </p>
      </div>
    );
  };
  return (
    <div className="persona-tone-section">
      {/* PERSONA SECTION */}
      <div className="persona-section">
        <div className="title-info-icon-container">
          <h2 className="mini-section-h2">Persona</h2>
          <InfoIcon generateToolTip={generatePersonaToolTip} />
        </div>
        <input
          className="tone-persona-input"
          type="text"
          value={inputPersona}
          onChange={(e) => {
            setInputPersona(e.target.value);
          }}
          placeholder="Input Persona..."
        />
        <div className="bot-container">
          <Dropdown
            dropdownTitle="Recommended ▽"
            items={personaItems}
            hasSelectedItems={false}
            selectedItems={inputPersona}
            setSelectedItems={setInputPersona}
          />
          <div className="persona-checkbox-item">
            Professional
            <input
              type="checkbox"
              checked={isProfessional}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>

      {/* TONE SECTION */}
      <div className="tone-section">
        <div className="title-info-icon-container">
          <h2 className="mini-section-h2">Tone</h2>
          <InfoIcon generateToolTip={generateToneToolTip} />
        </div>
        <input
          className="tone-persona-input"
          type="text"
          value={inputTone}
          placeholder="Input Tone..."
          onChange={(e) => setInputTone(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputTone.trim() !== "") {
              handleInputToneAddition(inputTone.trim());
              setInputTone("");
            }
          }}
        />
        <button
          className="submit-button"
          onClick={() => {
            if (inputTone.trim() !== "") {
              handleInputToneAddition(inputTone.trim());
              setInputTone("");
            }
          }}
        >
          <i className="triangle-icon"></i>
        </button>
        <Dropdown
          dropdownTitle="Recommended ▽"
          items={toneItems}
          hasSelectedItems={true}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  );
};

export default PersonaToneComponent;
