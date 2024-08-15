import React, { useContext } from "react";
import "./Summary.scss";
import { GlobalContext } from "../../util/GlobalState";

const Summary = ({cards}) => {
  const { currentIndex } = useContext(GlobalContext);
  let currentCard = cards[currentIndex];

  return (
    <div className="Summary-container">
      {currentCard && 
        <div className="Summary">
          {currentCard.title && <p>{currentCard.title}</p>}
          {currentCard.date && <p>{currentCard.date}</p>}
        </div>
      }
    </div>
  )
}

export default Summary;
