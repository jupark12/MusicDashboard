import React, { useState, useContext } from "react";
import UploadModal from "../Modal/UploadModal";
import { GlobalContext } from "../../util/GlobalState"; 
import { FaPlusCircle, FaEdit, FaTrash, FaGripVertical } from "react-icons/fa";
import "./Tracklist.scss";

const Tracklist = () => {
  console.log("Tracklist.js");

  const { editMode, setEditMode, cards, setCards, currentIndex, setCurrentIndex, setTotalRotation, isPlaying } = useContext(GlobalContext);


  const handleTrackClick = (event) => {
    console.log(event)
    const selectedIndex = Number(event.currentTarget.dataset.index);
    setCurrentIndex(selectedIndex);
    setTotalRotation(prevRotation => {
      const newRotation = selectedIndex >= currentIndex ? prevRotation - (360 / cards.length) * (selectedIndex - currentIndex) : prevRotation + (360 / cards.length) * (currentIndex - selectedIndex);
      return newRotation;
    });
  }
  
  const handleDrag = (event) => {
    console.log("Drag event", event.currentTarget.dataset);
    const draggedIndex = Number(event.currentTarget.dataset.index);
    const draggedCard = cards[draggedIndex];
    const newCards = [...cards];
    newCards.splice(draggedIndex, 1);
    const dropIndex = currentIndex > draggedIndex ? currentIndex - 1 : currentIndex;
    newCards.splice(dropIndex, 0, draggedCard);
    setCards(newCards);
  }

  return(
    <div className="Tracklist-container">
      <div className="Tracklist pt-8">
        {cards.map((card, index) => (
          <div className="flex gap-4">
            <div key={index} className={`track w-full ${index === currentIndex ? 'active' : ''}`} data-index={index} onClick={handleTrackClick}>
              {index+1}.{' '}{card.title}{' '}
              {index === currentIndex && isPlaying && (
                <div className="squiggle"></div> 
              )}
            </div>
            {editMode && (
              <button 
                onClick={handleDrag} 
                className="Tracklist-dragIcon ml-auto text-white z-10 right-10"
                data-index={index}
              >
                <FaGripVertical size={24} className=""/>
              </button> 
            )}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Tracklist;