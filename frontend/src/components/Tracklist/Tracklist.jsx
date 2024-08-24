import React, { useState, useContext, useEffect } from "react";
import UploadModal from "../Modal/UploadModal";
import { GlobalContext } from "../../util/GlobalState";
import { FaPlusCircle, FaEdit, FaTrash, FaGripVertical } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Tracklist.scss";
import { set } from "lodash";

const Tracklist = () => {
  const {
    editMode,
    setEditMode,
    cards,
    setCards,
    currentIndex,
    setCurrentIndex,
    setTotalRotation,
    isPlaying,
    setIsSameAudio,
  } = useContext(GlobalContext);

  const handleTrackClick = (event) => {
    const selectedIndex = Number(event.currentTarget.dataset.index);
    setCurrentIndex(selectedIndex);
    setTotalRotation((prevRotation) => {
      const newRotation =
        selectedIndex >= currentIndex
          ? prevRotation - (360 / cards.length) * (selectedIndex - currentIndex)
          : prevRotation +
            (360 / cards.length) * (currentIndex - selectedIndex);
      return newRotation;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over.id);
      setCards((cards) => {
        const updatedCards = arrayMove(cards, oldIndex, newIndex);
        setCurrentIndex((prevIndex) => {
          setIsSameAudio(updatedCards[newIndex].id == cards[prevIndex].id);
          return newIndex;
        });
        return updatedCards;
      });

      setTotalRotation((prevRotation) => {
        const newRotation =
          newIndex >= oldIndex
            ? prevRotation - (360 / cards.length) * (newIndex - oldIndex)
            : prevRotation + (360 / cards.length) * (oldIndex - newIndex);
        return newRotation;
      });
    }
  };

  return (
    <div className="Tracklist-container w-full">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map((card) => card.id)}>
          <div className="Tracklist pt-8">
            {cards.map((card, index) => (
              <SortableTrack
                key={card.id}
                card={card}
                index={index}
                isActive={index === currentIndex}
                onClick={handleTrackClick}
                editMode={editMode}
                isPlaying={isPlaying}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableTrack = ({
  card,
  index,
  isActive,
  onClick,
  editMode,
  isPlaying,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
      disabled: !editMode,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-4">
      <div
        className={`track w-full ${isActive ? "active" : ""}`}
        data-index={index}
        onClick={onClick}
      >
        {index + 1}. {card.title}{" "}
        {isActive && isPlaying && <div className="squiggle"></div>}
      </div>

      {editMode && (
        <button
          className="Tracklist-dragIcon ml-auto text-white z-10 right-10"
          data-index={index}
          {...attributes}
          {...listeners}
        >
          <FaGripVertical size={24} />
        </button>
      )}
    </div>
  );
};

export default Tracklist;
