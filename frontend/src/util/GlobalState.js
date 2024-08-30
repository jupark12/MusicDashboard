import React, { createContext, useState, useEffect } from "react";
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
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
  const [ballColor, setBallColor] = useState("#000000");
  const [gradientColors1, setGradientColors1] = useState("#373832");
  const [gradientColors2, setGradientColors2] = useState("#bca483");
  const [firstInput, setFirstInput] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSettings, setUserSettings] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Get User Setting and set ball color, and gradient colors
    if (user) {
      setLoading(true);

      axios
        .get("http://localhost:8080/user/settings", {
          params: {
            userId: user.uid,
          },
        })
        .then((response) => {
          console.log("User settings:", response.data);
          if (response.data) {
            setUserSettings(response.data);
            setBallColor(response.data.ballColor);
            setGradientColors1(response.data.backgroundColor1);
            setGradientColors2(response.data.backgroundColor2);

            //Fetch Cards
            try {
              axios
                .get("http://localhost:8080/albums", {
                  params: {
                    userId: user.uid,
                  },
                })
                .then((cardResponse) => {
                  console.log("Card response:", cardResponse.data);
                  if (cardResponse.data?.length > 0) {
                    setCards(() => {
                      const albumOrder = response.data?.albumOrder || [];
                      console.log("albumOrder", albumOrder);
                      if (albumOrder.length > 0) {
                        const newCards = albumOrder
                          .map((id) =>
                            cardResponse.data.find((card) => card.id === id)
                          )
                          .filter((card) => card !== undefined);
                        console.log("New cards:", newCards);
                        return newCards;
                      } else {
                        return cardResponse.data;
                      }
                    });
                  }
                });
            } catch (error) {
              console.error("Error fetching cards:", error);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching settings:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        setUser(null);
        setBallColor("#000000");
        setGradientColors1("#373832");
        setGradientColors2("#bca483");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

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
        ballColor,
        setBallColor,
        gradientColors1,
        setGradientColors1,
        gradientColors2,
        setGradientColors2,
        firstInput,
        setFirstInput,
        user,
        setUser,
        userSettings,
        setUserSettings,
        loading,
        setLoading,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
