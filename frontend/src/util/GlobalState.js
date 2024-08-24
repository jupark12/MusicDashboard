import React, { createContext, useState } from "react";
import leaveAudio from "../assets/audio/Leave.mp3";
import lifeStyleAudio from "../assets/audio/LIFESTYLE.mp3";
import tellMeAudio from "../assets/audio/TellMe.mp3";
import coupAudio from "../assets/audio/coup.mp3";
import promotionAudio from "../assets/audio/promotion.wav";
import riverAudio from "../assets/audio/river.wav";
import peanutAudio from "../assets/audio/peanut.mp3";
import vibeAudio from "../assets/audio/vibe.mp3";
import prayAudio from "../assets/audio/pray.mp3";
import pettyAudio from "../assets/audio/petty.mp3";

// GlobalState.js

// Create a context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isSameAudio, setIsSameAudio] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(270);
  const [editMode, setEditMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const initialCards = [
    {
      id: 1,
      title: "Leave",
      cover: require("../assets/imgs/yellow.png"),
      date: "08/10/24",
      summary:
        "A cheerful tune that brings warmth and happiness on sunny days.",
      audio: leaveAudio,
    },
    {
      id: 2,
      title: "LifeStyle",
      cover: require("../assets/imgs/vultures.png"),
      date: "09/10/24",
      summary:
        "A soothing melody perfect for a romantic night under the stars.",
      audio: lifeStyleAudio,
    },
    {
      id: 3,
      title: "Tell Me",
      cover: require("../assets/imgs/graduation.png"),
      date: "10/10/24",
      summary: "An upbeat dance track that keeps you moving all night long.",
      audio: tellMeAudio,
    },
    {
      id: 4,
      title: "Coop",
      cover: require("../assets/imgs/jik.png"),
      date: "11/10/24",
      summary: "A dreamy song that takes you on a journey through sound.",
      audio: coupAudio,
    },
    {
      id: 5,
      title: "Promotion",
      cover: require("../assets/imgs/mbdtf.png"),
      date: "12/10/24",
      summary:
        "A fun and catchy tune that invites everyone to hit the dance floor.",
      audio: promotionAudio,
    },
    {
      id: 6,
      title: "River",
      cover: require("../assets/imgs/yeezus.png"),
      date: "01/10/24",
      summary:
        "An inspiring anthem about following your dreams and aspirations.",
      audio: riverAudio,
    },
    {
      id: 7,
      title: "Peanut Butter",
      cover: require("../assets/imgs/college.png"),
      date: "02/10/24",
      summary: "A reflective song that captures the nostalgia of the past.",
      audio: peanutAudio,
    },
    {
      id: 8,
      title: "Good Vibes",
      cover: require("../assets/imgs/late.png"),
      date: "03/10/24",
      summary:
        "A futuristic sound that blends electronic beats with smooth vocals.",
      audio: vibeAudio,
    },
    {
      id: 9,
      title: "Pray For Me",
      cover: require("../assets/imgs/donda.png"),
      date: "04/10/24",
      summary: "A heartwarming ballad about love and connection.",
      audio: prayAudio,
    },
    {
      id: 10,
      title: "Petty Love",
      cover: require("../assets/imgs/pablo.png"),
      date: "05/10/24",
      summary: "An adventurous song that takes you on a musical exploration.",
      audio: pettyAudio,
    },
  ];

  const [cards, setCards] = useState(initialCards);

  return (
    <GlobalContext.Provider
      value={{
        isSameAudio,
        setIsSameAudio,
        currentIndex,
        setCurrentIndex,
        cards,
        setCards,
        totalRotation,
        setTotalRotation,
        editMode,
        setEditMode,
        isPlaying,
        setIsPlaying,
        isDelete,
        setIsDelete,
        isShuffle,
        setIsShuffle,
        isRecording,
        setIsRecording,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
