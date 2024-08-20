import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../util/GlobalState";
import Card from '../Card';
import { usePalette } from 'color-thief-react';
import "./Wheel.scss";

const Wheel = ({cards}) => {

    const { currentIndex, setCurrentIndex } = useContext(GlobalContext); // Use context
    const [totalRotation, setTotalRotation] = useState(270); // Start at 90 degrees to position the first card to the left

    const handleKeyPress = (event) => {
        if (event.key === "ArrowDown") {
            setCurrentIndex((currentIndex) => currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
            setTotalRotation((prevRotation) =>  prevRotation + (360 / cards.length));
        } else if (event.key === "ArrowUp") {
            setCurrentIndex((currentIndex) => currentIndex === cards.length - 1 ? 0 : currentIndex + 1); // Wrap around to first card
            setTotalRotation((prevRotation) =>  prevRotation - (360 / cards.length));
        }
    };


    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
  
    const { data: bgColor } = usePalette(cards[currentIndex]?.cover, 3, 'hex'); // Get the palette of the current card cover

    const gradientColors = bgColor ? `${bgColor[0]} 0%, ${bgColor[1]} 150%` : null; 

    return (
        <div className='Wheel-container z-[-1]' style={{ background: `linear-gradient(to bottom, ${gradientColors})` }}>
            <div className="Wheel absolute w-full h-full flex flex-col overflow-hidden left-[48vw] items-center justify-center"
                style={{
                    transform: `rotate(${totalRotation}deg)`,
                    transition: "transform 0.5s ease-out"
                }}
            >
                {cards.map((song, index) => (
                    <Card 
                        key={index} 
                        transform={(360 / cards.length) * index} 
                        cover={song.cover} 
                        title={song.title} 
                        index={index}    
                    />
                ))}
            </div>
        </div>
    )
};

export default Wheel;