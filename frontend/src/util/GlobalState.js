// GlobalState.js
import React, { createContext, useState } from 'react';

// Create a context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <GlobalContext.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </GlobalContext.Provider>
  );
};