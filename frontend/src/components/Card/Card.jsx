import "./Card.scss";
import { useContext } from "react";
import { GlobalContext } from "../../util/GlobalState";
import { usePalette } from "color-thief-react";
import { FaTrash } from "react-icons/fa";

const Card = ({ transform, cover, title, index, translate }) => {
  const {
    currentIndex,
    editMode,
    cards,
    setCards,
    setTotalRotation,
    setCurrentIndex,
    setIsDelete,
  } = useContext(GlobalContext);
  const { data: bgColor } = usePalette(cover, 3, "hex"); // Get the palette of the current card cover
  const { isPlaying, setIsPlaying } = useContext(GlobalContext);

  const handleDelete = () => {
    if (cards.length === 0) return;

    const updatedCards = cards.filter((_, tempIndex) => tempIndex !== index);
    setCards(updatedCards);
  };

  const handleCardClick = () => {
    setIsDelete(false);
    setCurrentIndex(index);
    setTotalRotation((prevRotation) => {
      const newRotation =
        index >= currentIndex
          ? prevRotation - (360 / cards.length) * (index - currentIndex)
          : prevRotation + (360 / cards.length) * (currentIndex - index);
      return newRotation;
    });
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
      onClick={handleCardClick}
    >
      {editMode && (
        <button
          onClick={handleDelete}
          className="Card-trashIcon text-white z-10 absolute top-[-10px] right-[-5px]"
          data-index={index}
        >
          <FaTrash size={24} className="" />
        </button>
      )}
      <div className={`Card-cover ${isPlaying ? "Card-pulse" : ""}`}>
        <img src={cover} alt={title} className="h-20 w-20 p-1 rounded-full" />
      </div>

      {title && (
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
