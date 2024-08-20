import React, { createContext, useState } from 'react';

// GlobalState.js

// Create a context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(270);
  const [cards, setCards] = useState([]);

  return (
    <GlobalContext.Provider value={{ currentIndex, setCurrentIndex, cards, setCards, totalRotation, setTotalRotation }}>
      {children}
    </GlobalContext.Provider>
  );
};