import React, { useState } from "react";
import "./PersonaToneComponent.css";
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";

const PersonaToneComponent = ({ content }) => {
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
  const handleInputToneAddition = (tone) => {
    if (!selectedItems.includes(tone)) {
      setSelectedItems((prevItems) => [...prevItems, tone]);
    }
  };

  return (
    <div className="persona-tone-section">
      {/* PERSONA SECTION */}
      <div className="persona-section">
        <h2>Persona:</h2>
        <input
          className="tone-persona-input"
          type="text"
          value={inputPersona}
          onChange={(e) => {
            setInputPersona(e.target.value);
          }}
          placeholder="Input Persona..."
        />
        <Dropdown
          dropdownTitle="Recommended ▽"
          items={personaItems}
          hasSelectedItems={false}
          selectedItems={inputPersona}
          setSelectedItems={setInputPersona}
        />
      </div>

      {/* TONE SECTION */}
      <div className="tone-section">
        <h2>Tone:</h2>
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
