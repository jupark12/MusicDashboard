import React, { createContext, useState } from 'react';
import leaveAudio from '../assets/audio/Leave.mp3';
import lifeStyleAudio from '../assets/audio/LIFESTYLE.mp3';
import tellMeAudio from '../assets/audio/TellMe.mp3';
import coupAudio from '../assets/audio/coup.mp3';
// GlobalState.js

// Create a context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(270);
  const [ editMode, setEditMode ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(false);

  const initialCards = [
    {
      title: "Leave",
      cover: require('../assets/imgs/yellow.png'),
      date: "08/10/24",
      summary: "A cheerful tune that brings warmth and happiness on sunny days.",
      audio: leaveAudio
    },
    {
      title: "LifeStyle",
      cover: require('../assets/imgs/vultures.png'),
      date: "09/10/24",
      summary: "A soothing melody perfect for a romantic night under the stars.",
      audio: lifeStyleAudio
    },
    {
      title: "Rhythm of the Night",
      cover: require('../assets/imgs/graduation.png'),
      date: "10/10/24",
      summary: "An upbeat dance track that keeps you moving all night long.",
      audio: tellMeAudio
    },
    {
      title: "Lost in Melody",
      cover: require('../assets/imgs/jik.png'),
      date: "11/10/24",
      summary: "A dreamy song that takes you on a journey through sound.",
      audio: coupAudio
    },
    {
      title: "Dance With Me",
      cover: require('../assets/imgs/mbdtf.png'),
      date: "12/10/24",
      summary: "A fun and catchy tune that invites everyone to hit the dance floor.",
      audio: leaveAudio
    },
    {
      title: "Chasing Stars",
      cover: require('../assets/imgs/yeezus.png'),
      date: "01/10/24",
      summary: "An inspiring anthem about following your dreams and aspirations.",
      audio: leaveAudio
    },
    {
      title: "Echoes of Yesterday",
      cover: require('../assets/imgs/college.png'),
      date: "02/10/24",
      summary: "A reflective song that captures the nostalgia of the past.",
      audio: leaveAudio
    },
    {
      title: "Electric Dreams",
      cover: require('../assets/imgs/late.png'),
      date: "03/10/24",
      summary: "A futuristic sound that blends electronic beats with smooth vocals.",
      audio: leaveAudio
    },
    {
      title: "Sweet Harmony",
      cover: require('../assets/imgs/donda.png'),
      date: "04/10/24",
      summary: "A heartwarming ballad about love and connection.",
      audio: leaveAudio
    },
    {
      title: "Journey to the Unknown",
      cover: require('../assets/imgs/pablo.png'),
      date: "05/10/24",
      summary: "An adventurous song that takes you on a musical exploration.",
      audio: leaveAudio
    },
  ];
  const [cards, setCards] = useState(initialCards);

  return (
    <GlobalContext.Provider value={{ currentIndex, setCurrentIndex, cards, setCards, totalRotation, setTotalRotation, editMode, setEditMode, isPlaying, setIsPlaying }}>
      {children}
    </GlobalContext.Provider>
  );
};