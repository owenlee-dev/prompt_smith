import React, { useState } from "react";
import "./InfoIcon.css";

const InfoIcon = ({ generateToolTip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="info-icon-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`info-icon ${showTooltip ? "active" : ""}`}>i</div>
      {showTooltip && generateToolTip()}
    </div>
  );
};
export default InfoIcon;
