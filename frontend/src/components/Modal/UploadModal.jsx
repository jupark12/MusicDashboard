import React, { useContext, useState } from "react";
import { GlobalContext } from "../../util/GlobalState";
import { useDropzone } from "react-dropzone";
import Recorder from "../Recorder";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMusic,
  FaCamera,
} from "react-icons/fa";
import "./UploadModal.scss";
import axios from "axios";
import ObjectID from "bson-objectid";
import { set } from "lodash";

const UploadModal = ({ closeModal }) => {
  const {
    cards,
    setCards,
    currentIndex,
    setCurrentIndex,
    setTotalRotation,
    user,
    setUserSettings,
    ballColor,
    gradientColors1,
    gradientColors2,
  } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    id: "",
    cover: "",
    title: "",
    audio: "",
    date: "",
  });
  const [droppedAudioFile, setDroppedAudioFile] = useState(""); // Updated state variable name
  const [droppedImageFile, setDroppedImageFile] = useState("");
  const [currentSlide, setCurrentSlide] = useState(1); // Track the current slide
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length === 0) return;
    console.log(acceptedFiles);

    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

    const audioFile = acceptedFiles.find((file) => file.type.includes("audio"));

    if (audioFile) {
      if (audioFile.size > maxFileSize) {
        setErrorMessage("Audio file size exceeds 5MB.");
        return;
      }
      console.log(audioFile);
      setFormData((prevData) => ({
        ...prevData,
        audio: URL.createObjectURL(audioFile),
        date: audioFile.lastModified,
        id: ObjectID().toHexString(),
      }));
      setDroppedAudioFile(audioFile);
      setErrorMessage(""); // Clear error message on successful drop
    }

    const imageFile = acceptedFiles.find((file) => file.type.includes("image"));

    if (imageFile) {
      setFormData((prevData) => ({
        ...prevData,
        cover: URL.createObjectURL(imageFile),
      }));
      setDroppedImageFile(imageFile);
    }
  };

  const addCard = (newCard) => {
    if (cards?.length === 0 || !cards) {
      setTotalRotation(270);
      setCards([newCard]);
      setCurrentIndex(0);
    } else {
      setCards((cards) => {
        const updatedCards = [...cards, newCard];
        setCurrentIndex(updatedCards.length - 1); // Update the current index to the new card
        setTotalRotation((prevRotation) => {
          console.log(prevRotation, updatedCards.length, currentIndex);
          const newRotation = 270 + 360 / updatedCards.length;
          return newRotation;
        });
        setUserSettings((prevSettings) => ({
          ...prevSettings,
          albumOrder: updatedCards.map((card) => card.id),
        }));
        try {
          const userSettingsData = {
            ballColor: ballColor || "",
            backgroundColor1: gradientColors1 || "",
            backgroundColor2: gradientColors2 || "",
            albumOrder: updatedCards.map((card) => card.id),
            userId: user.uid || "",
          };
          axios.put("http://localhost:8080/user/settings", userSettingsData, {
            headers: {
              "Content-Type": "application/json",
              UserID: user.uid,
            },
          });
        } catch (error) {
          console.error("Error saving changes:", error);
        }
        return updatedCards;
      });
    }

    // Set the current index to the new card
    closeModal();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["audio/*"],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadLoading(true);
    console.log(droppedAudioFile, droppedImageFile, formData);

    const tempFormData = new FormData();
    if (droppedAudioFile) {
      tempFormData.append("audio", droppedAudioFile);
    }
    if (droppedImageFile) {
      tempFormData.append("cover", droppedImageFile);
    }
    tempFormData.append("title", formData.title || "");
    tempFormData.append("date", formData.date || null);
    tempFormData.append("id", formData.id || "");
    tempFormData.append("userId", user.uid || "");

    try {
      const response = await axios.post(
        "http://localhost:8080/albums/upload",
        tempFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            UserID: user.uid,
          },
        }
      );
      console.log("File uploaded successfully:", response.data.url);
      setUploadLoading(false);
      addCard(formData);
    } catch (error) {
      setUploadLoading(false);
      setErrorMessage("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const goToNextSlide = (event) => {
    event.preventDefault();
    if (droppedAudioFile) {
      setCurrentSlide((slide) => slide + 1);
    } else {
      setCurrentSlide(1);
      setErrorMessage("Please upload an audio file before proceeding.");
    }
  };

  const goToPreviousSlide = (event) => {
    event.preventDefault();
    setCurrentSlide((slide) => (slide - 1 >= 0 ? slide - 1 : 1));
  };

  if (uploadLoading) {
    return (
      <div className="UploadModal">
        <div className="flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="UploadModal">
      <div className="UploadModal-content rounded-md text-[#696b5d]">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {currentSlide === 1 ? ( // First slide: Audio file selection
          <div className="flex flex-col items-center h-full">
            <h2 className="pb-8">Add New Song</h2>
            <form className="flex flex-col items-center w-full h-full">
              <div
                {...getRootProps({
                  className:
                    "dropzone cursor-pointer h-32 w-32 p-2 flex items-center",
                })}
              >
                <input {...getInputProps()} />
                <FaMusic size={32} className="flex justify-center w-full" />
              </div>
              {droppedAudioFile && (
                <p className="mt-8 text-center">
                  Audio file selected: {droppedAudioFile.name}
                </p>
              )}
              <div className="ml-auto mt-auto">
                <button className="mt-auto" onClick={goToNextSlide}>
                  <FaChevronRight size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Second slide: Display current content
          <div className="flex flex-col items-center h-full">
            <h2 className="pb-8">Add New Song</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full h-full"
            >
              {formData.cover ? (
                <img
                  src={formData.cover}
                  alt="Cover"
                  className="h-32 w-32 mb-4 rounded-full"
                />
              ) : (
                <div
                  {...getRootProps({
                    className:
                      "dropzone cursor-pointer rounded-full h-32 w-32 p-2 flex items-center",
                  })}
                >
                  <input {...getInputProps()} />
                  <FaCamera size={32} className="flex justify-center w-full" />
                </div>
              )}
              <input
                className="mt-8 border-b-2 border-gray-300 p-2 rounded-sm"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Song Title"
              />
              <div className="flex justify-between w-full mt-auto">
                <button
                  className="mt-4"
                  type="button"
                  onClick={goToPreviousSlide}
                >
                  <FaChevronLeft size={16} />
                </button>
                <button className="mt-4 ml-auto" type="submit">
                  Add Song
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="error w-full justify-center flex mt-4">
        <p className={`error-text ${errorMessage ? "visible" : ""}`}>
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default UploadModal;
