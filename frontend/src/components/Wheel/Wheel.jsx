import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "../../util/GlobalState";
import Card from "../Card";
import "./Wheel.scss";
import { hexToRgba } from "../../util/functions";

const Wheel = () => {
  const { cards, editMode, ballColor, gradientColors1, gradientColors2 } =
    useContext(GlobalContext);
  const { totalRotation } = useContext(GlobalContext);
  const gradientColors = `${hexToRgba(gradientColors1)} 0%, ${hexToRgba(
    gradientColors2
  )} 150%`;

  return (
    <div
      className={`Wheel-container z-[-1]`}
      style={{ background: `linear-gradient(to bottom, ${gradientColors})` }}
    >
      {cards?.length == 0 ||
        (!cards && (
          <div className="absolute right-0 left-0 flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-4xl">Welcome to Music Wheel</h1>
            <p className="text-white">
              Please upload your first song to begin.
            </p>
          </div>
        ))}
      {cards?.length > 0 && (
        <div
          className={`Wheel absolute w-full h-full flex z-10 ${
            editMode
              ? "Wheel-editMode shadow-teal-300 shadow-2xl items-start, justify-start"
              : "top-[-30px] items-center justify-center"
          }`}
          style={
            editMode
              ? { display: "flex" }
              : {
                  transform: `rotate(${totalRotation}deg)`,
                  transition: "transform 1.5s ease-out",
                  left: `${40 + cards.length * 1.2}vw`,
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
      )}

      <div className="absolute top-[300px]" style={{ color: ballColor }}>
        <div className="ball text-[200px]">.</div>
        <div className="ball text-[100px]">.</div>
        <div className="ball text-[300px]">.</div>
      </div>
    </div>
  );
};

export default Wheel;
