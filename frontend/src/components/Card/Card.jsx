import "./Card.scss";

const Card = ({transform, cover, title}) => {

  return (
    <div className="Card bg-[#ABDEE6] flex w-[30%] relative"
        style={{
          transform: `rotate(${transform}deg) translateY(-300px) rotate(90deg)`,
          transition: "transform 0.5s ease-in-out"
        }}
    >
      <div className="Card-title">
        <p>{title}</p>
      </div>
      <div className="Card-cover">
        <img src={cover} alt={title} />
      </div>
    </div>
  )
}


export default Card;