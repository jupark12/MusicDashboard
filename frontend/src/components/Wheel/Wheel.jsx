import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "../../util/GlobalState";
import Card from '../Card';
import "./Wheel.scss";

const Wheel = () => {
    console.log("Wheel.js");
    const { cards, editMode } = useContext(GlobalContext);
    const { totalRotation } = useContext(GlobalContext);
    const gradientColors = `rgba(55, 56, 50, 0.95) 0%, rgba(188, 164, 131, 0.95) 150%`;

    return (
        <div className='Wheel-container z-[-1]' style={{ background: `linear-gradient(to bottom, ${gradientColors})` }}>
            <div className={`Wheel absolute w-full h-full flex items-center justify-center z-10  ${editMode ? 'Wheel-editMode shadow-teal-300 shadow-2xl' : 'top-[-30px] left-[48vw]'}`}
                style={editMode ? { display: 'flex' } : {
                    transform: `rotate(${totalRotation}deg)`,
                    transition: "transform 1.0s ease-out"
                }}
            >
                {cards.map((song, index) => (
                    <Card 
                        key={index} 
                        transform={(360 / cards.length) * index}
                        translate={-300 - (20 * cards.length)}
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