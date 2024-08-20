import "./Card.scss";
import {useContext} from "react";
import { GlobalContext } from "../../util/GlobalState";

const Card = ({transform, cover, title, index}) => {
  const { currentIndex } = useContext(GlobalContext);

  return (
    <div className={`Card flex flex-col items-center justify-center gap-4 ${currentIndex === index ? 'Card-current' : 'Card-other'}`}
        style={{
          transform: `rotate(${transform}deg) translateY(-400px) rotate(90deg) ${currentIndex === index ? 'scale(1.5)' : ''}`,
          transition: "transform 0.5s ease"
        }}
    >
      <div className="Card-cover">
        <img src={cover} alt={title} className="h-20 w-20 p-2 rounded-full" />
      </div>
      
      {title && 
        <div className="Card-title">
          <p className="text-lg font-bold">{title}</p>
        </div>
      } 
    </div>
  )
}


export default Card;