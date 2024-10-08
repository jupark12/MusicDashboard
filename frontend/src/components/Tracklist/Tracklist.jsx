import React, { useContext } from "react";
import { GlobalContext } from "../../util/GlobalState";
import { FaGripVertical } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Tracklist.scss";

const Tracklist = () => {
  const {
    editMode,
    cards,
    setCards,
    currentIndex,
    setCurrentIndex,
    setTotalRotation,
    isPlaying,
    setIsSameAudio,
    setFirstInput,
    ballColor,
  } = useContext(GlobalContext);

  const handleTrackClick = (event) => {
    setFirstInput(true);
    const selectedIndex = Number(event.currentTarget.dataset.index);
    setCurrentIndex(selectedIndex);
    setIsSameAudio(false);
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
          setIsSameAudio(true);
          let tempIndex = prevIndex;

          if (oldIndex > prevIndex && newIndex <= prevIndex) {
            tempIndex = prevIndex + 1;
          } else if (oldIndex < prevIndex && newIndex >= prevIndex) {
            tempIndex = prevIndex - 1;
          }
          setTotalRotation((prevRotation) => {
            const newRotation =
              newIndex >= tempIndex
                ? prevRotation - (360 / cards.length) * (newIndex - tempIndex)
                : prevRotation + (360 / cards.length) * (tempIndex - newIndex);
            const newRotation2 = 270 - (360 / updatedCards.length) * tempIndex;

            return oldIndex === prevIndex ? newRotation : newRotation2;
          });

          return oldIndex === prevIndex ? newIndex : tempIndex; // Update the current index if the active card was moved
        });
        return updatedCards;
      });
    }
  };

  return (
    <div className="Tracklist-container mb-8 w-full overflow-y-auto h-[40%] mt-8 max-h-[410px] md:h-auto">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={cards.map((card) => card.id)}>
          <div className="Tracklist">
            {cards.map((card, index) => (
              <SortableTrack
                key={card.id}
                card={card}
                index={index}
                isActive={index === currentIndex}
                onClick={handleTrackClick}
                editMode={editMode}
                isPlaying={isPlaying}
                ballColor={ballColor}
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
  ballColor,
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
        {isActive && isPlaying && (
          <div
            className="squiggle"
            style={{ backgroundColor: ballColor }}
          ></div>
        )}
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
