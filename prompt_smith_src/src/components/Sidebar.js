import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import SavedPrompt from "./SavedPrompt";

const AreYouSureModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="areyousure-overlay">
      <div className="areyousure-content">
        <h3>Confirmation</h3>
        <p>Are you sure you want to delete?</p>
        <div className="areyousure-btns">
          <button className="modal-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({
  isOpen,
  setIsOpen,
  onClose,
  promptLibrary,
  setPromptLibrary,
}) => {
  const sidebarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [itemsToSlideUp, setItemsToSlideUp] = useState([]);

  useEffect(() => {
    console.log("Library has updated:", promptLibrary);
  }, [promptLibrary]);

  // click off the sidebar - it closes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updatePromptLibraryStorage = (updatedLibrary) => {
    // Save the updated library to chrome storage
    chrome.storage.sync.set({ promptLibrary: updatedLibrary }, () => {
      console.log("Prompt library updated successfully!");
    });
    // setRefreshKey((prevKey) => prevKey + 1);
  };

  // call back function
  const handleTrash = (title) => {
    setItemToDelete(title);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    setToBeDeleted(itemToDelete); // Start the delete animation

    // handle the slide up animation
    const idx = promptLibrary.findIndex((item) => item.title === itemToDelete);
    setItemsToSlideUp(promptLibrary.slice(idx + 1).map((item) => item.title));

    // Delay the actual deletion by the duration of the animation (500ms)
    setTimeout(() => {
      const newLibrary = promptLibrary.filter(
        (item) => item.title !== itemToDelete
      );
      setPromptLibrary(newLibrary);
      updatePromptLibraryStorage(newLibrary);
      setToBeDeleted(null); // Reset after deletion
      setItemsToSlideUp([]); // Reset the items to slide up
    }, 500);
  };

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <span className="sidebar-close-btn" onClick={onClose}>
        X
      </span>
      <div className="sb-header">
        <h1 className="sb-title">Saved Prompts</h1>
      </div>
      {promptLibrary.map((prompt, index) => {
        return (
          <SavedPrompt
            title={prompt.title}
            prompt={prompt.content}
            key={index}
            handleTrashClick={handleTrash}
            isDeleting={prompt.title === toBeDeleted}
            slideUp={itemsToSlideUp.includes(prompt.title)}
          />
        );
      })}
      <AreYouSureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Sidebar;
