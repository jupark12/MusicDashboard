import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../util/GlobalState";
import Card from '../Card';
import "./Wheel.scss";

const Wheel = ({cards}) => {

    const { currentIndex, setCurrentIndex } = useContext(GlobalContext); // Use context
    const [totalRotation, setTotalRotation] = useState(270); // Start at 90 degrees to position the first card to the left
    const [isKeyPressed, setIsKeyPressed] = useState(false); // Track key press state

    const handleKeyPress = (event) => {
    if (isKeyPressed) return; // Ignore if key is already pressed
    setIsKeyPressed(true); // Set key pressed flag

    if (event.key === "ArrowUp") {
        setCurrentIndex((currentIndex) => currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
        setTotalRotation((prevRotation) =>  prevRotation + (360 / cards.length));
    } else if (event.key === "ArrowDown") {
        setCurrentIndex((currentIndex) => currentIndex === cards.length - 1 ? 0 : currentIndex + 1); // Wrap around to first card
        setTotalRotation((prevRotation) =>  prevRotation - (360 / cards.length));
    }
    };

    const handleKeyUp = () => {
    setIsKeyPressed(false); // Reset key pressed flag when key is released
    };

    useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp); // Listen for keyup events
    return () => {
        window.removeEventListener("keydown", handleKeyPress);
        window.removeEventListener("keyup", handleKeyUp); // Clean up
    };
    }, []); // Add currentIndex as a dependency
  

    return (
        <div className='Wheel-container'>
            <div className="Wheel absolute w-full h-full flex flex-col overflow-hidden left-[48vw] items-center justify-center"
                style={{
                    transform: `rotate(${totalRotation}deg)`,
                    transition: "transform 1.5s ease-in-out"
                }}
            >
                {cards.map((song, index) => (
                    <Card key={index} transform={(360 / cards.length) * index} cover={song.cover} title={song.title} />
                ))}
            </div>
        </div>
    )
};

export default Wheel;