import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "../../util/GlobalState";
import Card from "../Card";
import "./Wheel.scss";

function hexToRgba(hex) {
  // Remove the hash symbol if it exists
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, 0.95)`;
}

const Wheel = () => {
  console.log("Wheel.js");
  const { cards, editMode, ballColor, gradientColors1, gradientColors2 } =
    useContext(GlobalContext);
  const { totalRotation } = useContext(GlobalContext);
  const gradientColors = `${hexToRgba(gradientColors1)} 0%, ${hexToRgba(
    gradientColors2
  )} 150%`;

  return (
    <div
      className="Wheel-container z-[-1]"
      style={{ background: `linear-gradient(to bottom, ${gradientColors})` }}
    >
      <div
        className={`Wheel absolute w-full h-full flex z-10  ${
          editMode
            ? "Wheel-editMode shadow-teal-300 shadow-2xl items-start, justify-start"
            : "top-[-30px] left-[48vw] items-center justify-center"
        }`}
        style={
          editMode
            ? { display: "flex" }
            : {
                transform: `rotate(${totalRotation}deg)`,
                transition: "transform 1.0s ease-out",
              }
        }
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            transform={(360 / cards.length) * index}
            translate={-300 - 20 * cards.length}
            card={card}
            index={index}
          />
        ))}
      </div>
      <div className="absolute top-[300px]" style={{ color: ballColor }}>
        <div className="ball text-[200px]">.</div>
        <div className="ball text-[100px]">.</div>
        <div className="ball text-[300px]">.</div>
      </div>
    </div>
  );
};

export default Wheel;
