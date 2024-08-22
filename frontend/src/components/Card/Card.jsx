import "./Card.scss";
import {useContext} from "react";
import { GlobalContext } from "../../util/GlobalState";
import { usePalette } from 'color-thief-react';
import { FaTrash } from 'react-icons/fa';

const Card = ({transform, cover, title, index, translate}) => {
  const { currentIndex, setCurrentIndex, cards, setCards, editMode, setTotalRotation } = useContext(GlobalContext);
  const { data: bgColor } = usePalette(cover, 3, 'hex'); // Get the palette of the current card cover
  const { isPlaying, setIsPlaying } = useContext(GlobalContext);

  const handleDelete = () => {
    if (cards.length === 0) return;
    
    const updatedCards = cards.filter((_, tempIndex) => tempIndex !== index);
    setCards(updatedCards)
    setCurrentIndex(() => {
      if (updatedCards.length === 0) return 0;
      const tempIndex = index === 0 ? 0 : index - 1
      return tempIndex;
    });
    setTotalRotation((prevRotation) => {
      console.log(prevRotation, updatedCards.length, currentIndex);
      const newRotation = prevRotation - (360 / cards.length);
      return newRotation;
    });
  } 
  
  return (
    <div className={`Card flex flex-col items-center justify-center gap-4 ${currentIndex === index ? 'Card-current' : 'Card-other'} ${editMode ? 'Card-editMode' : ''}`}
        style={{
          transform: `rotate(${transform}deg) translateY(${translate}px) rotate(90deg) ${currentIndex === index && !editMode? 'scale(1.5)' : ''}`,
          transition: "transform 0.5s ease",
        }}
    >
      <div className={`Card-cover ${isPlaying ? 'Card-pulse' : ''}`}>
        <img src={cover} alt={title} className="h-20 w-20 p-1 rounded-full" 
        />
      </div>
      
      {title && 
        <div className={`Card-title text-center`}>
          <p className="font-bold"
            style={{
              color: bgColor?.[0] || '#000000',
            }}
          >
            <span className="text-[12px]">
              {index+1}.{' '}
            </span> 
             {title}
          </p>
        </div>
      }

      {editMode && (
        <button onClick={handleDelete} className="Card-trashIcon ml-auto mr-auto text-white z-10 absolute">
          <FaTrash size={32} className=""/>
        </button> 
      )}
    </div>
  )
}


export default Card;