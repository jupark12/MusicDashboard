import "./Card.scss";
import { useContext, useState } from "react";
import { GlobalContext } from "../../util/GlobalState";
import { usePalette } from "color-thief-react";
import { FaTrash, FaCheck } from "react-icons/fa";

const Card = ({ transform, translate, card, index }) => {
  const { title, cover } = card;
  const {
    currentIndex,
    editMode,
    cards,
    setCards,
    totalRotation,
    setTotalRotation,
    setCurrentIndex,
    setIsDelete,
    setIsSameAudio,
    setFirstInput,
  } = useContext(GlobalContext);
  const { data: bgColor } = usePalette(cover, 3, "hex"); // Get the palette of the current card cover
  const { isPlaying, setIsPlaying } = useContext(GlobalContext);

  const [editedTitle, setEditedTitle] = useState(title); // State variable to hold the edited title
  const handleDelete = () => {
    if (cards.length === 0) return;

    const updatedCards = cards.filter((_, tempIndex) => tempIndex !== index);
    setCards(updatedCards);

    setCurrentIndex((prevIndex) => {
      const newCurrentIndex = prevIndex > index ? prevIndex - 1 : prevIndex;
      setIsSameAudio(prevIndex === index ? false : true);
      setTotalRotation(() => {
        const newRotation = 270 - (360 / updatedCards.length) * newCurrentIndex;
        return newRotation;
      });
      return newCurrentIndex;
    });
  };

  const handleCardClick = () => {
    console.log("clicked card");
    setFirstInput(true);
    setIsDelete(false);
    setCurrentIndex(index);
    setIsSameAudio(false);
    setTotalRotation((prevRotation) => {
      const newRotation =
        index >= currentIndex
          ? prevRotation - (360 / cards.length) * (index - currentIndex)
          : prevRotation + (360 / cards.length) * (currentIndex - index);
      return newRotation;
    });
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    const updatedCards = cards.map((card, tempIndex) => {
      if (tempIndex === index) {
        return { ...card, title: editedTitle };
      }
      return card;
    });
    console.log("with edited title", updatedCards);
    setCards(updatedCards);
  };

  const [showSubmitButton, setShowSubmitButton] = useState(false); // State variable to control the visibility of the submit button

  const handleTitleBlur = () => {
    setShowSubmitButton(false);
  };

  const handleTitleFocus = () => {
    setShowSubmitButton(true);
  };

  return (
    <div
      className={`Card flex flex-col items-center justify-center gap-4 ${
        currentIndex === index ? "Card-current" : "Card-other"
      } ${editMode ? "Card-editMode" : "absolute"}`}
      style={
        editMode
          ? { gap: "8px" }
          : {
              transform: `rotate(${transform}deg) translateY(${translate}px) rotate(90deg) ${
                currentIndex === index ? "scale(1.5)" : ""
              }`,
              transition: "transform 0.5s ease",
            }
      }
    >
      {editMode && (
        <div className="relative flex justify-around w-full">
          <p
            className="font-bold"
            style={{
              color: bgColor?.[0] || "#000000",
            }}
          >
            {index + 1}.
          </p>
          <button
            onClick={handleDelete}
            className="Card-trashIcon absolute text-white z-10 top-[-15px] right-[-15px]"
            data-index={index}
          >
            <FaTrash size={24} className="" />
          </button>
        </div>
      )}
      <div
        className={`Card-cover ${isPlaying ? "Card-pulse" : ""}`}
        onClick={handleCardClick}
      >
        <img src={cover} alt={title} className="h-20 w-20 p-1 rounded-full" />
      </div>

      {editMode ? (
        <div className="Card-title text-center">
          <form onSubmit={handleTitleSubmit} className="mt-1">
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              onFocus={handleTitleFocus}
              onBlur={handleTitleBlur}
              className={`font-bold w-[100%] ${
                showSubmitButton ? "pl-2" : "text-center"
              }`}
              style={{
                color: bgColor?.[0] || "#000000",
              }}
            />
            <button
              type="submit"
              className={`ml-2 absolute right-4 ${
                showSubmitButton
                  ? "opacity-100 transition-opacity duration-1000 ease-in-out"
                  : "opacity-0"
              }`}
            >
              <FaCheck size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div className={`Card-title text-center`}>
          <p
            className="font-bold"
            style={{
              color: bgColor?.[0] || "#000000",
            }}
          >
            <span className="text-[12px]">{index + 1}. </span>
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
