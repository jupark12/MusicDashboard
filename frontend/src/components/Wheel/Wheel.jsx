import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "../../util/GlobalState";
import Card from '../Card';
import "./Wheel.scss";

const Wheel = ({ cards }) => {
    console.log("Wheel.js");
    const { currentIndex } = useContext(GlobalContext);
    const { totalRotation } = useContext(GlobalContext);
    const gradientColors = `#373832 0%, #bca483 150%`;

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
    );
};

export default Wheel;