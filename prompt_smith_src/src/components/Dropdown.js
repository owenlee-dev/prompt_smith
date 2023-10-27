import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

const SelectedItem = ({ item, onRemove }) => {
  return (
    <div className="selected-item pop-in">
      <span className="item-label">{item}</span>
      <div className="divider"></div>
      <button onClick={() => onRemove(item)} className="remove-btn">
        X
      </button>
    </div>
  );
};

const Dropdown = ({
  items = [],
  dropdownTitle,
  selectedItems,
  setSelectedItems,
  hasSelectedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // next 2 functions handle the management of the selected items list
  const handleItemClick = (item) => {
    if (selectedItems.length === 3) {
      alert("Let's not go overboard, 3 tones is plenty!");
    } else {
      if (hasSelectedItems) {
        if (!selectedItems.includes(item)) {
          setSelectedItems((prevItems) => [...prevItems, item]);
        } else {
          setSelectedItems((prevItems) => prevItems.filter((i) => i !== item));
        }
      } else {
        setSelectedItems(item);
      }
    }
  };
  const removeSelectedItem = (item) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {dropdownTitle}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {hasSelectedItems && (
        <div className="selected-item-list">
          {selectedItems.map((item) => (
            <SelectedItem item={item} onRemove={removeSelectedItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
