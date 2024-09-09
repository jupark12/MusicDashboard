import React, { createContext, useState, useEffect } from "react";
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
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser == null) {
        setLoading(false);
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Get User Setting and set ball color, and gradient colors
    if (user) {
      setLoading(true);

      axios
        .get(
          "https://v59siytxq6.execute-api.us-east-1.amazonaws.com/prod/user/settings",
          {
            params: {
              userId: user.uid,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            setUserSettings(response.data);
            setBallColor(response.data.ballColor);
            setGradientColors1(response.data.backgroundColor1);
            setGradientColors2(response.data.backgroundColor2);

            //Fetch Cards
            try {
              axios
                .get(
                  "https://v59siytxq6.execute-api.us-east-1.amazonaws.com/prod/albums",
                  {
                    params: {
                      userId: user.uid,
                    },
                  }
                )
                .then((cardResponse) => {
                  if (cardResponse.data?.length > 0) {
                    setCards(() => {
                      const albumOrder = response.data?.albumOrder || [];
                      if (albumOrder.length > 0) {
                        const newCards = albumOrder
                          .map((id) =>
                            cardResponse.data.find((card) => card.id === id)
                          )
                          .filter((card) => card !== undefined);
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
        setUser(null);
        setBallColor("#000000");
        setGradientColors1("#373832");
        setGradientColors2("#bca483");
        setIsPlaying(false);
        setIsDelete(false);
        setEditMode(false);
        setFirstInput(false);
        setTotalRotation(270); // Reset totalRotation
        setIsSameAudio(false); // Reset isSameAudio
        setCurrentIndex(0); // Reset currentIndex
        setCards([]); // Reset cards
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
